from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import torch
from PIL import Image
from io import BytesIO
import os

from diffusers import StableDiffusionControlNetPipeline, ControlNetModel, UniPCMultistepScheduler
from controlnet_aux import OpenposeDetector

app = Flask(__name__)
CORS(app)

# Add root route
@app.route("/")
def home():
    return jsonify({
        "status": "running",
        "message": "VastraVerse API is running",
        "endpoints": {
            "/generate": "POST - Generate image from pose and prompt"
        }
    })

# Check CUDA availability
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

# Load models once at server start
try:
    print("Loading ControlNetModel...")
    controlnet = ControlNetModel.from_pretrained(
        "lllyasviel/sd-controlnet-openpose", 
        torch_dtype=torch.float16 if device == "cuda" else torch.float32
    )
    print("ControlNetModel loaded.")
    
    print("Loading StableDiffusionControlNetPipeline...")
    pipe = StableDiffusionControlNetPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5",
        controlnet=controlnet,
        safety_checker=None,
        torch_dtype=torch.float16 if device == "cuda" else torch.float32,
    ).to(device)
    print("StableDiffusionControlNetPipeline loaded.")
    
    pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)
    
    print("Loading OpenposeDetector...")
    openpose = OpenposeDetector.from_pretrained("lllyasviel/ControlNet")
    print("OpenposeDetector loaded.")
    
    print("All models loaded successfully.")
except Exception as e:
    print(f"Error loading models: {str(e)}")
    raise

@app.route("/generate", methods=["POST"])
def generate_image():
    print("Received request for image generation...")
    image_file = request.files.get("image")
    prompt = request.form.get("prompt", "")
    negative_prompt = "different person, distorted face, blurry, cropped, low resolution, cartoon, funny eyes"

    if not image_file or not prompt:
        return jsonify({"error": "Image and prompt are required"}), 400

    try:
        input_image = Image.open(image_file).convert("RGB").resize((512, 512))
        pose_image = openpose(input_image)

        output = pipe(
            prompt=prompt,
            negative_prompt=negative_prompt,
            image=pose_image,
            num_inference_steps=100,
            guidance_scale=7.5
        )

        output_image = output.images[0]
        buffered = BytesIO()
        output_image.save(buffered, format="PNG")
        buffered.seek(0)

        return send_file(buffered, mimetype="image/png", download_name="output.png")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
