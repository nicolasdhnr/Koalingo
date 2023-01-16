import React, { useCallback, useEffect, useContext,useState } from 'react'
import styles from './state-result.module.css';
import { useNavigate } from 'react-router-dom';
import {realtimedb } from "../../firebase";
import { ref, update, remove, onDisconnect, onValue } from "firebase/database";
import { AuthContext } from '../../App';


const StateResult = () => {
  const {gamePin, user} = useContext(AuthContext);
  const navigate = useNavigate();
  const unsubscribe = onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    //console.log(Object.values(data));
    //var results = Object.values(data)
    //console.log((Object.values(data)[2]["host"].Quizz["1"]));
    if (data != null) {
      console.log(data.round)
    
     
      if(data.quizzState=="game"){
        navigate("/player/quizz");
      }
      
    
      
    }

    return unsubscribe;
    
  });
return (
  <div className={styles.stateResult}>
    <div className={styles.background_correct} />
    <img
      className={styles.allergiesPlanDeTravail11}
      alt=""
      src="../koalingo_logo.svg"
    />
    <b className={styles.game123456}>Game #123-456</b>
    <div className={styles.stateResultItem}>
    <p className={styles.message}>
      Congratulations, you got this one correct!
    </p>
    </div>
    
    <div className={styles.xp}>+ 250 XP for the team</div>
  </div>
);
};


export default StateResult;

