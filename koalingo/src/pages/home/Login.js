import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import stylesLogin from "./login.module.css";
import { signInWithEmailAndPassword, signInWithGoogle, signInAnon } from "../../firebase";
import { useAuthState} from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import "../../components/button/Button";
import Button from "../../components/button/Button";

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
  
  const onLoginWithGoogleClick = useCallback(async () => {
      // TODO: Add method to log user in. Once they are logged in, navigate to home page.
    await signInWithGoogle()


    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const onLoginWithEmailClick = useCallback(async () => {
    navigate("/login");
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
    <div className={stylesLogin.loginPage}>
      <div className={stylesLogin.headerWrapper}>
        <Button btnText='Accessibility'
                btnStyle='red' length='btnShort'/>
      </div>

      <img className={stylesLogin.koalingoLogo} alt='' src='../koalingo_logo.svg' />

      <div className={stylesLogin.buttonWrapper}>
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
