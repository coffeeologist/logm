import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRjpN41ZjeXEQJyv5YumA6UwkrI9TFz24",
  authDomain: "logm-project.firebaseapp.com",
  projectId: "logm-project",
  storageBucket: "logm-project.appspot.com",
  messagingSenderId: "195568523156",
  appId: "1:195568523156:web:5a49c88cd19c936559a181",
  measurementId: "G-VCKNFB15J3"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google Sign in
const provider1 = new firebase.auth.GoogleAuthProvider();
provider1.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider1);

// Github Sign in
const provider2 = new firebase.auth.GithubAuthProvider();
provider2.setCustomParameters({ prompt: 'select_account' });
export const signInWithGithub = () => auth.signInWithPopup(provider2)


export default firebase;