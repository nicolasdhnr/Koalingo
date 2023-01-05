import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./settimer.module.css";
import { useState, useEffect } from 'react';


const SetTimer = () => {
  const navigate = useNavigate();

  const onLoginClick = useCallback(() => {
    navigate("/host/lobby");
  }, [navigate]);

  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const [time, setTime] = useState(300000);

  useEffect(() => {
    const interval = setInterval(() => setTime(time => time - 1000), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className={styles.web192015}>

      <div className={styles.web192015Child} />
      
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../allergies-plan-de-travail-1-11@2x.png"
      />
      <div className={styles.wrapper}>
        <b className={styles.b}>{Math.floor((time / MINUTE) % 60)} </b>
      </div>
      <div className={styles.container}>
        <b className={styles.b}>{Math.floor((time / SECOND) % 60)}</b>
      </div>
      <b className={styles.minutes}>Minutes</b>
      <b className={styles.seconds}>Seconds</b>
      <button className={styles.login} onClick={onLoginClick}>
        <div className={styles.progressTracking}>Progress Tracking</div>
      </button>
    </div>
  );
};

export default SetTimer;
