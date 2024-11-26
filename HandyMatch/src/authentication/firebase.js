// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU1ZEEUjgr6daeF3s0h0SF4JuQ5vsXTAo",
  authDomain: "handymatch-9a98c.firebaseapp.com",
  projectId: "handymatch-9a98c",
  storageBucket: "handymatch-9a98c.appspot.com",
  messagingSenderId: "1029959028232",
  appId: "1:1029959028232:web:4002393414a1b687668bbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;