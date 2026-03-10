const numInput = document.getElementById("num");
const posNumInput = document.getElementById("pos-num");
const decInput = document.getElementById("dec");
const posDecInput = document.getElementById("pos-dec");
const emailInput = document.getElementById("email");
const boolInput = document.getElementById("bool");

// --- 1. SET ERROR / SUCCESS (Border & Text Logic) ---

const setError = (element, message) => {
    const parent = element.parentElement;
    const errorDisplay = parent.querySelector("span");
    
    errorDisplay.innerText = ` ✗ ${message}`;
    errorDisplay.style.color = "#e74c3c"; // Red Text
    element.style.borderColor = "#e74c3c"; // Red Border
};

const setSuccess = (element) => {
    const parent = element.parentElement;
    const errorDisplay = parent.querySelector("span");
    
    errorDisplay.innerText = " ✓ Valid";
    errorDisplay.style.color = "#2ecc71"; // Green Text
    element.style.borderColor = "#2ecc71"; // Green Border
};

// --- 2. VALIDATION RULES (Regex) ---

const isValidDecimal = (val) => /^-?\d+\.\d+$/.test(val);
const isValidPosDecimal = (val) => /^\d+\.\d+$/.test(val) && parseFloat(val) > 0;
const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
const isValidBool = (val) => ["true", "false", "yes", "no", "1", "0"].includes(val.toLowerCase());

// --- 3. CHECK FUNCTIONS ---

const checkNumber = () => {
    const val = numInput.value.trim();
    if (val !== "" && !isNaN(val)) {
        setSuccess(numInput);
    } else {
        setError(numInput, "Invalid Number");
    }
};

const checkPositiveNumber = () => {
    const val = posNumInput.value.trim();
    const num = parseFloat(val);
    if (val !== "" && !isNaN(num) && num > 0) {
        setSuccess(posNumInput);
    } else {
        setError(posNumInput, "Must be > 0");
    }
};

const checkDecimal = () => {
    if (isValidDecimal(decInput.value.trim())) {
        setSuccess(decInput);
    } else {
        setError(decInput, "Use 0.00 format");
    }
};

const checkPositiveDecimal = () => {
    if (isValidPosDecimal(posDecInput.value.trim())) {
        setSuccess(posDecInput);
    } else {
        setError(posDecInput, "Must be positive 0.00");
    }
};

const checkEmail = () => {
    if (isValidEmail(emailInput.value.trim())) {
        setSuccess(emailInput);
    } else {
        setError(emailInput, "Invalid Email");
    }
};

const checkBoolean = () => {
    if (isValidBool(boolInput.value.trim())) {
        setSuccess(boolInput);
    } else {
        setError(boolInput, "Use true/false/1/0");
    }
};

// --- 4. ENTER KEY LOGIC ---

function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        
        // Find the button next to the input and click it
        const button = event.target.nextElementSibling;
        if (button && button.tagName === "BUTTON") {
            button.click();
        }
    }
}

// Attach listeners and reset borders on typing
const allInputs = [numInput, posNumInput, decInput, posDecInput, emailInput, boolInput];

allInputs.forEach(input => {
    input.addEventListener("keydown", handleEnterKeyPress);
    
    // Clear red border when user starts typing again
    input.addEventListener("input", () => {
        input.style.borderColor = "#f0f0f0"; // Reset to light gray
        const parent = input.parentElement;
        parent.querySelector("span").innerText = "";
    });
});