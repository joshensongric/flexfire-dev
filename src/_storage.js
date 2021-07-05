import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-storage";
//import { setMessageToken } from "./_firestore";

export function init() {
  console.log("storage init start");
  document
    .getElementById("upload")
    .addEventListener("click", handleUpload, false);
  console.log("storage init done");
}

function handleUpload() {
  const file = document.getElementById("file").files[0];
  console.log(file);

  const user = firebase.auth().currentUser.uid;
  console.log(user);
  if (user) {
    // Set MessageToken To Firebase
    //setMessageToken(user);
    const storageRef = firebase
      .storage()
      .ref()
      .child("users")
      .child(user)
      .child(file.name);

    // Upload file
    const uploadTask = storageRef.put(file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
        document.getElementById("progress").textContent = progress + "% done";

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function(error) {
        console.log(error);
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
        });
      }
    );
  }
}
