import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0RshJY0nQIQkhvxa1-TB5jYTXv7yLsYk",
  authDomain: "giorno-tracker.firebaseapp.com",
  projectId: "giorno-tracker",
  storageBucket: "giorno-tracker.firebasestorage.app",
  messagingSenderId: "568137950686",
  appId: "1:568137950686:web:5aa50b1f01e1735376294f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);