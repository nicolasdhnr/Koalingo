import React, { useEffect, useState, useCallback, useContext}  from "react";
import { useNavigate } from "react-router-dom";
import stylesLobby from "./hostLobby.module.css";
import stylesLogin from "../home/login.module.css";
import stylesHome from "../home/home.module.css";
import stylesEmailLogin from "../home/emailLogin.module.css";
import {realtimedb } from "../../firebase";
import { ref, onValue, set, onDisconnect } from "firebase/database";
import { AuthContext } from "../../App";
import {createGamePin, updateGameState} from  "./host_logic";
import Players from "../../components/Players.js"
import RecWrapper from "../../components/rectangleWrapper/Wrapper";
import Button from "../../components/button/Button";

const HostLobby = () => {

  const navigate = useNavigate();
  const {user, gamePin, setGamePin, seconds, setSeconds, minutes, setMinutes }= useContext(AuthContext)
  console.log(gamePin);
  const [count, setCount] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);
  console.log(user);
  


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
  }, [gamePin, setGamePin, setCount, setPlayerNames, user]);

  // Navigating to the timer page to change the game settings

  const onStartTheGame1Click = useCallback(() => {
    navigate("/host/progress-tracker");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate("/"); // need to change to back to select page
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate("/"); // need to change to back to select page
  }, [navigate]);

  const handleMinChange = (event) => {
    setMinutes(event.target.value != null ? event.target.value : 5) ;
  }

  const handleSecChange = (event) => {
    setSeconds(event.target.value != null ? event.target.value : 0);
  }
  return (
    <div className={stylesLogin.loginPage}>
        <img className={stylesEmailLogin.koalingoLogo} alt="" src="../koalingo_logo.svg" />
        <h1 className={stylesLobby.gamePin}>Game #{gamePin}</h1>

      <div className={stylesLobby.mainWrapper}>
          <RecWrapper
          content={<div className={stylesLobby.cardWrapper}>
            <div>Set timer</div>
            <div className={stylesLobby.timerWrapper}>
              <b className={stylesLobby.timer} onClick={onTimerButtonClick}> 05 </b>
              <b className={stylesLobby.timer} onClick={onTimerButtonClick}> 00 </b>
            </div>
            <Button btnText="Start the game" onClick={onStartTheGame1Click}
                    btnStyle="purple" length="btnFit"/>
          </div>}
          />
      </div>

      <Button btnText="Go Back" onClick={onBackClick}
              btnStyle="gold"/>
    </div>
  );
};

export default HostLobby;
