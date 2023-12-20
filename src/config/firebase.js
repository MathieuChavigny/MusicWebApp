// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmruudcSjC7-h5ZnPROgd50-z_T4sQFvM",
  authDomain: "web5synthese-2de65.firebaseapp.com",
  projectId: "web5synthese-2de65",
  storageBucket: "web5synthese-2de65.appspot.com",
  messagingSenderId: "983345919480",
  appId: "1:983345919480:web:ffa5d539fa38d5eb4b120d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();