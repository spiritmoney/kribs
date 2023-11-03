// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC32GZoz5fSNAo-mYwh74y6SXWnmQCDfZY",
  authDomain: "kribsuite.firebaseapp.com",
  projectId: "kribsuite",
  storageBucket: "kribsuite.appspot.com",
  messagingSenderId: "238104439167",
  appId: "1:238104439167:web:fdaa57b5e71942809f524a",
  measurementId: "G-JXC0G37P4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()
export const storage = getStorage()