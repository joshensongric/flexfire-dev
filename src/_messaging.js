import firebase from "firebase/app";
import "firebase/messaging";
import { setMessageToken } from "./_firestore";

export function init() {
  console.log("messaging init start");
  // Retrieve Firebase Messaging object.
  const messaging = firebase.messaging();
  // Add the public key generated from the console here.
  messaging.usePublicVapidKey(
    "BNcqoMjq7fKXV6ajRwpWYhqBP_avBwEJ_UkbnY9mDMVtPm_kPyLVwBnb0uBMtHfzlkWC_u8x35RSusaRks0-8pk"
  );

  messaging
    .requestPermission()
    .then(function() {
      console.log("Notification permission granted.");
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
      // FIXME: can`t get token
      messaging
        .getToken()
        .then(function(currentToken) {
          console.log("currentToken: ", currentToken);
          setMessageToken(currentToken);
        })
        .catch(function(err) {
          console.log(
            "No Instance ID token available. Request permission to generate one."
          );
        });
    })
    .catch(function(err) {
      console.log("Unable to get permission to notify.", err);
    });

  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.setBackgroundMessageHandler` handler.
  messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    document.getElementById("recieve-message").textContent = JSON.stringify(
      payload
    );
    // Customize notification here
    //var notificationTitle = "Foreground Message Title";
    //var notificationOptions = {
    // body: "Foreground Message body.",
    //  icon: "/firebase-logo.png"
    //};
    //    return self.registration.showNotification(
    //      notificationTitle,
    //      notificationOptions
    //    );
  });

  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(function() {
    messaging
      .getToken()
      .then(function(refreshedToken) {
        console.log("Token refreshed.");
        //// Indicate that the new Instance ID token has not yet been sent to the
        //// app server.
        //setTokenSentToServer(false);
        //// Send Instance ID token to app server.
        //sendTokenToServer(refreshedToken);
        // ...
        setMessageToken(refreshedToken);
      })
      .catch(function(err) {
        console.log("Unable to retrieve refreshed token ", err);
        //showToken("Unable to retrieve refreshed token ", err);
      });
  });

  console.log("messaging init done");
}
