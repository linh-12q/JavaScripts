function showResult(elementId, isValid, message = "") {
  const el = document.getElementById(elementId);
  el.textContent = isValid
    ? "✅ True" + (message ? " – " + message : "")
    : "❌ False" + (message ? " – " + message : "");
  el.className = isValid ? "True" : "False";
}
function checkNumber() {
  const value = document.getElementById("num").value.trim();
  const isNum = /^-?\d+(\.\d+)?$/.test(value);
  showResult(
    "num-result",
    isNum,
    isNum ? "" : "(allowed: -123, 0, 4.56, -0.7)",
  );
}

function checkPositiveNumber() {
  const value = document.getElementById("pos-num").value.trim();
  const num = Number(value);
  const isValid = !isNaN(num) && num > 0;
  showResult("pos-num-result", isValid, isValid ? "" : "(must be > 0)");
}
function checkDecimal() {
  const value = document.getElementById("dec").value.trim();
  const isDecimal = /^-?\d+\.\d+$/.test(value);
  showResult(
    "dec-result",
    isDecimal,
    isDecimal ? "" : "(must contain .decimal part)",
  );
}
function checkPositiveDecimal() {
  const value = document.getElementById("pos-dec").value.trim();
  const num = Number(value);
  const hasDecimal = /\.\d+$/.test(value);
  const isValid = !isNaN(num) && num > 0 && hasDecimal;
  showResult(
    "pos-dec-result",
    isValid,
    isValid ? "" : "(must be > 0 and have decimal part)",
  );
}
function checkEmail() {
  const value = document.getElementById("email").value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailRegex.test(value);
  showResult("email-result", isValid);
}
function checkBoolean() {
  const value = document.getElementById("bool").value.trim().toLowerCase();

  const trueValues = ["true", "yes", "1", "on", "y", "ok"];
  const falseValues = ["false", "no", "0", "off", "n"];

  let result = null;

  if (trueValues.includes(value)) {
    result = true;
  } else if (falseValues.includes(value)) {
    result = false;
  }

  const isValid = result !== null;
  const display = isValid ? String(result) : "—";

  showResult(
    "bool-result",
    isValid,
    isValid ? `(interpreted as: ${display})` : "",
  );
}
