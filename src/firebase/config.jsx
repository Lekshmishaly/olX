// Import the necessary functions from the modular Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC98bnTbVl2pA1WxJTGYvCSuvEhNDpcpSE",
  authDomain: "olxreact-f6622.firebaseapp.com",
  projectId: "olxreact-f6622",
  storageBucket: "olxreact-f6622.appspot.com",
  messagingSenderId: "858993004752",
  appId: "1:858993004752:web:59041aa3062a73ca1fced5",
  measurementId: "G-J16582C4X0",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

const auth = getAuth(app);
const Storage = getStorage(app);

export { db, auth, Storage };
