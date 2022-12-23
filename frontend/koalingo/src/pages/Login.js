// TODO: Fix formatting of the render on this page - its broken rn 
// TODO: Fix the login with gmail button 
//TODO: Fix the continue as guest button

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
// Firebase Modules
import { getFirestore, collection} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, signInAnonymously } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { initializeApp } from "firebase/app";

//TODO: move this to a config file

const firebaseConfig = {
  apiKey: "AIzaSyAqk2JRGZyX4SnnanRYLYlN8839G_9w2go",
  authDomain: "koalingo-dc436.firebaseapp.com",
  databaseURL: "https://koalingo-dc436-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "koalingo-dc436",
  storageBucket: "koalingo-dc436.appspot.com",
  messagingSenderId: "314932299156",
  appId: "1:314932299156:web:662588909cd9ea9183fb81",
  measurementId: "G-TJNS5SZJWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const Login = () => {

  const navigate = useNavigate();
  const auth = getAuth(app);
  const [user] = useAuthState(auth);
  const firestore = getFirestore(app);


  const onContinueAsGuestClick = useCallback(() => {
    SignInAnon();
    // navigate to home page after sign in if it was successful (user is not null)
    if (user) navigate("/home");
    // navigate to login page if sign in was unsuccessful (user is null)
    if (!user) navigate("/");

  }, [navigate]);


  const onLogonGmailClick = useCallback(() => {
    SignInGmail();
    // navigate to home page after sign in if it was successful (user is not null)
    if (user) navigate("/home");
    // navigate to login page if sign in was unsuccessful (user is null)
    if (!user) navigate("/");
    
  }, [navigate]);

  

  function SignInGmail() {

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    }
  }

  function SignInAnon() {
    const signInAnonymously = () => {
      const provider = new GoogleAuthProvider();
      signInAnonymously(auth, provider);
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.rectangleDiv} />
      <button
        className={styles.continueAsGuest}
        onClick={onContinueAsGuestClick}
      >
        Continue as guest
      </button>
      <div className={styles.login}>
        <button className={styles.rectangleButton} />
        <button className={styles.rectangleButton1} />
        <div className={styles.login1}>Login</div>
        <div className={styles.register}>Register</div>
      </div>
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../allergies-plan-de-travail-1-1@2x.png"
      />
    </div>
  );
};

export default Login;
