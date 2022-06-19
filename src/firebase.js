// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {} from '@firebase/firestore';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA84MNVdAoXlVU1eHTqkz_HStw6pOGPlIc",
  authDomain: "chello-31ee4.firebaseapp.com",
  projectId: "chello-31ee4",
  storageBucket: "chello-31ee4.appspot.com",
  messagingSenderId: "347877435439",
  appId: "1:347877435439:web:235d1cd3c399d1ca7cfeda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app)