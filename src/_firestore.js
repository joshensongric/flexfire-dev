import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/messaging";

export function init() {
  console.log("firestore init start");
  // Initialize Cloud Firestore through Firebase
  const firestore = firebase.firestore();
  const settings = { /* your settings... */ timestampsInSnapshots: true };
  firestore.settings(settings);
  document.getElementById("create").addEventListener(
    "click",
    function() {
      handleCreate(firestore);
    },
    false
  );
  document.getElementById("read").addEventListener(
    "click",
    function() {
      handleRead(firestore);
    },
    false
  );

  console.log("firestore init done");
}

export function setMessageToken(currentToken) {
  console.log("setMessageToken start");
  const firestore = firebase.firestore();
  const settings = { /* your settings... */ timestampsInSnapshots: true };
  firestore.settings(settings);

  firestore
    .collection("message-tokens")
    .doc(firebase.auth().currentUser.uid)
    .set({
      author_id: firebase.auth().currentUser.uid, // for Security Rule
      message_token: currentToken
    })
    .then(function(docRef) {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

  console.log("setMessageToken done");
}

function handleCreate(firestore) {
  const first = document.getElementById("first").value;
  const last = document.getElementById("last").value;

  firestore
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .set({
      author_id: firebase.auth().currentUser.uid, // for Security Rule
      first: first,
      last: last
    })
    .then(function(docRef) {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

function handleRead(firestore) {
  const docRef = firestore
    .collection("users")
    .doc(firebase.auth().currentUser.uid);

  //const docRef = firestore.collection("users").doc("name");
  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const readData = document.getElementById("read-data");
        readData.textContent = JSON.stringify(doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}
