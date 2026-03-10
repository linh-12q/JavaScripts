
const form = document.getElementById("form");
const Username = document.getElementById("Username");
const Email = document.getElementById("Email");
const Password = document.getElementById("Password");
const ComfirmPassword = document.getElementById("ComfirmPassword");
const Msg = document.getElementById("Msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateInputs()) {
    Msg.innerHTML = "Information saved successfully!";
    Msg.className = "text-center success-text";

    form.reset();

    const allInputControls = document.querySelectorAll(".input-control");
    allInputControls.forEach((control) => {
      control.classList.remove("success");
      control.classList.remove("error");
    });


    setTimeout(() => {
      Msg.innerHTML = "";
    }, 3000); 
  } else {
    Msg.innerHTML = "Warning: Please fill in all fields correctly.";
    Msg.className = "text-center error-text";
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");


  if (errorDisplay) {
    errorDisplay.innerText = message;
  }

  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  if (errorDisplay) {
    errorDisplay.innerText = "";
  }

  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidUsername = (val) => /^[A-Za-z\s]+$/.test(val);

const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

const isValidPassword = (val) => /^[A-Za-z0-9@#]+$/.test(val) && val.length > 8;

const isValidComfirmPassword = (val) => val === Password.value.trim();


const validateInputs = () => {
  
  const UsernameVal = Username.value.trim();
  const EmailVal = Email.value.trim();
  const PasswordVal = Password.value.trim();
  const ComfirmPasswordVal = ComfirmPassword.value.trim();

  let isValid = true;


  if (UsernameVal === "") {
    setError(Username, "Username is required");
    isValid = false;
  } else if (!isValidUsername(UsernameVal)) {
    setError(Username, "Username must contain only letters and spaces");
    isValid = false;
  } else {
    setSuccess(Username);
  }
  if (EmailVal === "") {
    setError(Email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(EmailVal)) {
    setError(Email, "Provide a valid email address");
    isValid = false;
  } else {
    setSuccess(Email);
  }
  if (PasswordVal === "") {
    setError(Password, "Password is required");
    isValid = false;
  } else if (!isValidPassword(PasswordVal)) {
    setError(Password, "Must be more than 8 chars (Letters, Numbers, @, # allowed)");
    isValid = false;
  } else {
    setSuccess(Password);
  }
  if (ComfirmPasswordVal === "") {
    setError(ComfirmPassword, "Confirm Password is required");
    isValid = false;
  } else if (!isValidComfirmPassword(ComfirmPasswordVal)) {
    setError(ComfirmPassword, "Passwords do not match");
    isValid = false;
  } else {
    setSuccess(ComfirmPassword);
  }

  return isValid;
};