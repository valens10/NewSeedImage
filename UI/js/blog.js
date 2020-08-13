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




auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    rightPanel.style.display = "block";
    return users
            .child(user.uid)
            .once('value')
            .then(function (snapshot) {
              snapshot.forEach(function (childSnapshot) {
                const profView = `<form action="" class="updateUserInfo">
                    <input id="user-name-input" type="text" name="Name" value="${childSnapshot.val().name}"><br>
                    <input id="user-email-input" type="email" name="Email" value="${childSnapshot.val().email}"><br><br>
                    <input id="update-user-btn" type="submit" value="Update">
                </form>`;
                userInfo.innerHTML = profView;

                });
            });
    
  } else {
    // No user is signed in.
      // window.location.href = "#login";
    rightPanel.style.display = "none";
      
  }
});

function signout() {
  auth.signOut();
  window.location.href = "#login";
  gNavClose()
  rightPanel.style.display = "none";
}

retrive_data = data => {
  const ScreenPost = `<li>
            <a href="#">
                <table class="table-article-page">
                    <tr>
                        <td rowspan="2">
                            <i>Technology</i><br>
                            <img class="post-image" src="./media/jule1t 23.53.38.jpeg" alt="" srcset="">
                        </td>
                        <td class="post-description">
                            <b${data.val().title}</b>
                            <p>${data.val().body}</p> <br>
                            <div>like icons <i>123</i></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="article-date">
                            <i>Created by: <span>${data.val().created_by.name}</span> </i><br>
                            <i>Posted at: ${data.val().created_at}</i>
                        </td>
                    </tr>
                </table>
            </a>
            <div style="background-color: white; width: 100%; height: 2px;"></div>
        </li>`;
  allArticleScreen.innerHTML += ScreenPost;
}
posts.on("child_added", retrive_data);





