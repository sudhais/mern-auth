// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-c9629.firebaseapp.com",
  projectId: "mern-auth-c9629",
  storageBucket: "mern-auth-c9629.appspot.com",
  messagingSenderId: "1032961215002",
  appId: "1:1032961215002:web:6fa7414934c8a5300d1fa3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);