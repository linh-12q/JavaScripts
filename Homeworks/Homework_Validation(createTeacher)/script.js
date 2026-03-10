const form = document.getElementById("form");
const Teachercode = document.getElementById("Teachercode");
const Teachername = document.getElementById("Teachername");
const contact = document.getElementById("contact");
const Msg = document.getElementById("Msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmission();
});


function handleEnterKeyPress(event) {
  if (event.key === "Enter") {
    
    event.preventDefault(); 
    handleSubmission();
  }
}

[Teachercode, Teachername, contact].forEach(input => {
  input.addEventListener("keydown", handleEnterKeyPress);
});

function handleSubmission() {
  if (validateInputs()) {
    Msg.innerHTML = "Information saved successfully!";
    Msg.className = "text-center success-text";
    form.reset();

    document.querySelectorAll(".input-control").forEach((control) => {
      control.classList.remove("success", "error");
    });

    setTimeout(() => { Msg.innerHTML = ""; }, 3000);
  } else {
    Msg.innerHTML = "Warning: Please fill in all fields correctly.";
    Msg.className = "text-center error-text";
  }
}
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

const isValidTeachercode = (val) => /^[A-Z]+\d+$/.test(val);
const isValidTeachername = (val) => /^[A-Za-z\s]+$/.test(val);
const isValidContact = (val) => /^\d+$/.test(val) && val.length < 10;

const validateInputs = () => {
  const codeVal = Teachercode.value.trim();
  const nameVal = Teachername.value.trim();
  const contactVal = contact.value.trim();
  let isValid = true;

  if (codeVal === "" || !isValidTeachercode(codeVal)) {
    setError(Teachercode, "Must start with Capital letters (e.g., P002)");
    isValid = false;
  } else { setSuccess(Teachercode); }

  if (nameVal === "" || !isValidTeachername(nameVal)) {
    setError(Teachername, "Use letters and spaces only");
    isValid = false;
  } else { setSuccess(Teachername); }

  if (contactVal === "" || !isValidContact(contactVal)) {
    setError(contact, "Must be numbers and less than 10 digits");
    isValid = false;
  } else { setSuccess(contact); }

  return isValid;
};