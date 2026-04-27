const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "123456") {
    setCookie("username", username, 1);
    setCookie("loginStatus", "true", 1);

    message.innerHTML = "Login successful!";
    message.className = "success";

    setTimeout(function() {
      window.location.href = "protected.html";
    }, 1000);

  } else {
    message.innerHTML = "Wrong username or password!";
    message.className = "error";
  }
});

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

  document.cookie = name + "=" + value +
    "; expires=" + date.toUTCString() +
    "; path=/";
}