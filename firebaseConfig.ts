import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtr1DtZKUdRqUlwOgPS-tgi-GGriiecjI",
  authDomain: "pet-adopt-app-407f5.firebaseapp.com",
  projectId: "pet-adopt-app-407f5",
  storageBucket: "pet-adopt-app-407f5.appspot.com",
  messagingSenderId: "985220735190",
  appId: "1:985220735190:web:733c4c3ec61c84bdfa2977",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
