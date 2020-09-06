const nameUserInput = document.getElementById("user-name-input");
const emailUserInput = document.getElementById("user-email-input");
const updateUserInfoForm = document.getElementById("updateUserInfo");
const errorInputUser = document.getElementById("error-user-input");

var nameUser = "";
var emailUser = "";
var userId = "";
if (UserData) {
    userId = UserData._id;
}
// console.log("userId",userId,token)
if (updateUserInfoForm) {
    updateUserInfoForm.onsubmit = function (e) {
    e.preventDefault();
    updateFormValidate();
}
}

function updateFormValidate() {
    if (nameUserInput.value == "" || emailUserInput.value == "") {
        errorInputUser.innerHTML = "All fields are required";
        errorInputUser.style.color = "red"
        return;
        
    } else {
        errorInputUser.innerHTML = "";
        nameUser = nameUserInput.value;
        emailUser = emailUserInput.value;
        console.log("params:", nameUser, emailUser);

        updateProfile(nameUser,emailUser)
    }
}

async function updateProfile(nameUser, emailUser) {
    const params = {
            full_name:nameUser,
            email:emailUser
        }

    await axios.patch(api_url + 'update_user/' + userId,
        params,{headers:{ Authorization: token }})
        .then(res => {
            //reset form
            UpdateUserInfo.reset();
            console.log('updaated profile', res.data.user)
            set_user(res.data.user);
            window.location.href = "#home";
            gNavClose()
        })
        .catch(err => function (){
            console.log(err)
        } )
}