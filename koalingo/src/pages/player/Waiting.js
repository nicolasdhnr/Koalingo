import stylesWaiting from "./waiting.module.css";
import stylesLogin from "../home/login.module.css";
import React, { useCallback, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import {TypeAnimation} from 'react-type-animation'
import koala from './koala.gif';
import { ref, update, remove, onDisconnect, onValue } from "firebase/database";
import { AuthContext } from '../../App';
import { realtimedb } from "../../firebase";
import RecWrapper from "../../components/rectangleWrapper/Wrapper";

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
    // This was overwriting the nickname in firebase
    update(ref(realtimedb, "games/" + gamePin + "/players/" + user.uid), {
      name: "Nicolas",
      reported:0,
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
      <div className={stylesLogin.loginPage}>
        <div className={stylesWaiting.mainWrapper}>
          <RecWrapper
          size="medium"
            content={
              <div className={stylesWaiting.wrapperChild}>
                <img className={stylesWaiting.gif} src={koala} alt="" />
                <TypeAnimation wrapper="div" sequence={steps} repeat={Infinity} cursor={true} className={'caca'} />
              </div>
            }>
          </RecWrapper>
        </div>
        
        <button onClick={onClickNavigate}>Dev: To next page</button>
      </div>
    );
  };

  export default Waiting;
