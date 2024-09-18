// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBkiK0yBrTcH0KfOODlHyGOEowDml3bCqM",
    authDomain: "fortune-bc6ac.firebaseapp.com",
    projectId: "fortune-bc6ac",
    storageBucket: "fortune-bc6ac.appspot.com",
    messagingSenderId: "850384527267",
    appId: "1:850384527267:web:aae57222a5da3e33c80416",
    measurementId: "G-GBF42MEZG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Check if the app is loaded
// console.log(app)

// Initialize Firestore and make it global
const db = getFirestore(app); 
// window.db = getFirestore(app); 
// console.log(window.db)

export { db }
