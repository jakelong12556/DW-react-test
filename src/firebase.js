// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgw99UUOfup6k7Dddg-6ItcioQ6_DZU-4",
  authDomain: "tech-test-16845.firebaseapp.com",
  projectId: "tech-test-16845",
  storageBucket: "tech-test-16845.appspot.com",
  messagingSenderId: "862547377486",
  appId: "1:862547377486:web:381e721e55aa174f52721f",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();

