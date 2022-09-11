import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAZoDJzIqQTAVCjMfgdHIwuWquAYNIm6QA",
  authDomain: "deadlined-c1fe0.firebaseapp.com",
  projectId: "deadlined-c1fe0",
  storageBucket: "deadlined-c1fe0.appspot.com",
  messagingSenderId: "768033377466",
  appId: "1:768033377466:web:377dec0a4dcea32229c683",
  measurementId: "G-XWSZYQBD3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);