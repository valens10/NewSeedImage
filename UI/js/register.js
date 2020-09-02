// declare all inputs
const registerForm = document.getElementById("register-form");
const nameInput = document.getElementById("input-name");
const formEmail = document.getElementById("input-email");
const passwordInput1 = document.getElementById("input-password1");
const passwordInput2 = document.getElementById("input-password2");

const errorName = document.getElementById("error-name");
const errorEmail = document.getElementById("error-email");
const errorPassword1 = document.getElementById("error-password1");
const errorpassword2 = document.getElementById("error-password2");

var name = "";
var email = "";
var password = "";

registerForm.onsubmit = function (e) {
    e.preventDefault();
    validateRegisterForm();
}

function validateRegisterForm() {

    // validate user full name
    if (nameInput.value == "") {
        errorName.innerHTML = "This field is required.";
        errorName.style.color = "red";
        nameInput.style.borderColor = "red";
        document.FormRegister.Name.focus();
        return;

    } else if (nameInput.value.length < 4) {
        errorName.innerHTML = "Your name must be atleast 4 chalacters.";
        errorName.style.color = "red";
        nameInput.style.borderColor = "red";
        document.FormRegister.Name.focus();
        return;
    } else {
        name = nameInput.value;
        errorName.innerHTML = "";
        nameInput.style.borderColor = "green";
    }

    //validate email
    var atposition = formEmail.value.indexOf("@");  
    var dotposition = formEmail.value.lastIndexOf(".");
    if (formEmail.value == "") {
        errorEmail.innerHTML = "This field is required. ";
        errorEmail.style.color = "red"
        formEmail.style.borderColor = "red";
        document.FormRegister.Email.focus();
        return
        
    }else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= formEmail.value.length) {
        errorEmail.innerHTML = "Please enter a valid e-mail address";
        errorEmail.style.color = "red";
        formEmail.style.borderColor = "red";
        document.FormRegister.Email.focus();
        return;
         
    } else {
        email = formEmail.value;
        errorEmail.innerHTML = "";
        formEmail.style.borderColor = "green"
    }

     //validate password input 1
    if (passwordInput1.value == "") {
        errorPassword1.innerHTML = "This field is required";
        errorPassword1.style.color = "red";
        passwordInput1.style.borderColor = "red";
        document.FormRegister.Password1.focus();
        return;
        
    }else if (passwordInput1.value.length < 8) {
        errorPassword1.innerHTML = "Password must be atleast 8 characters. ";
        errorPassword1.style.color = "red";
        passwordInput1.style.borderColor = "red";
        document.FormRegister.Password1.focus();
        return;
    } else if (passwordInput1.value == username) {
        errorPassword1.innerHTML = "Password must be different to your username. ";
        errorPassword1.style.color = "red";
        passwordInput1.style.borderColor = "red";
        document.FormRegister.Password1.focus();
        
    } else {
        password1 = passwordInput1.value;
        errorPassword1.innerHTML = "";
        passwordInput1.style.borderColor = "green";
    }

    // validate input Re-type_password
    if (passwordInput2.value == "") {
        errorpassword2.innerHTML = "This field is required."
        errorpassword2.style.color = "red";
        passwordInput2.style.borderColor = "red";
        document.FormRegister.Password2.focus();
        return;
        
    } else if (passwordInput2.value != passwordInput1.value) {
        errorpassword2.innerHTML = "Password not match, try again."
        errorpassword2.style.color = "red";
        document.FormRegister.Password2.focus();
        return;
        
    } else {
        password = passwordInput2.value;
        errorpassword2.innerHTML = "";
        passwordInput2.style.borderColor = "green";
    }

    if (name, email, password) {
        signUp(name, email, password) //when all inputs are validated then call function to register

    }
}

async function signUp(name, email, password) {
    const params = {
        full_name: name,
        email,
        password
        }

    await axios.post(api_url + 'users/sign_up', params)
        .then(res => {
            //reset form
            FormRegister.reset();
            window.location.href = "#login";
        })
        .catch(err => console.error(err))
}


