// declare all inputs and views
loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const errorUsername = document.getElementById("error-username");
const errorPassword = document.getElementById("error-password");


// Web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAbd2vzRqdkf1NhchCLB8VA_aOjjEMzcRs",
    authDomain: "my-brand-23221.firebaseapp.com",
    databaseURL: "https://my-brand-23221.firebaseio.com",
    projectId: "my-brand-23221",
    storageBucket: "my-brand-23221.appspot.com",
    messagingSenderId: "138479866391",
    appId: "1:138479866391:web:1b0d275e8cf610c9df4252"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const users = db.ref("/users");

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
        login(username, password);
    } else {
        
    }
}

function login(username, password) {
    var pass_word = password;
    var user = users.orderByKey();
    var found = false;
    user.on("value", function (snapshot) {
        if (snapshot.exists()) {
            //find which user has this credential
            snapshot.forEach(function (childSnapshot) {
                console.log("childSnapshot", childSnapshot.val());

                //check if the user exist in the database
                if (childSnapshot.val().username == username && childSnapshot.val().password == pass_word) {
                    console.log("Successful logged in.!")
                    return;
                }
            })
            if (!found) {
                console.log("Your account not found!")
            }
        } else {
            console.log("Register first.")
            return;
        }
    })
}