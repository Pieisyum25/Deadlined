import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { initTasks } from "../logic/StateViewModel";
import store from "./store";

// Firebase Model, for handling authentication and the remote database:


// Config for firebase api:
const firebaseConfig = {
  apiKey: "AIzaSyAZoDJzIqQTAVCjMfgdHIwuWquAYNIm6QA",
  authDomain: "deadlined-c1fe0.firebaseapp.com",
  projectId: "deadlined-c1fe0",
  storageBucket: "deadlined-c1fe0.appspot.com",
  messagingSenderId: "768033377466",
  appId: "1:768033377466:web:377dec0a4dcea32229c683",
  measurementId: "G-XWSZYQBD3G"
};

// Initialize firebase authentication and firestore database:
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);


// Creates a new user with the given email and password:
export function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Registered: " + user.email);
    })
    .catch(error => alert(error.message));
}

// Logs in a user using the given email and password:
export function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
  .then(userCredentials => {
      const user = userCredentials.user;
      console.log("Logged in: " + user.email);
  })
  .catch(error => alert(error.message));
}

// Logs out the current user:
export function logoutUser(navigationCallback) {
  const email = auth.currentUser?.email;
  auth
      .signOut()
      .then(() => {
          console.log("Logged out: " + email);
          navigationCallback();
      })
      .catch(error => alert(error.message));
}


let docRef = "";

export function getUserData() {
  if (!docRef) docRef = doc(db, "users", auth.currentUser?.email);
  console.log("Checking for user data...");
  getDoc(docRef)
    .then(docSnap => {
      if (docSnap.exists()) {
        console.log("Document retrieved.");
        store.dispatch(initTasks({ tasks: docSnap.data().tasks }));
      }
      else {
        console.log("Document does not exist.");
        setUserData(true);
      }
    })
    .catch(error => alert(error.message));
}

export function setUserData(created) {
  setDoc(docRef, { tasks: store.getState().tasks })
    .then(() => {
      if (created) console.log("Document created.");
      else console.log("Document updated.");
    })
    .catch(error => alert(error.message));
}