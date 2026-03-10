const form = document.getElementById("form");
const Teachercode = document.getElementById("Teachercode");
const Teachername = document.getElementById("Teachername");
const contact = document.getElementById("contact");
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

    // Clear message after 3 seconds
    setTimeout(() => {
      Msg.innerHTML = "";
    }, 8000);
  } else {
    Msg.innerHTML = "Warning: Please fill in all fields correctly.";
    Msg.className = "text-center error-text";
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

// --- UPDATED VALIDATION RULES ---

// 1. Must start with Capital Letters (A-Z) followed by numbers
const isValidTeachercode = (val) => /^[A-Z]+\d+$/.test(val);

// 2. Letters and spaces allowed
const isValidTeachername = (val) => /^[A-Za-z\s]+$/.test(val);

// 3. Numbers only and length MUST be LESS than 10
const isValidContact = (val) => /^\d+$/.test(val) && val.length < 10;

const validateInputs = () => {
  const codeVal = Teachercode.value.trim();
  const nameVal = Teachername.value.trim();
  const contactVal = contact.value.trim();

  let isValid = true;

  // Code Validation
  if (codeVal === "") {
    setError(Teachercode, "Teacher code is required");
    isValid = false;
  } else if (!isValidTeachercode(codeVal)) {
    setError(Teachercode, "Must start with Capital letters (e.g., P002)");
    isValid = false;
  } else {
    setSuccess(Teachercode);
  }

  // Name Validation
  if (nameVal === "") {
    setError(Teachername, "Teacher name is required");
    isValid = false;
  } else if (!isValidTeachername(nameVal)) {
    setError(Teachername, "Use letters and spaces only");
    isValid = false;
  } else {
    setSuccess(Teachername);
  }

  // Contact Validation
  if (contactVal === "") {
    setError(contact, "Contact is required");
    isValid = false;
  } else if (!isValidContact(contactVal)) {
    setError(contact, "Must be numbers and less than 10 digits");
    isValid = false;
  } else {
    setSuccess(contact);
  }

  return isValid;
};
