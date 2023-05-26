// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvgS16Khuaju3ByUbdSFwCd2Gw6WJW0Dk",
  authDomain: "netflix-fe40d.firebaseapp.com",
  projectId: "netflix-fe40d",
  storageBucket: "netflix-fe40d.appspot.com",
  messagingSenderId: "921187506980",
  appId: "1:921187506980:web:2915e14337a9b7b5fdf1b1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()