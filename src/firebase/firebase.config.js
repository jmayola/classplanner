// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCtEc2vYRVEhrRo5LSF0olo0cLaww6eDlo",

  authDomain: "proyecto-sport-shot.firebaseapp.com",

  projectId: "proyecto-sport-shot",

  storageBucket: "proyecto-sport-shot.appspot.com",

  messagingSenderId: "543923576314",

  appId: "1:543923576314:web:986fc56d634ad1c1119843",

  measurementId: "G-ZQYFRVCRT3"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)