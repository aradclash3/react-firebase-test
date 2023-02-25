import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAwwvqniUysa-2h84dINgok0njtc_HsVcw",
    authDomain: "fir-testing-8abd7.firebaseapp.com",
    projectId: "fir-testing-8abd7",
    storageBucket: "fir-testing-8abd7.appspot.com",
    messagingSenderId: "418956042522",
    appId: "1:418956042522:web:6d1f996fb0d12078ee0ca3",
    measurementId: "G-K7R0935NHB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)