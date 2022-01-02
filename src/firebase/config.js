import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDa_8XS7Suq3BNCY6NE-FQLUnCVVgqo42g",
    authDomain: "cooking-ninja-beta.firebaseapp.com",
    projectId: "cooking-ninja-beta",
    storageBucket: "cooking-ninja-beta.appspot.com",
    messagingSenderId: "574930224609",
    appId: "1:574930224609:web:59e45e00d053de69a6bea0"
  };

//Initialize Firebase

firebase.initializeApp(firebaseConfig);

//Initialize Firestore service

const db = firebase.firestore();

export { db }