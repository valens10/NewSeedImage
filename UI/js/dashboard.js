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

async function post(post_title, post_body, post_category) {
  const article = {
    title: post_title,
    description: post_body,
    user: UserData.full_name,
    category:post_category
  }
  await axios.post(api_url + 'articles',article)
    .then(res => {
      console.log('data', res.data);
          AddPostForm.reset();
        })
    .catch(err => console.log('err', err))
}

//get all all articles
list_all_articles()
async function list_all_articles() {
  await axios.get(api_url + 'articles')
    .then(res => {
      const articles = res.data;
      articles.forEach(function (article) {
      const postScreen = `<li class="list-of-article">
              <form action="" class="article-form-view">
                <input type="text" id="title-post-view" value="${article.title}"><br>
                <textarea name="Description" id="post-body" cols="30" rows="4">${article.description}</textarea> <br>
                <input type="submit" id="btn-update-post" value="Update"> <input type="submit" id="btn-delete-post" value="Delete">
                <div class="created_by_view" style="float: right; margin-right: 20px;">Create by: <span>${article.user}</span> <br> Created at: <i style="color: red;">${article.Created_at}</i></div>
              </form>
              <div style="width: 100%; height: 1px; background-color: white;"></div>
          </li> `;
      allPostScreen.innerHTML += postScreen;
  })
        })
    .catch(err => console.log('err', err))
}



//Get all users
get_users()
async function get_users() {
  await axios.get(api_url + 'update_user/',{headers: {Authorization: token }})
      .then(res => {
          set_user_details(res.data)
        })
    .catch(err => console.log('err', err))
}

function set_user_details(users) {
  console.log("users", users);
  users.forEach(function (user) {
    var profView1 = `<tr>
    <td>${user.full_name}</td>
    <td>${user.email}</td>
    <td>${user.Created_at}</td>
    <td><button class="btn-delete" onclick="delete_user('${user._id}')">Delete</button></td>
  </tr>`;
  usersScreen.innerHTML += profView1;
  });
}

get_all_messages()
//get all messages/mails
async function get_all_messages() {
  await axios.get(api_url + 'messages',{headers: {Authorization: token }})
    .then(res => {
      console.log("messages", res.data);
          set_mails_details(res.data)
        })
    .catch(err => console.log('err', err))
}
function set_mails_details(msgs) {
  msgs.forEach(function (message) {
    const msgScreen = `<tr>
    <td>${message.full_name}</td>
    <td>${message.email}</td>
    <td>${message.message}</td>
    <td>Kigali</td>
    <td>${message.Created_at}</td>
    <td><button onclick="delete_message('${message._id}')" class="btn-delete">Delete</button></td>
  </tr>`;
    mailsScreen.innerHTML += msgScreen;
  })
}

async function delete_user(_id) {
  const confirm_message = "Are you sure you want to delete this User";
  if (await confim_delete(confirm_message)) {
    await axios.delete(api_url + 'update_user/' + _id,{headers: {Authorization: token }})
    .then(res => {
      console.log("user", res.data);
        })
    .catch(err => console.log('err', err))
  }
}

async function delete_message(_id) {
  const confirm_message = "Are you sure you want to delete this message";
  if (await confim_delete(confirm_message)) {
    await axios.delete(api_url + 'messages/' + _id,{headers: {Authorization: token }})
    .then(res => {
      console.log("messages", res.data);
      get_users()
        })
    .catch(err => console.log('err', err))
  }
}

function confim_delete(confirm_message) {
  if (confirm(confirm_message)) {
    return 1;
  } else {return 0;}
}