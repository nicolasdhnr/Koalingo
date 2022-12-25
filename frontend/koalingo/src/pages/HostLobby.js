import React, { useEffect, useState, useCallback }  from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hostlobby.module.css";
import {realtimedb } from "../firebase";
import { ref, onValue, get, child, set, push, update, remove } from "firebase/database";
import { getAuth, onAuthStateChanged, signInWithCustomToken, auth } from "firebase/auth";
import Cookies from "universal-cookie";



const HostLobby = () => {

  const navigate = useNavigate();
  
  // Look for a cookie that contains the game pin
  // If it exists, use it
  // If it doesn't, create a new game pin - fucking hell finaly got it to work woo

  const cookies = new Cookies();
  const gamePin = cookies.get("gamePin");
  if (gamePin === undefined) {
    const gamePin = Math.floor(Math.random() * 1000000); // Random 6 digit number
    cookies.set("gamePin", gamePin, { path: "/" });
  }

  // Check if game pin exists in the database
  // If it does, do nothing
  // If it doesn't, create a new game
  const reference = ref(realtimedb, "games");
  onValue(reference, (snapshot) => {
    const data = snapshot.val();
    if (data[gamePin] === undefined) {
      console.log("Game pin does not exist");
      createGame();
    } else {
      console.log("Game pin exists");
    }
  });

  console.log("Game pin: " + gamePin);

  // Create a new game in the realtime db
  function createGame() {
  const reference = ref(realtimedb, "games");
  set(reference, {
    [gamePin]: {
      players: {"dummy": "dummy"},
      timer: 0,
      questions: 0,
    },
  });
}

  // Set up realtime db features
  const [count, setCount] = useState(0);
  // Subscribe to changes in the numpber of players in the game 
  useEffect(() => {
    const collectionRef = ref(realtimedb, "games/" + gamePin + "/players");
    onValue(collectionRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      // Count the number of players in the game
      const count = Object.keys(data).length;
      setCount(count);
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
      <b className={styles.game123456}>Game #{gamePin}</b>
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
