import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getDatabase } from "firebase/database";

import { useNavigate } from "react-router-dom";


const firebaseConfig = {
    apiKey: "AIzaSyAqk2JRGZyX4SnnanRYLYlN8839G_9w2go",
    authDomain: "koalingo-dc436.firebaseapp.com",
    databaseURL: "https://koalingo-dc436-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "koalingo-dc436",
    storageBucket: "koalingo-dc436.appspot.com",
    messagingSenderId: "314932299156",
    appId: "1:314932299156:web:70fd245e72e91e6983fb81",
    measurementId: "G-Y7ZP85BTB0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const realtimedb = getDatabase(app);
const hostID  = Math.floor(Math.random() * 1000000)
// TODO: Save game ID in a cookie 


const signInAnon = async () => {
    try {
        await signInAnonymously(auth);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    // Check if the user has signed in before
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    // If they haven't, add them to the database
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "google",
        email: user.email,
        hostID: hostID,
      });
    }
    return user;

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
      words: [],
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};


export {
  auth,
  db,
  realtimedb,
  hostID,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  signInAnon,
};