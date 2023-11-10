import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDIEfKKnpQvKrHuOoiIzip9b13mUjNRH4E",
    authDomain: "iproject-7f215.firebaseapp.com",
    projectId: "iproject-7f215",
    storageBucket: "iproject-7f215.appspot.com",
    messagingSenderId: "856244457860",
    appId: "1:856244457860:web:42557f9ddfaaa163f6cdd1",
    measurementId: "G-00H33TT2WP"
};

const app = initializeApp(firebaseConfig);
let signupBtn=document.getElementById('signupBtn')
let signinBtn=document.getElementById('signinBtn')
let nameField=document.getElementById('nameField')
let title=document.getElementById('title')

//initialize firebase authentication
const auth = getAuth(app);



signinBtn.onclick=function(){
    nameField.style.maxHeight="0"
    title.innerHTML="Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

signupBtn.onclick=function(){
    nameField.style.maxHeight="60px"
    title.innerHTML="Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}


  // Sign Up
signupBtn.addEventListener('click', () => {
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
console.log(email,password,"snd")

createUserWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('User registered:', user);
    })
    .catch((error) => {
        console.error('Error signing up:', error.message);
    });
});

//Sign in

signinBtn.addEventListener('click', () => {
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in:', user);
        window.location.href = 'dashboard.html'; 
    })
    .catch((error) => {
        console.error('Error signing in:', error.message);
    });
});