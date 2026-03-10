function showAlert(message) {
    alert("Information: " + message);
}
function addition(num1, num2,num3) {
    return num1 + num2 + num3;
}
function pass_fail(score) {
    let result ="Pass";
    if (score < 60) {
        result = "Fail";
    }
    return result;
}
function GenerateAddition(num1, num2,num3) {
       document.getElementById("additionResult").innerHTML = '' + addition(num1, num2,num3);
}
function GeneratePassFail(score) {
       document.getElementById("passFailResult").innerHTML = ' ' + pass_fail(score);
}