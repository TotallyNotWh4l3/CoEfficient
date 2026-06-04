// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCk96JW4IiTPXLkmK-UG_xmd1po49bF9q0",
    authDomain: "co-efficient-87886.firebaseapp.com",
    projectId: "co-efficient-87886",
    storageBucket: "co-efficient-87886.firebasestorage.app",
    messagingSenderId: "53367858524",
    appId: "1:53367858524:web:b312a15881a5df3f128d99",
    measurementId: "G-0NE33YX468",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
