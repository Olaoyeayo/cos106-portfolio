/* ==========================================================
   contact.js — Contact form validation
   Rules: no empty fields, valid email format,
   phone number must contain digits only.
   ========================================================== */

const contactForm = document.getElementById("contact-form");
const successBox = document.getElementById("form-success");

const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  message: document.getElementById("message")
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const digitsOnly = /^[0-9]+$/;

function showError(input, message) {
  const error = document.getElementById(input.id + "-error");
  error.textContent = message;
  input.classList.toggle("invalid", message !== "");
  input.classList.toggle("valid", message === "");
}

/* Returns an error message, or "" when the field is valid */
function checkField(key) {
  const value = fields[key].value.trim();

  if (value === "") return "This field cannot be empty.";

  if (key === "email" && !emailPattern.test(value)) {
    return "Please enter a valid email address (e.g. name@example.com).";
  }
  if (key === "phone") {
    if (!digitsOnly.test(value)) return "Phone number must contain digits only.";
    if (value.length < 7 || value.length > 15) return "Phone number should be 7 to 15 digits long.";
  }
  if (key === "message" && value.length < 10) {
    return "Message should be at least 10 characters.";
  }
  return "";
}

function validateField(key) {
  const message = checkField(key);
  showError(fields[key], message);
  return message === "";
}

// Validate each field as the user leaves it, and re-check while typing once it has an error
Object.keys(fields).forEach(function (key) {
  fields[key].addEventListener("blur", function () { validateField(key); });
  fields[key].addEventListener("input", function () {
    if (fields[key].classList.contains("invalid")) validateField(key);
  });
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  successBox.classList.remove("show");

  const results = Object.keys(fields).map(validateField);
  const allValid = results.every(function (ok) { return ok; });

  if (!allValid) {
    const firstBad = contactForm.querySelector(".invalid");
    if (firstBad) firstBad.focus();
    return;
  }

  const name = fields.name.value.trim().split(" ")[0];
  successBox.textContent = "Thank you, " + name + "! Your message has been received. I will reply within 48 hours.";
  successBox.classList.add("show");

  contactForm.reset();
  Object.keys(fields).forEach(function (key) { fields[key].classList.remove("valid"); });
});
