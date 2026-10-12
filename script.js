
const passwordInput = document.querySelector("#password");
const togglePassword = document.querySelector("#toggle-password");
const eyeIcon = document.querySelector("#eye-icon");
const loginForm = document.querySelector("#login-form");
const formMessage = document.querySelector("#form-message");
const registerLink = document.querySelector("#register-link");
const socialButtons = document.querySelectorAll(".social-btn");

// PASSWORD VISIBILITY
togglePassword.addEventListener("click", () => {
  const shouldShow = passwordInput.type === "password";

  passwordInput.type = shouldShow ? "text" : "password";

  togglePassword.setAttribute(
    "aria-label",
    shouldShow ? "Hide password" : "Show password"
  );

  togglePassword.setAttribute(
    "aria-pressed",
    String(shouldShow)
  );

  eyeIcon.innerHTML = shouldShow
    ? `
      <path d="M3 3l18 18"></path>
      <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83"></path>
      <path d="M9.88 5.09A10.8 10.8 0 0 1 12 4.9c6.5 0 10 7.1 10 7.1a17.4 17.4 0 0 1-3.05 3.9"></path>
      <path d="M6.61 6.61C3.58 8.4 2 12 2 12s3.5 7.1 10 7.1a10.4 10.4 0 0 0 4.1-.82"></path>
    `
    : `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    `;
});

// LOGIN FORM DEMO
// This frontend does not perform real authentication.
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!loginForm.reportValidity()) {
    return;
  }

  formMessage.textContent =
    "Demo only: connect a secure backend to enable login.";
});

// SOCIAL LOGIN PLACEHOLDERS
socialButtons.forEach((button) => {
  button.addEventListener("click", () => {
    formMessage.textContent =
      `${button.dataset.provider} sign-in is a UI placeholder and is not connected yet.`;
  });
});

// REGISTER PLACEHOLDER
registerLink.addEventListener("click", (event) => {
  event.preventDefault();

  formMessage.textContent =
    "Registration is not implemented in this frontend demo.";
});
