import styles from "./waiting.module.css";
import React, { useCallback, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import {TypeAnimation} from 'react-type-animation'
import koala from './koala.gif';
import { ref, update, remove, onDisconnect, onValue } from "firebase/database";
import { AuthContext } from '../../App';
import { realtimedb } from "../../firebase";

const Waiting = () => {
  const navigate = useNavigate();
  const {gamePin, user} = useContext(AuthContext);

  const steps = [
    'Waiting', 1000,
    'For', 1000,
    'Your teacher 👌', 1000
  ];

  // onDisconnect(ref(realtimedb, `games/${gamePin}/players/${user.uid}`)).set({});
  
  useEffect( () => {  
    // Add user ID to the list of players in the game while keepig previouslist intact
    update(ref(realtimedb, "games/" + gamePin + "/players"), {
      [user.uid]: {name: "Nicolas",
      reported:0,
    }
    }), [];

    const unsubscribe = onValue(ref(realtimedb, `games/${gamePin}/gameState`), (snapshot) => {
      const data = snapshot.val();
      console.log(gamePin);
      console.log(data);
      if (data != null) {
        if (data === "memorizing") {
          navigate("/player/memorizing");
        }
      }

      return unsubscribe;
      
    });
  }, []);



  const onClickNavigate = () => {
    navigate("/player/memorizing");
   };
  
    return (
      <div className={styles.page}>
      <div onClick={onClickNavigate} className={styles.rectangleParent}>
      <img className={styles.gif} src={koala} alt="" />
      <div>
       <TypeAnimation wrapper="div" sequence={steps} repeat={Infinity} cursor={true} className={'caca'} />
       </div>
      </div>
      <button className={styles.button} onClick={onClickNavigate}>Dev: To next page</button>
      </div>
    );
  };

  export default Waiting;
