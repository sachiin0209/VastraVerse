// User authentication functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize users array in localStorage if it doesn't exist
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        updateUIForLoggedInUser(currentUser);
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        // Clear error messages when user starts typing
        loginForm.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                const errorId = input.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.classList.add('hidden');
                }
            });
        });
    }

    // Signup form handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
        // Clear error messages when user starts typing
        signupForm.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                const errorId = input.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.classList.add('hidden');
                }
            });
        });

        // Password strength checker
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', checkPasswordStrength);
        }
    }

    // Logout button handling
    const logoutButtons = document.querySelectorAll('#logoutButton, #mobileLogoutButton');
    logoutButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', handleLogout);
        }
    });

    // Password visibility toggle
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePassword.innerHTML = type === 'password' ? 
                '<i class="far fa-eye"></i>' : 
                '<i class="far fa-eye-slash"></i>';
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Add remember me functionality
    const rememberMeCheckbox = document.getElementById('rememberMe');
    if (rememberMeCheckbox) {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            const emailInput = document.getElementById('email');
            if (emailInput) {
                emailInput.value = savedEmail;
                rememberMeCheckbox.checked = true;
            }
        }
    }
});

// Check password strength
function checkPasswordStrength(e) {
    const password = e.target.value;
    const strengthBar = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('passwordStrengthText').querySelector('span');
    
    // Calculate password strength
    let strength = 0;
    let feedback = [];

    // Length check
    if (password.length >= 8) {
        strength += 25;
    } else {
        feedback.push('At least 8 characters');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
        strength += 25;
    } else {
        feedback.push('Uppercase letter');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
        strength += 25;
    } else {
        feedback.push('Lowercase letter');
    }

    // Number check
    if (/[0-9]/.test(password)) {
        strength += 25;
    } else {
        feedback.push('Number');
    }

    // Update UI
    strengthBar.style.width = `${strength}%`;
    
    // Set color based on strength
    if (strength <= 25) {
        strengthBar.style.backgroundColor = '#ef4444'; // red
        strengthText.textContent = 'Weak';
    } else if (strength <= 50) {
        strengthBar.style.backgroundColor = '#f59e0b'; // yellow
        strengthText.textContent = 'Fair';
    } else if (strength <= 75) {
        strengthBar.style.backgroundColor = '#10b981'; // green
        strengthText.textContent = 'Good';
    } else {
        strengthBar.style.backgroundColor = '#3b82f6'; // blue
        strengthText.textContent = 'Strong';
    }

    // Show feedback if password is not strong
    if (strength < 100) {
        strengthText.textContent += ` - Add ${feedback.join(', ')}`;
    }
}

// Handle user login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe')?.checked;
    
    // Basic validation
    if (!validateEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters');
        return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            email: user.email,
            name: user.name
        }));

        // Remember email if checkbox is checked
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Update UI
        updateUIForLoggedInUser(user);
        
        // Show success message
        showSuccess('Login successful! Redirecting...');
        
        // Redirect to home page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showError('emailError', 'Invalid email or password');
    }
}

// Handle user signup
function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Basic validation
    if (!name || name.length < 2) {
        showError('nameError', 'Please enter a valid name');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        return;
    }
    
    // Enhanced password validation
    if (password.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters');
        return;
    }

    if (!/[A-Z]/.test(password)) {
        showError('passwordError', 'Password must contain at least one uppercase letter');
        return;
    }

    if (!/[a-z]/.test(password)) {
        showError('passwordError', 'Password must contain at least one lowercase letter');
        return;
    }

    if (!/[0-9]/.test(password)) {
        showError('passwordError', 'Password must contain at least one number');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users'));
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
        showError('emailError', 'Email already registered');
        return;
    }

    // Add new user
    users.push({
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    });

    // Save updated users array
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after signup
    localStorage.setItem('currentUser', JSON.stringify({
        email,
        name
    }));
    
    // Update UI
    updateUIForLoggedInUser({ email, name });
    
    // Show success message
    showSuccess('Account created successfully! Redirecting...');
    
    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Handle user logout
function handleLogout() {
    localStorage.removeItem('currentUser');
    updateUIForLoggedOutUser();
    showSuccess('Logged out successfully!');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Update UI for logged in user
function updateUIForLoggedInUser(user) {
    // Hide auth buttons
    const authButtons = document.querySelectorAll('.auth-buttons');
    authButtons.forEach(button => button.classList.add('hidden'));
    
    // Show user menu
    const userMenus = document.querySelectorAll('.user-menu');
    userMenus.forEach(menu => {
        menu.classList.remove('hidden');
        const userName = menu.querySelector('.user-name');
        if (userName) {
            userName.textContent = user.name;
        }
    });
}

// Update UI for logged out user
function updateUIForLoggedOutUser() {
    // Show auth buttons
    const authButtons = document.querySelectorAll('.auth-buttons');
    authButtons.forEach(button => button.classList.remove('hidden'));
    
    // Hide user menu
    const userMenus = document.querySelectorAll('.user-menu');
    userMenus.forEach(menu => menu.classList.add('hidden'));
}

// Helper function to show error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

// Helper function to show success messages
function showSuccess(message) {
    // Create success message element if it doesn't exist
    let successElement = document.getElementById('successMessage');
    if (!successElement) {
        successElement = document.createElement('div');
        successElement.id = 'successMessage';
        successElement.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 translate-y-[-100%] z-50';
        document.body.appendChild(successElement);
    }
    
    // Show message
    successElement.textContent = message;
    successElement.classList.remove('translate-y-[-100%]');
    
    // Hide message after 3 seconds
    setTimeout(() => {
        successElement.classList.add('translate-y-[-100%]');
    }, 3000);
}

// Helper function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
} 