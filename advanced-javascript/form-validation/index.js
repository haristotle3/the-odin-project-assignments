const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const postalcodeInput = document.getElementById("postalcode");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("passwordConfirm");
const form = document.querySelector("form");

emailInput.addEventListener("input", () => {
  if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity("This is an email input field");
    return;
  } else emailInput.setCustomValidity("");

  if (!emailInput.value.endsWith("@haristotlepatil.com"))
    emailInput.setCustomValidity(
      "Only @haristotlepatil.com emails are allowed"
    );
  else emailInput.setCustomValidity("");
});

countryInput.addEventListener("input", () => {
  if (countryInput.validity.patternMismatch)
    countryInput.setCustomValidity(
      "Only India, China, USA, UK, Russia allowed"
    );
  else countryInput.setCustomValidity("");
});

postalcodeInput.addEventListener("input", () => {
  if (postalcodeInput.validity.patternMismatch)
    postalcodeInput.setCustomValidity(
      "For god's sake please enter numbers in the given format xxx-xxx"
    );
  else postalcodeInput.setCustomValidity("");
});

passwordInput.addEventListener("input", () => {
  if (passwordInput.validity.patternMismatch)
    passwordInput.setCustomValidity(
      "Password should be atleast 8 characters and must contain 2 upper case letters, 3 lower case characters, 2 numbers, 1 special character"
    );
  else passwordInput.setCustomValidity("");
});

passwordConfirmInput.addEventListener("input", () => {
  if (passwordInput.value !== passwordConfirmInput.value) {
    passwordConfirmInput.setCustomValidity("Password does not match");
  } else passwordConfirmInput.setCustomValidity("");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }
  if (!countryInput.checkValidity()) {
    countryInput.reportValidity();
    return;
  }
  if (!postalcodeInput.checkValidity()) {
    postalcodeInput.reportValidity();
    return;
  }
  if (!passwordInput.checkValidity()) {
    passwordInput.reportValidity();
    return;
  }
  if (!passwordConfirmInput.checkValidity()) {
    passwordConfirmInput.reportValidity();
    return;
  }
  const h1 = document.querySelector("body h1");
  h1.style.visibility = "visible";
});
