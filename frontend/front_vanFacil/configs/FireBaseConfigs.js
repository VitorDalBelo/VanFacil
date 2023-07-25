// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNZeQ4mCX0mt89YDZCusKjK_avSD_4d58",
  authDomain: "vanfacil-ea179.firebaseapp.com",
  projectId: "vanfacil-ea179",
  storageBucket: "vanfacil-ea179.appspot.com",
  messagingSenderId: "501993187385",
  appId: "1:501993187385:web:051dbebbafb0bcc7c0c5e8",
  measurementId: "G-YH5J7RKDTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =  getFirestore(app);
// const analytics = getAnalytics(app);



export default app;

