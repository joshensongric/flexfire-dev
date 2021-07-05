import * as _firebase from "./_firebase";
import * as _auth from "./_auth";
import * as _firestore from "./_firestore";
import * as _storage from "./_storage";
import * as _messaging from "./_messaging";

function init() {
  _firebase.init();
  _auth.init();
  _messaging.init();
  _storage.init();
  _firestore.init();
}

document.addEventListener("load", init(), false);
