const $ = (selector) => document.querySelector(selector);

const form = $("#login-form");
const emailInput = $("#email");
const passwordInput = $("#password");
const togglePassword = $("#toggle-password");
const eyeIcon = $("#eye-icon");
const loginButton = $("#login-btn");
const buttonText = $("#btn-text");
const formStatus = $("#form-status");
const forgotLink = $("#forgot-link");
const registerLink = $("#register-link");

const emailError = $("#email-error");
const passwordError = $("#password-error");

function setError(element, message) {
  element.textContent = message;
}

function clearErrors() {
  setError(emailError, "");
  setError(passwordError, "");
  formStatus.textContent = "";
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setPasswordIcon(isVisible) {
  eyeIcon.innerHTML = isVisible
    ? `<path d="M3 3l18 18"/>
       <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/>
       <path d="M9.9 4.2A10.6 10.6 0 0 1 12 4c7 0 11 8 11 8a18.2 18.2 0 0 1-3.1 4.2"/>
       <path d="M6.6 6.7C3.1 9 1 12 1 12s4 8 11 8a10.8 10.8 0 0 0 4.2-.9"/>`
    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
       <circle cx="12" cy="12" r="3"/>`;
}

togglePassword.addEventListener("click", () => {
  const visible = passwordInput.type === "password";
  passwordInput.type = visible ? "text" : "password";
  togglePassword.setAttribute("aria-label", visible ? "Hide password" : "Show password");
  togglePassword.setAttribute("aria-pressed", String(visible));
  setPasswordIcon(visible);
  passwordInput.focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  let valid = true;

  if (!email) {
    setError(emailError, "Please enter your email address.");
    valid = false;
  } else if (!validEmail(email)) {
    setError(emailError, "Please enter a valid email address.");
    valid = false;
  }

  if (!password) {
    setError(passwordError, "Please enter your password.");
    valid = false;
  } else if (password.length < 6) {
    setError(passwordError, "Password must contain at least 6 characters.");
    valid = false;
  }

  if (!valid) return;

  loginButton.disabled = true;
  loginButton.classList.add("is-loading");
  buttonText.textContent = "Signing in";

  // Demo-only behavior. Replace this section with your real backend request.
  window.setTimeout(() => {
    loginButton.disabled = false;
    loginButton.classList.remove("is-loading");
    buttonText.textContent = "Sign in";
    formStatus.textContent = "Demo mode: form validated successfully.";
  }, 900);
});

[forgotLink, registerLink].forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    formStatus.textContent = link === forgotLink
      ? "Demo link: connect this action to your password-reset flow."
      : "Demo link: connect this action to your registration page.";
  });
});

document.querySelectorAll(".social-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const provider = button.dataset.provider;
    formStatus.textContent = `${provider} sign-in is UI-only in this demo. Connect your OAuth provider here.`;
  });
});
