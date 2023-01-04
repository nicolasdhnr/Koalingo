import styles from "./waiting.module.css";
import React, { useCallback, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import {TypeAnimation} from 'react-type-animation'
import koala from './koala.gif';
import { ref, update, remove, onDisconnect } from "firebase/database";
import { AuthContext } from '../../App';
import { realtimedb } from "../../firebase";

const Waiting = () => {
  const {gamePin, user} = useContext(AuthContext);
  console.log(gamePin)
  const steps = [
    'Waiting', 1000,
    'For', 1000,
    'Your teacher 👌', 1000
  ];
  onDisconnect(ref(realtimedb, `games/${gamePin}/players/${user.uid}`)).set({});
  useEffect( () => {  
    // Add user ID to the list of players in the game while keepig previouslist intact
    update(ref(realtimedb, "games/" + gamePin + "/players"), {
      [user.uid]: {name: "Nicolas"
    }
    });
  
    return () => {
      // Remove user ID from the list of players in the game
      remove(ref(realtimedb, "games/" + gamePin + "/players/" + user.uid));
    }

  }, []);


  const navigate = useNavigate()

  const onClickNavigate = useCallback(() => {
    navigate("/player/quizz");
   }, [navigate]);
  
    return (
      <div className={styles.page}>
      <div onClick={onClickNavigate} className={styles.rectangleParent}>
      <img className={styles.gif} src={koala} alt="" />
      <div>
       <TypeAnimation wrapper="div" sequence={steps} repeat={Infinity} cursor={true} className={'caca'} />
       </div>
      </div>
      </div>
    );
  };

  export default Waiting;
