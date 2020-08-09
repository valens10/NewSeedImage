// declare contact form fields
fullName = document.getElementById('fullName');
message = document.getElementById('message-input');
formEmailC = document.getElementById('email');
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
    var atposition = formEmailC.value.indexOf("@");  
    var dotposition = formEmailC.value.lastIndexOf(".");
    if (formEmailC.value == "") {
        errorEmail.innerHTML = "This field is required. ";
        errorEmail.style.color = "red"
        formEmailC.style.borderColor = "red";
        document.FormMessage.Email.focus();
        return
        
    }else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= formEmailC.value.length) {
        errorEmail.innerHTML = "Please enter a valid e-mail address";
        errorEmail.style.color = "red";
        formEmailC.style.borderColor = "red";
        document.FormMessage.Email.focus();
        return;
         
    } else {
        email = formEmailC.value;
        errorEmail.innerHTML = "";
        formEmailC.borderColor = "green"
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

    function get_user_location() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            return 0;
        }
    }

    function showPosition(position) {
        const userLoation = {
            Latitude:position.coords.latitude,
            Longitude:position.coords.longitude
        }
        return userLocation;

        }
    

    //check all required inputs to be sent to server.
    if (name, email, msg) {
        const location = {};
        const locationData = get_user_location();
        if (locationData) {
            location = locationData;
            console.log("location:", location);
        }
        const sms = {
            id,
            name,
            email,
            msg,
            location 
        };
        messages.push(sms);
        FormMessage.reset();
        window.location.href = "#home";
    } else {
        return;
    }
 }