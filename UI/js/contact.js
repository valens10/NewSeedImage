// declare contact form fields
fullName = document.getElementById('fullName');
message = document.getElementById('message-input');
formEmail = document.getElementById('email');
contactForm = document.getElementById('contact-form');
const errorName = document.getElementById('error-name-view');
const errorEmail = document.getElementById('error-email-view');
const errorComment = document.getElementById('error-comment-view');

var name = "";
var email = "";
var msg = "";

//prevent form to be submitted
contactForm.onsubmit = function (e) {
    e.preventDefault();
    validateForm();
}

function validateForm() {

    //validate user full name
    if (fullName.value == "") {
        errorName.innerHTML = "This field is required.";
        errorName.style.color = "red";
        fullName.style.borderColor = "red";
        document.FormMessage.Name.focus();
        return;
        
    }else if (fullName.value.length < 4) {
        errorName.innerHTML = "Your name must be atleast above 4 characters.";
        errorName.style.color = "red";
        fullName.style.borderColor = "red";
        document.FormMessage.Name.focus();
        return;
    } else {
        name = fullName.value;
        errorName.innerHTML = "";
        fullName.style.borderColor = "green";
    }
    
    //validate email
    var atposition = formEmail.value.indexOf("@");  
    var dotposition = formEmail.value.lastIndexOf(".");
    if (formEmail.value == "") {
        errorEmail.innerHTML = "This field is required. ";
        errorEmail.style.color = "red"
        formEmail.style.borderColor = "red";
        document.FormMessage.Email.focus();
        return
        
    }else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= formEmail.value.length) {
        errorEmail.innerHTML = "Please enter a valid e-mail address";
        errorEmail.style.color = "red";
        formEmail.style.borderColor = "red";
        document.FormMessage.Email.focus();
        return;
         
    } else {
        email = formEmail.value;
        errorEmail.innerHTML = "";
        formEmail.borderColor = "green"
    }
    
    //validate message
    if (message.value == "") {
        errorComment.innerHTML = "This field is required";
        errorComment.style.color = "red";
        message.style.borderColor = "red";
        document.FormMessage.Message.focus();
        return;
         
    } else {
        msg = message.value;
        errorComment.innerHTML = "";
        message.style.borderColor = "green";
    }
    

    //check all required inputs to be sent to server.
    if (name,email,msg) {
        console.log("contact param: ", name, email, msg);
    } else {
        return;
    }
 }