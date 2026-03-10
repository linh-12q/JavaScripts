
function showResult(elementId, isValid, allowedExamples = "") {
    const resultEl = document.getElementById(elementId);
    
    if (isValid) {
        resultEl.innerHTML = '<span style="color:#16a34a; font-weight:bold;">✓ True</span>';
    } else {
        let msg = '✗ False';
        if (allowedExamples) {
            msg += ` – (allowed: ${allowedExamples})`;
        }
        resultEl.innerHTML = `<span style="color:#dc2626; font-weight:bold;">${msg}</span>`;
    }
}

function checkNumber(str) {
    return /^-?\d+$/.test(str.trim());
}

function validateNumber() {
    const val = document.getElementById('txt1').value;
    const isValid = checkNumber(val);
    showResult('result1', isValid, "-123, 0, 456, -789");
}

function checkPositiveNumber(str) {
    return checkNumber(str) && Number(str.trim()) > 0;
}

function validatePositiveNumber() {
    const val = document.getElementById('txt2').value;
    const isValid = checkPositiveNumber(val);
    showResult('result2', isValid, "1, 42, 100, 999");
}
function checkDecimal(str) {
    str = str.trim();
    if (!str || str === '.') return false;
    return !isNaN(str) && str.includes('.') && !isNaN(parseFloat(str));
}

function validateDecimal() {
    const val = document.getElementById('txt3').value;
    const isValid = checkDecimal(val);
    showResult('result3', isValid, "-3.14, 0.001, 2.5, -0.7");
}

function checkPositiveDecimal(str) {
    return checkDecimal(str) && parseFloat(str.trim()) > 0;
}

function validatePositiveDecimal() {
    const val = document.getElementById('txt4').value;
    const isValid = checkPositiveDecimal(val);
    showResult('result4', isValid, "0.01, 2.5, 100.7, 0.0001");
}

function checkEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
}

function validateEmail() {
    const val = document.getElementById('txt5').value;
    const isValid = checkEmail(val);
    showResult('result5', isValid, "user@gmail.com, name@company.co, test@sub.domain.org");
}
function checkBoolean(str) {
    const val = str.trim().toLowerCase();
    return ['true', 'false', 'yes', 'no', '1', '0'].includes(val);
}

function validateBoolean() { 
    const val = document.getElementById('txt6').value;
    const isValid = checkBoolean(val);
    showResult('result6', isValid, "true, false, yes, no, 1, 0");
}