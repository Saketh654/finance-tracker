import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcu961I8u1SThZSK5b2i_CKqJH0pCBSE8",
  authDomain: "finance-tracker-48c98.firebaseapp.com",
  projectId: "finance-tracker-48c98",
  storageBucket: "finance-tracker-48c98.firebasestorage.app",
  messagingSenderId: "981555263193",
  appId: "1:981555263193:web:8e58cac643f4e4ceba30c8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const usersCollection = collection(db, "users"); // Users collection
