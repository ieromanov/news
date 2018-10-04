import firebase from "firebase";

let config = {
  apiKey: "AIzaSyAPqxLILZcFCTLRyIOYpQinWqa6g1daWmg",
  authDomain: "auth-project-a886b.firebaseapp.com",
  databaseURL: "https://auth-project-a886b.firebaseio.com",
  projectId: "auth-project-a886b",
  storageBucket: "auth-project-a886b.appspot.com",
  messagingSenderId: "984183015645"
};

firebase.initializeApp(config)
firebase.auth().useDeviceLanguage()
