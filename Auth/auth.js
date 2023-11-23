// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';


const firebaseConfig = {
  apiKey: "AIzaSyDIEfKKnpQvKrHuOoiIzip9b13mUjNRH4E",
  authDomain: "iproject-7f215.firebaseapp.com",
  databaseURL: "https://iproject-7f215-default-rtdb.firebaseio.com",
  projectId: "iproject-7f215",
  storageBucket: "iproject-7f215.appspot.com",
  messagingSenderId: "856244457860",
  appId: "1:856244457860:web:42557f9ddfaaa163f6cdd1",
  measurementId: "G-00H33TT2WP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
