window.onload = function() {
  const loginStatus = getCookie("loginStatus");
  const username = getCookie("username");

  if (loginStatus !== "true") {
    alert("Please login first!");
    window.location.href = "Login.html";
  } else {
    document.getElementById("welcomeText").innerHTML =
      "Welcome, " + username + "!";
  }
};

function getCookie(name) {
  const cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");

    if (cookie[0] === name) {
      return cookie[1];
    }
  }

  return "";
}

function logout() {
  deleteCookie("username");
  deleteCookie("loginStatus");

  alert("Logout successful!");
  window.location.href = "Login.html";
}

function checkCookies() {
  const username = getCookie("username");
  const loginStatus = getCookie("loginStatus");

  alert(
    "Username: " + username + "\n" +
    "Login Status: " + loginStatus
  );
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}