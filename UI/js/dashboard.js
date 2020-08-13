const postForm = document.getElementById("addPost-Form");
allPostScreen = document.getElementById("particle-all-list");
const postTitle = document.getElementById("title");
const descriptionInput = document.getElementById("description-input");
const errorFormView = document.getElementById("error-form-view");
const selectCatView = document.getElementById("catlist-view");
const mailsScreen = document.getElementById("message-screen");
const usersScreen = document.getElementById("users-screen");

var post_title = "";
var post_body = "";
var post_category = "";
var user_info = {};


auth.onAuthStateChanged(function (user) {
  if (user) {
    return users.child(user.uid)
          .once('value')
          .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              user_info["id"] = user.uid;
              user_info["name"] = childSnapshot.val().name;
              user_info["email"] = childSnapshot.val().email;

              });
          });
    
  } else {
    // No user is signed in.
    return;
      
  }
});

postForm.onsubmit = function (e) {
  e.preventDefault();
  validate_post_form()

}

function validate_post_form() {
  // validate fields
  if (postTitle.value == "" || descriptionInput.value == "" || selectCatView.value == "") {
    errorFormView.innerHTML = "All the fields are required.";
    errorFormView.style.color = "red";
  } else {
    errorFormView.innerHTML = "";
    errorFormView.style.display = "none";
    post_title = postTitle.value;
    post_body = descriptionInput.value;
    post_category = selectCatView.value;
    console.log("params:", post_body, post_title);

    post(post_title, post_body, post_category);
  }
  
}
function openPost(evt, e) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(e).style.display = "block";
  evt.currentTarget.className += " active";
}

function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

function post(post_title, post_body, post_category) {
  var now = new Date();
  var date_time = [[AddZero(now.getDate()),
  AddZero(now.getMonth() + 1),
  now.getFullYear()].join("/"),
  [AddZero(now.getHours()),
  AddZero(now.getMinutes())].join(":"),
  now.getHours() >= 12 ? "PM" : "AM"].join(" ");
  const article = {
    id,
    title: post_title,
    body: post_body,
    category: post_category,
    created_by:user_info,
    created_at:date_time
  }

  posts.push(article);
  AddPostForm.reset();

}

Get_data = data => {
  const postScreen = `<li class="list-of-article">
              <form action="" class="article-form-view">
                <input type="text" id="title-post-view" value="${data.val().title}"><br>
                <textarea name="Description" id="post-body" cols="30" rows="4">${data.val().body}</textarea> <br>
                <input type="submit" id="btn-update-post" value="Update"> <input type="submit" id="btn-delete-post" value="Delete">
                <div class="created_by_view" style="float: right; margin-right: 20px;">Create by: <span>${data.val().created_by.name}</span> <br> Created at: <i style="color: red;">${data.val().created_at}</i></div>
              </form>
              <div style="width: 100%; height: 1px; background-color: white;"></div>
          </li> `;
  allPostScreen.innerHTML += postScreen;
}
//Get all articles
posts.on("child_added", Get_data);


//Get all users
users.on('value',function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    childSnapshot.forEach(function (snap) {
      var profView1 = `<tr>
    <td>${snap.val().name}</td>
    <td>${snap.val().email}</td>
    <td><button>Update</button> <button>Delete</button></td>
  </tr>`;
  usersScreen.innerHTML += profView1;
      
    });
  });
});

//get all messages/mails
messages.on('value',function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    console.log("Messages:", childSnapshot.val());
    const msgScreen = `<tr>
    <td>${childSnapshot.val().name}</td>
    <td>${childSnapshot.val().email}</td>
    <td>${childSnapshot.val().msg}</td>
    <td>Kigali</td>
    <td><button>Delete</button></td>
  </tr>`;
    mailsScreen.innerHTML += msgScreen;
    
  });
});


      

