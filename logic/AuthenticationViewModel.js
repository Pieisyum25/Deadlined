import { loginUser, logoutUser, registerUser } from "../api/firebase";

// Authentication ViewModel, for allowing the UI to indirectly interact with the Firebase authentication api:


// Registers the user using the given email and password:
export function register(email, password) {
    registerUser(email, password);
}

// Logs the user in using the given email and password:
export function login(email, password) {
    loginUser(email, password);
}

// Logs the current user out:
export function logout(navigationCallback) {
    logoutUser(navigationCallback);
}