import firebase from "firebase/app";
import "firebase/auth";

export function init() {
  console.log("auth init start");
  // auth login-status
  firebase.auth().onAuthStateChanged(function(user) {
    const loginStatus = document.getElementById("login-status");
    if (user) {
      // User is signed in.
      loginStatus.textContent = "login";
    } else {
      // No user is signed in.
      loginStatus.textContent = "logout";
    }
  });

  // add event listener
  document
    .getElementById("sign-up")
    .addEventListener("click", handleSignUp, false);
  document
    .getElementById("sign-in")
    .addEventListener("click", handleSignIn, false);
  document
    .getElementById("sign-out")
    .addEventListener("click", handleSignOut, false);

  console.log("auth init done");
}

function handleSignUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}

function handleSignIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}

function handleSignOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
      console.log(error);
    });
}
