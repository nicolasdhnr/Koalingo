import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const onContinueAsGuestClick = useCallback(() => {
    navigate("/home");
    // TODO/ Add anonymous sign in function here

  }, [navigate]);

  const onLoginButtonClick = useCallback(() => {
      // TODO: Add method to log user in. Once they are logged in, navigate to home page.
    navigate("/home");
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
