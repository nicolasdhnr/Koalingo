import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { signInWithEmailAndPassword, signInWithGoogle, signInAnon } from "../firebase";
import { useAuthState} from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";


const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const onContinueAsGuestClick = useCallback(() => {
    signInAnon()
    if (user) {
      navigate("/home");
    }
    else {
      console.log("Authentication Error");
    }
  }, [navigate]);

  const onLoginButtonClick = useCallback(async () => {
      // TODO: Add method to log user in. Once they are logged in, navigate to home page.
    
    await signInWithGoogle()
    
    if (user) {
      navigate("/home");
    }
  }, [navigate]);


  // TODO: make sure users cant get to home without login

  const onRegisterButton1Click = useCallback(() => {
    //TODO: navigate to registration page
  }, [navigate]);

  return (
    <div className={styles.web192013}>
      <div className={styles.web192013Child} />
      <button
        className={styles.continueAsGuest}
        onClick={onContinueAsGuestClick}
      >
        Continue as guest
      </button>
      <div className={styles.login}>
        <button
          className={styles.loginChild}
          onClick={onLoginButtonClick}
        />
        <button
          className={styles.loginItem}
          onClick={onRegisterButton1Click}
        />
        <div className={styles.login1}>Login</div>
        <div className={styles.register}>Register</div>
      </div>
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../koalingo-logo.png"
      />
    </div>
  );
};


export default Login;

