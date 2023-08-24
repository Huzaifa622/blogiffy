
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import  { getDatabase } from 'firebase/database'
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-t8-fDUFr6_UloobpSvuu6hiOQceLNIM",
    authDomain: "blogging-feb44.firebaseapp.com",
    projectId: "blogging-feb44",
    storageBucket: "blogging-feb44.appspot.com",
    messagingSenderId: "661445223668",
    appId: "1:661445223668:web:594bb0b52b45825a096aa1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();