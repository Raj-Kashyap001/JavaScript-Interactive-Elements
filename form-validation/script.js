const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const usernameEl = document.querySelector("#username");
  const emailEl = document.querySelector("#email");
  const passwordEl = document.querySelector("#password");
  const confirmPasswordEl = document.querySelector("#confirm-password");

  const usernameError = document.querySelector("#username-error");
  const emailError = document.querySelector("#email-error");
  const passwordError = document.querySelector("#password-error");
  const confirmPasswordError = document.querySelector(
    "#confirm-password-error"
  );

  let errorAccourd = false;

  usernameError.innerText = "";
  emailError.innerText = "";
  passwordError.innerText = "";
  confirmPasswordError.innerText = "";

  //Check if username is valid
  if (usernameEl.value === "") {
    usernameEl.style.border = "2px solid red";
    usernameError.innerText = "Username cannot be empty!";
    errorAccourd = true;
  }
  if (!emailEl.value.includes("@")) {
    emailEl.style.border = "2px solid red";
    emailError.innerText = "Enter a valid email!";
  }
  if (passwordEl.value.length < 8 || passwordEl.value.length > 15) {
    passwordEl.style.border = "2px solid red";
    passwordError.innerText = "Password length should be between 8-15";
    errorAccourd = true;
  }
  if (confirmPasswordEl.value !== passwordEl.value) {
    confirmPasswordEl.border = "2px solid red";
    passwordError.innerText = "Password didn't match!";
    errorAccourd = true;
  }
  if (!errorAccourd) {
    usernameEl.style.border = "none";
    emailEl.style.border = "none";
    passwordEl.style.border = "none";
    confirmPasswordEl.border = "none";

    usernameEl.value = "";
    emailEl.value = "";
    passwordEl.value = "";
    confirmPasswordEl.value = "";

    usernameError.innerText = "";
    emailError.innerText = "";
    passwordError.innerText = "";
    confirmPasswordError.innerText = "";

    alert("Form submitted sucessfilly!");
  }
});
