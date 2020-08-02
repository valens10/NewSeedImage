// declare all inputs and views
loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const errorUsername = document.getElementById("error-username");
const errorPassword = document.getElementById("error-password");

var username = "";
var password = "";

loginForm.onsubmit = function (e) {
    e.preventDefault();
    validate();
}


function validate() {

    //validate username input
    if (usernameInput.value == "") {
        errorUsername.innerHTML = "This field is required";
        errorUsername.style.color = "red";
        usernameInput.style.borderColor = "red";
        document.FormLogin.Username.focus();
        return;
    } else if (usernameInput.value.length < 6) {
        errorUsername.innerHTML = "Username must be atleast 6 characters. ";
        errorUsername.style.color = "red";
        usernameInput.style.borderColor = "red";
        document.FormLogin.Username.focus();
        return;
    } else {
        username = usernameInput.value;
        usernameInput.style.borderColor = "green";
        errorUsername.innerHTML = "";
    }

    //validate password input
    if (passwordInput.value == "") {
        errorPassword.innerHTML = "This field is required";
        errorPassword.style.color = "red";
        passwordInput.style.borderColor = "red";
        document.FormLogin.Password.focus();
        return;
        
    }else if (passwordInput.value.length < 8) {
        errorPassword.innerHTML = "Password must be atleast 8 characters. ";
        errorPassword.style.color = "red";
        passwordInput.style.borderColor = "red";
        document.FormLogin.Password.focus();
        return;
    } else {
        password = passwordInput.value;
        errorPassword.innerHTML = "";
        passwordInput.style.borderColor = "green";
    }

    if (username,password) {
        console.log("login param:", username, password);
    } else {
        
    }
}