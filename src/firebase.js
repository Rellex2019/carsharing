// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwveZtpd7flDbxakIVzN1M8lv0qPVptzM",
  authDomain: "carsharing-17bfc.firebaseapp.com",
  projectId: "carsharing-17bfc",
  storageBucket: "carsharing-17bfc.appspot.com",
  messagingSenderId: "1021011955214",
  appId: "1:1021011955214:web:33f4c2d75b7f62b251f65f"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
//Мое 
export {db, storage}