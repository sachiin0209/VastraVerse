from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import google.generativeai as genai
from typing import List, Dict
import logging
import os
import re
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_url_path='', static_folder='.')
CORS(app)


# LM Studio is running on http://127.0.0.1:1234
# client = OpenAI(base_url="http://127.0.0.1:1234/v1", api_key="not-needed")


# Ensure you have set the GEMINI_API_KEY environment variable
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


MODEL = "gemini-1.5-flash-latest" 

def get_model_response(model: str, messages: List[Dict[str, str]]) -> str:
    try:
        system_prompt = """You are a comprehensive expert on Indian culture, traditions, and customs. Answer questions EXACTLY as they are asked, without adding unnecessary context about specific festivals unless explicitly requested.

Guidelines for responses:
1. For "Why" questions:
   - Answer ONLY what is specifically asked
   - Do NOT add context about any festival unless explicitly mentioned in the question
   - Provide complete historical and cultural context
   - Include regional variations if relevant
   - Explain modern significance

2. Response structure:
   [Question Topic]:
   • Historical Background
   • Cultural Significance
   • Regional Variations
   • Modern Context
   • Specific Details
   • Additional Information

3. For specific item/custom questions:
   - Focus ONLY on the item/custom asked about
   - Explain its significance
   - Describe variations
   - Detail modern practices
   - Include relevant facts

4. For attire questions:
   - Explain the specific garment/accessory
   - Detail its cultural significance
   - Describe regional variations
   - Include material and style information
   - Mention modern adaptations

5. Remember:
   - Answer EXACTLY what is asked
   - Don't add festival context unless specifically requested
   - Provide comprehensive information about the specific topic
   - Include historical and cultural significance
   - Be accurate and respectful
   - Use clear, organized formatting
   - End with "Let me know if you need any further assistance."
"""
        logger.info(f"Processing request for model: {model}")
        logger.info(f"Messages received: {messages}")
        
       
        prompt = system_prompt + "\n\n" + "\n".join([f"{msg['role']}: {msg['content']}" for msg in messages])
        
        model_instance = genai.GenerativeModel(model)
        
        
        response = model_instance.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                temperature=0.4,
                max_output_tokens=2048,
                top_p=0.4,
                
            ),
            
        )

        bot_reply = response.text
        
        bot_reply = re.sub(r"\n*Note:.*", "", bot_reply, flags=re.IGNORECASE|re.DOTALL)
        
        if bot_reply.strip() and not bot_reply.strip().endswith("Let me know if you need any further assistance."):
            bot_reply = bot_reply.strip() + "\n\nLet me know if you need any further assistance."
        return bot_reply
    except Exception as e:
        logger.error(f"Error in get_model_response: {str(e)}")
        return f"Error: {str(e)}"

# Serve index.html at root
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

# Serve chatbot.html at /chatbot.html
@app.route('/chatbot.html')
def serve_chatbot():
    return send_from_directory('.', 'chatbot.html')

# Serve all other static files (HTML, CSS, JS, images)
@app.route('/<path:filename>')
def serve_file(filename):
    if os.path.exists(filename):
        return send_from_directory('.', filename)
    else:
        return "File not found", 404

# Chatbot API endpoint
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    messages = data.get('messages', [])
    response = get_model_response(MODEL, messages)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
