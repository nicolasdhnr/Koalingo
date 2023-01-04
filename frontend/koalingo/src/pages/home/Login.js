import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { signInWithEmailAndPassword, signInWithGoogle, signInAnon } from "../../firebase";
import { useAuthState} from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (loading){
      
      return
    }
    // If the user has signed in naviagte to home page
    if(user) navigate("/home")
  })
  
  const onLoginButtonClick = useCallback(async () => {
      // TODO: Add method to log user in. Once they are logged in, navigate to home page.
    await signInWithGoogle()


    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  // TODO: make sure users cant get to home without login

  const onRegisterButton1Click = useCallback(() => {
   navigate("/register");
  }, [navigate]);

  const [nickname, setNickName] = useState('');
  const onChangeNickname = ({target}) => {
    const {name, value} = target
    setNickName(prev => value);
    console.log(nickname);
  }
  return (
    <div className={styles.loginPage}>

      <img
        className={styles.koalingoLogo}
        alt=""
        src="../koalingo_logo.svg"
      />

      <div className={styles.loginContainer}>
        <button
          className={styles.loginChild}
          onClick={signInWithGoogle}
        >
          Login
        </button>
        <button
          className={styles.loginRegister}
          onClick={onRegisterButton1Click}
        >
          Register
        </button>
        <button
        className={styles.continueAsGuest}
        onClick={signInAnon}
        >
        Continue as guest
        </button>
      </div>
  </div>
  );
};

export default Login;

