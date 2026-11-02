
document.addEventListener("DOMContentLoaded", () => {
    // Show and hide passwords
    document.querySelectorAll(".password-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.target);
  
        if (!input) return;
  
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        button.textContent = isPassword ? "Hide" : "Show";
      });
    });
  
    // Signup form validation (frontend demo only)
    const signupForm = document.getElementById("signupForm");
  
    if (signupForm) {
      signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const phone = document.getElementById("signupPhone").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("signupMessage");
  
        message.classList.remove("error");
  
        if (!name || !email || !phone || !password || !confirmPassword) {
          message.textContent = "Please complete all fields.";
          message.classList.add("error");
          return;
        }
  
        if (!/^[0-9]{10}$/.test(phone)) {
          message.textContent = "Enter a valid 10-digit mobile number.";
          message.classList.add("error");
          return;
        }
  
        if (password.length < 8) {
          message.textContent = "Password must contain at least 8 characters.";
          message.classList.add("error");
          return;
        }
  
        if (password !== confirmPassword) {
          message.textContent = "Your passwords do not match.";
          message.classList.add("error");
          return;
        }
  
        if (!document.getElementById("acceptTerms").checked) {
          message.textContent = "Please accept the terms and privacy policy.";
          message.classList.add("error");
          return;
        }
  
        message.textContent =
          "Form validated! Connect the backend to create your account.";
      });
    }
  
    // Login form validation (frontend demo only)
    const loginForm = document.getElementById("loginForm");
  
    if (loginForm) {
      loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");
  
        message.classList.remove("error");
  
        if (!email || !password) {
          message.textContent = "Please enter your email and password.";
          message.classList.add("error");
          return;
        }
  
        message.textContent =
          "Form validated! Connect the backend to authenticate your account.";
      });
    }
  
    // Forgot password demo message
    const forgotPassword = document.getElementById("forgotPassword");
  
    if (forgotPassword) {
      forgotPassword.addEventListener("click", (event) => {
        event.preventDefault();
        const message = document.getElementById("loginMessage");
        message.textContent =
          "Password recovery will be available after backend integration.";
      });
    }
  });
  