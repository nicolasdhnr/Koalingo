import React, { useEffect, useState, useCallback }  from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hostlobby.module.css";
import {realtimedb } from "../firebase";
import { ref, onValue, get, child, set, push, update, remove } from "firebase/database";

const HostLobby = () => {
  const navigate = useNavigate();

  // Set up realtime db features
  const [count, setCount] = useState(0);

  // Count the number of players in the game
useEffect(() => {
  const collectionRef = ref(realtimedb, "games/000000/players");
  onValue(collectionRef, (snapshot) => {
    const data = snapshot.val();
    setCount(data);
  });
}, []);







  // log the number of players in the game
  console.log(count);






    // Navigating to the timer page to change the game settings
  const onTimerButtonClick = useCallback(() => {
    navigate("/set/timer");
  }, [navigate]);

  const onStartTheGame1Click = useCallback(() => {
    navigate("/host/progress-tracker");
  }, [navigate]);

  return (
    <div className={styles.web19204}>
      <div className={styles.web19204Child} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../allergies-plan-de-travail-1-14@2x.png"
      />
      <b className={styles.game123456}>Game #123-456</b>
      <div className={styles.startTheGame} onClick={onStartTheGame1Click}>
        <button
          className={styles.startTheGameChild}
          onClick={onTimerButtonClick}
        />
        <img className={styles.startTheGameItem} alt="" src="../group-34.svg" />
        <b className={styles.startTheGame1}>Start the game</b>
        <b className={styles.setTimer}>Set timer</b>
      </div>
     
      <div className={styles.playersReadyToKoalearn}>
        {count} players ready to Koalearn
      </div>
      <div className={styles.wrapper}>
        <b className={styles.b}>05</b>
      </div>
      <div className={styles.parent}>
        <b className={styles.b1}>00</b>
        <b className={styles.b2}>:</b>
      </div>
    </div>
  );
};

export default HostLobby;
