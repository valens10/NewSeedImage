const userInfo = document.getElementById("currentUser-info");
const rightPanel = document.getElementById("right-panel");
const bodyE = document.body;
const gNavMaskE = document.querySelector('.gNav-mask');
const gNavBeforeE = document.querySelector('#gNav-beforeE');
const gNavAfterE = document.querySelector('#gNav-afterE');
const gNavE = document.querySelector('.gNav');
const gNavCloseBtn = document.querySelector('.gNav-closeBtn');
const gNavOpenBtn = document.querySelector('.gNav-openBtn');
const eExcludingHeader = document.querySelectorAll('body > *:not(header)');
const allArticleScreen = document.getElementById("all-articles");

async function set_user(user) {
 await sessionStorage.setItem("user", JSON.stringify(user));
  getCurrentUser(user);
}

var UserData = JSON.parse(sessionStorage.getItem("user"));
var token = "";
if (JSON.parse(sessionStorage.getItem("token"))) {
  token = JSON.parse(sessionStorage.getItem("token"));
}
console.log("token", token);
if (UserData) {
  console.log("current user: ", UserData);
  getCurrentUser(UserData);
} else {
  gNavClose()
}

function gNavOpen() {
  bodyE.style.overflow = "hidden";
  for(let i = 0; i < eExcludingHeader.length; i++) {
    eExcludingHeader[i].setAttribute("aria-hidden", "true");
  }
  gNavBeforeE.setAttribute("tabindex", "0");
  gNavAfterE.setAttribute("tabindex", "0");
  gNavMaskE.classList.add('gNav-mask-appear');
  gNavE.classList.add('gNav-open');
  gNavCloseBtn.style.display = "block";

  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      gNavClose();
    }
  });
}

function gNavClose() {
  bodyE.removeAttribute('style');
  for(let i = 0; i < eExcludingHeader.length; i++) {
    eExcludingHeader[i].setAttribute("aria-hidden", "false");
  }
  gNavBeforeE.setAttribute("tabindex", "-1");
  gNavAfterE.setAttribute("tabindex", "-1");
  gNavMaskE.classList.remove('gNav-mask-appear');
  gNavE.classList.remove('gNav-open');
  gNavCloseBtn.style.display = "none";
  gNavOpenBtn.focus();
}

function chgFocus(elem) {
  document.querySelector(elem).focus();
}




function getCurrentUser (user) {
  if (user) {
    // User is signed in.
    rightPanel.style.display = "block";
    const profView = `<form action="" class="updateUserInfo" id="updateUserInfo" name="UpdateUserInfo">
        <input id="user-name-input" type="text" name="Name" value="${user.full_name}"><br>
        <input id="user-email-input" type="email" name="Email" value="${user.email}"><br>
        <div id="error-user-input"></div><br><br>
        <input id="update-user-btn" type="submit" value="Update">
    </form>`;
    userInfo.innerHTML = profView;
    
  } else {
    // No user is signed in.
    window.location.href = "#home";
    rightPanel.style.display = "none";
      
  }
}

function signout() {
  sessionStorage.clear();
  rightPanel.style.display = "none";
  gNavClose()
  window.location.href = "#login";
  
}


//list all articles on blog page
list_all_articles()
async function list_all_articles() {
  await axios.get(api_url + 'articles')
    .then(res => {
      const articles = res.data;
      articles.forEach(function (article) {
        const ScreenPost = `<li>
            <a href="#">
                <table class="table-article-page">
                    <tr>
                        <td rowspan="2">
                            <i>${article.category}</i><br>
                            <img class="post-image" src="./media/jule1t 23.53.38.jpeg" alt="" srcset="">
                        </td>
                        <td class="post-description">
                            <b${article.title}</b><br>
                            <p>${article.description}</p> <br>
                        </td>
                    </tr>
                    <tr>
                        <td class="article-date">
                            <i>Created by: <span>${article.user}</span> </i><br>
                            <i>Posted at: ${article.Created_at}</i>
                        </td>
                    </tr>
                </table>
            </a>
            <div style="background-color: white; width: 100%; height: 2px;"></div>
        </li>`;
  allArticleScreen.innerHTML += ScreenPost;
      
  })
        })
    .catch(err => console.log('err', err))
}








