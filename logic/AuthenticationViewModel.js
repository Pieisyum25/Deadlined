import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { initDatabase } from "./DatabaseViewModel";


export function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Registered: " + user.email);
    })
    .catch(error => alert(error.message))
}

export function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Logged in: " + user.email);
    })
    .catch(error => alert(error.message))
}

export function logout(navigationCallback) {
    const email = auth.currentUser?.email;
    auth
        .signOut()
        .then(() => {
            console.log("Logged out: " + email);
            navigationCallback();
        })
        .catch(error => alert(error.message));
}