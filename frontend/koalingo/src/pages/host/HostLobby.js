import React, { useEffect, useState, useCallback, useContext}  from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hostlobby.module.css";
import {realtimedb } from "../../firebase";
import { ref, onValue, set } from "firebase/database";
import { AuthContext } from "../../App";
import {createGamePin} from  "./host_logic";
import Players from "../../components/Players.js"
const HostLobby = () => {

  const navigate = useNavigate();
  const {gamePin, setGamePin}= useContext(AuthContext)
  console.log(gamePin);

  useEffect(() => {
  setGamePin(createGamePin());
  // Dynamically change the number of players in the game
  }, []);


  const [count, setCount] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);
  
  // Subscribe to changes in the number of players in the game 
  useEffect(() => {
    const collectionRef = ref(realtimedb, "games/" + gamePin + "/players");
    const unsubscribe = onValue(collectionRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      // Count the number of players in the game

      const count = Object.keys(data).length;

      // Get the player names 
      const names = Object.keys(data).map((key) => data[key].name);
      console.log(names);
      setPlayerNames(names);
      setCount(count);
    })
    return () => {
      unsubscribe();
    }
  }, []);



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
      <Players players={playerNames}/>
      <div>
        
      </div>
    </div>
  );
};

export default HostLobby;
