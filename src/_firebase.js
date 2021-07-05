import firebase from "firebase/app";

export function init() {
  console.log("firebase init start");
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBKv0VFj0Cisc_LdYb4I4wvbH55J1spH44",
    authDomain: "web-example-9615c.firebaseapp.com",
    databaseURL: "https://web-example-9615c.firebaseio.com",
    projectId: "web-example-9615c",
    storageBucket: "web-example-9615c.appspot.com",
    messagingSenderId: "1066032347299"
  };

  /// See This Issue https://github.com/zeit/next.js/issues/1999
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  console.log("firebase init done");
}
