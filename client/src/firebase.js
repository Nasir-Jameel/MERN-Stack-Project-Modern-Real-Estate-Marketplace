// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b96a3.firebaseapp.com",
  projectId: "mern-estate-b96a3",
  storageBucket: "mern-estate-b96a3.firebasestorage.app",
  messagingSenderId: "53237272347",
  appId: "1:53237272347:web:339b0c6de9b41d200a4dbe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);