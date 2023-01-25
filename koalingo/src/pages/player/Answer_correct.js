import React, { useCallback, useEffect, useContext,useState } from 'react'
import stylesResult from './state-result.module.css';
import stylesEmailLogin from "../home/emailLogin.module.css";
import { useNavigate } from 'react-router-dom';
import {realtimedb } from "../../firebase";
import { ref, update, remove, onDisconnect, onValue } from "firebase/database";
import { AuthContext } from '../../App';
import RecWrapper from '../../components/rectangleWrapper/Wrapper';


const StateResult = () => {
  const {gamePin, user} = useContext(AuthContext);
  const navigate = useNavigate();
  const onNextClick = useCallback(() => {
    navigate("/player/end");
  }, [navigate]);
  
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
      }else if(data.quizzState=="end"){
        navigate("/player/end");
      }
      
    }

    return unsubscribe;
    
  });
return (
  <div className={stylesResult.backgroundCorrect}>
    <img className={stylesEmailLogin.koalingoLogo} alt="" src="../koalingo_logo.svg" />

    <div className={stylesResult.mainWrapper}>
      <RecWrapper length="heightFit"
                  content={
                    <div className={stylesResult.recWrapper}>
                      <div className={stylesResult.textWrapper1}>Congratulations, you are correct!</div>
                      <div className={stylesResult.textWrapper2}>+ 250 XP for the team</div>
                    </div>
                  }
      />
    </div>
    <div className={stylesResult.devButton}>
      <button onClick={onNextClick}> dev button: if stuck, press to proceed</button>
    </div>
  </div>
);
};


export default StateResult;