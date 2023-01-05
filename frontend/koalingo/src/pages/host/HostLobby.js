import React, { useEffect, useState, useCallback, useContext}  from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hostlobby.module.css";
import {realtimedb } from "../../firebase";
import { ref, onValue, set, onDisconnect } from "firebase/database";
import { AuthContext } from "../../App";
import {createGamePin, updateGameState} from  "./host_logic";
import Players from "../../components/Players.js"

const HostLobby = () => {

  const navigate = useNavigate();
  const {user, gamePin, setGamePin}= useContext(AuthContext)
  console.log(gamePin);
  const [count, setCount] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);
  
  


  // Create a game pin and create the game in the database.
  useEffect( () => {
    const createPin = async (user) => {
      const pin = await createGamePin(user);
      if (pin) {
        setGamePin(pin);
      }
    }
 createPin(user);

  const collectionRef = ref(realtimedb, "games/" + gamePin + "/players");
  
  return onValue(collectionRef, (snapshot) => {
    const data = snapshot.val();

    // Count the number of players in the game
    if (data != null) {
      setCount(Object.keys(data).length);
      // console.log(count);
      // Get the names of the players in the game
      setPlayerNames(Object.keys(data).map((key) => data[key].name));
    }
  });
  // Dynamically change the number of players in the game
  }, [gamePin, setGamePin, setCount, setPlayerNames]);


    // Navigating to the timer page to change the game settings
  const onTimerButtonClick = useCallback(() => {
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
        src="../koalingo-logo.svg"
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
      <div>
        <Players players={playerNames}/>
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
