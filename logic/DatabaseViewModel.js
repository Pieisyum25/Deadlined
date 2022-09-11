import { getUserData, setUserData } from "../api/firebase";

// Database ViewModel, allowing the UI to indirectly interact with the Firebase Firestore database:


// Fetches the user's data from the remote database:
export function initDatabase() {
    getUserData();
}

// Updates the user's data on the remote database:
export function updateDatabase() {
    setUserData();
}