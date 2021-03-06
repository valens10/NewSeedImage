// declare all inputs and views
const loginForm = document.getElementById("login-form");
const usernameInputL = document.getElementById("inputL-username");
const passwordInputL = document.getElementById("inputL-password");
const errorUsernameL = document.getElementById("errorL-username");
const errorPasswordL = document.getElementById("errorL-password");

var username = "";
email = "";
password = "";

loginForm.onsubmit = function (e) {
    e.preventDefault();

    validate();
}

function validate() {


    //validate email used as username
    if (usernameInputL.value == "") {
        errorUsernameL.innerHTML = "This field is required. ";
        errorUsernameL.style.color = "red"
        usernameInputL.style.borderColor = "red";
        document.FormLogin.UsernameL.focus();
        return
        
    } else {
        username = usernameInputL.value;
        errorUsernameL.innerHTML = "";
        usernameInputL.style.borderColor = "green"
    }

    //validate password input
    if (passwordInputL.value == "") {
        errorPasswordL.innerHTML = "This field is required";
        errorPasswordL.style.color = "red";
        passwordInputL.style.borderColor = "red";
        document.FormLogin.PasswordL.focus();
        return;
        
    }else if (passwordInputL.value.length < 8) {
        errorPasswordL.innerHTML = "Password must be atleast 8 characters. ";
        errorPasswordL.style.color = "red";
        passwordInputL.style.borderColor = "red";
        document.FormLogin.PasswordL.focus();
        return;
    } else {
        password = passwordInputL.value;
        errorPasswordL.innerHTML = "";
        passwordInputL.style.borderColor = "green";
    }

    if (username, password) {
        login(username,password);
    }
}


async function login(username,password) {
    const params = {
            email:username,
            password
        }

    await axios.post(api_url + 'users/sign_in', params)
        .then(res => {
            //reset form
            FormLogin.reset();
            set_user(res.data.user);
            sessionStorage.setItem("token", JSON.stringify(res.data.token));
            window.location.href = "#home";
            rightPanel.style.display = "block";
            getCurrentUser(res.data.user)
        })
        .catch(err => console.error(err))
}
