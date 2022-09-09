import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import store from "../store";
import { initTasks } from "../tasksSlice";


let docRef = "";

export function initDatabase() {
    docRef = doc(db, "users", auth.currentUser?.email);
    console.log("Checking for user data...");
    getDoc(docRef)
    .then(docSnap => {
        if (docSnap.exists()) {
            console.log("Document retrieved.");
            store.dispatch(initTasks({ tasks: docSnap.data().tasks }));
        }
        else {
            console.log("Document does not exist.");
            createDatabase();
        }
    })
    .catch(error => alert(error.message));
}

function createDatabase() {
    setDoc(docRef, { tasks: store.getState().tasks })
    .then(() => {
        console.log("Document created.");
    })
    .catch(error => alert(error.message));
}

export function updateDatabase() {
    setDoc(docRef, { tasks: store.getState().tasks })
    .then(() => {
        console.log("Document updated.");
    })
    .catch(error => alert(error.message));
}