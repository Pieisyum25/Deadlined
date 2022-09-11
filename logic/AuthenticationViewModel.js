import { loginUser, logoutUser, registerUser } from "../api/firebase";


export function register(email, password) {
    registerUser(email, password);
}

export function login(email, password) {
    loginUser(email, password);
}

export function logout(navigationCallback) {
    logoutUser(navigationCallback);
}