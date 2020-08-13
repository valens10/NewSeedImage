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
const auth = firebase.auth();
const messages = db.ref("/Messages");
const users = db.ref("/Users");
const posts = db.ref("/Posts");
const id = uuid();
