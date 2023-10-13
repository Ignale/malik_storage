import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database'
import { getFirestore, collection } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsB94y00uBwAgbpou872soYVjqjFNy7-Y",
  authDomain: "malik-storage.firebaseapp.com",
  databaseURL: "https://malik-storage-default-rtdb.firebaseio.com",
  projectId: "malik-storage",
  storageBucket: "malik-storage.appspot.com",
  messagingSenderId: "541812615305",
  appId: "1:541812615305:web:23590278bade1cf15fbe58",
  measurementId: "G-28264MT1TS"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const rtdb = getDatabase(app)
const users = getAuth()

export { db, users, rtdb, ref }