import { getUserData, setUserData } from "../api/firebase";


export function initDatabase() {
    getUserData();
}

export function updateDatabase() {
    setUserData();
}