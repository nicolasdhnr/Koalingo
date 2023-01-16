import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import stylesLogin from "./login.module.css";
import { signInWithEmailAndPassword, signInWithGoogle, signInAnon } from "../../firebase";
import { useAuthState} from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import "../../components/button/Button";
import Button from "../../components/button/Button";

/**
 * Controls the login page and the login process
 * @returns {JSX.Element} Login page
 */
const Login = () => {

  // Get current authorisation and user
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (loading){
      return
    }
    // If the user has signed in naviagte to home page
    if(user) navigate("/home")
  })
  
  // Set up onClick event listeners for the login buttons
  const onLoginWithGoogleClick = useCallback(async () => {
    await signInWithGoogle();
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const onLoginWithEmailClick = useCallback(async () => {
    navigate("/login");
  }, [navigate]);

  const onRegisterButton1Click = useCallback(() => {
   navigate("/register");
  }, [navigate]);

  return (
    <div className={stylesLogin.loginPage}>  {/* Global styles */}

      <img className={stylesLogin.koalingoLogo} alt='' src='../koalingo_logo.svg' />

      <div className={stylesLogin.buttonWrapper}>  {/* Button styles */}
        <Button btnText='Email login' onClick={onLoginWithEmailClick} 
                btnStyle='white'/>
        <Button btnText='Google login' onClick={onLoginWithGoogleClick}
                btnStyle='white'/>
        <Button btnText='Register' onClick={onRegisterButton1Click}
                btnStyle='bgColor'/>
                <p></p>
        <Button btnText='Continue as guest' onClick={signInAnon}
                btnStyle='gold' length='btnLong' />
      </div>
  </div>
  )
};

export default Login;

