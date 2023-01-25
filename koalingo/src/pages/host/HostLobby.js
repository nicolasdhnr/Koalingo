import React, { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import stylesLobby from "./hostLobby.module.css";
import stylesLogin from "../home/login.module.css";
import stylesSetSelect from "./hostSetSelect.module.css";
import { realtimedb } from "../../firebase";
import { update,ref, onValue, set, onDisconnect } from "firebase/database";
import { AuthContext } from "../../App";
import { createGamePin, updateGameState } from "./host_logic";
import Players from "../../components/Players.js"
import RecWrapper from "../../components/rectangleWrapper/Wrapper";
import Button from "../../components/button/Button";
import {setWordList} from './host_logic';

const HostLobby = () => {

  const navigate = useNavigate();
  const { user, gamePin, setGamePin, allWords, seconds, setSeconds, minutes, setMinutes } = useContext(AuthContext)
  
  const [count, setCount] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);
  console.log(user);

  // Create a game pin and create the game in the database.    
  useEffect(() => {
    console.log(allWords);
    const createPin = async (user) => {
      const pin = await createGamePin(user);
      await console.log(pin);
      if (pin) {
        setGamePin(pin);
      }
    }
    createPin(user);
  }, []); 

  useEffect(() => {
    
    const collectionRef = ref(realtimedb, "games/" + gamePin + "/players");

    return onValue(collectionRef, (snapshot) => {
      const data = snapshot.val();
      console.log(gamePin);
      var set = {};
      var idx=0;
      allWords.forEach((element) => {
        set[idx] = element.title;
        console.log(element);
        idx +=1;
      });
      update(ref(realtimedb, `games/${gamePin}/`), {
        "wordsList": set
       });
      // Count the number of players in the game
      if (data != null) {
        console.log(data);
        setCount(Object.keys(data).length);
        // console.log(count);
        // Get the names of the players in the game
        setPlayerNames(Object.keys(data).map((key) => data[key].name));
      }
    });
    // Dynamically change the number of players in the game
  }, [gamePin, setCount, setPlayerNames, user]);

  // Navigating to the timer page to change the game settings

  const onStartTheGame1Click = useCallback(() => {
    console.log(gamePin);
    
    
    console.log(set);
    
    navigate("/host/progress-tracker");
  }, [navigate]);


  const onBackClick = useCallback(() => {
    navigate("/host/set/select");
  }, [navigate]);

  const onLogoClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);
  

  //Handle inputs for minutes and seconds  of the timer
  const handleMinChange = (event) => {
    let sendMin = 0;
    event.target.value != null ? sendMin = event.target.value : sendMin = 5; // if no value entered, assing 5
    sendMin > 59 ? alert("Please enter a number from 0 to 59") : sendMin = sendMin; // check if value more then 59, alert if it is
    sendMin > 59 ? sendMin = 59 : sendMin = sendMin; // in case the >59 input is not changed, automatically assing it to 59
    setMinutes(sendMin);
  }

  const handleSecChange = (event) => {
    let sendSec = 0;
    event.target.value != null ? sendSec = event.target.value : sendSec = 0; // if no value entered, assing 0
    sendSec > 59 ? alert("Please enter a number from 0 to 59") : sendSec = sendSec; // check if value more then 59, alert if it is
    sendSec > 59 ? sendSec = 59 : sendSec = sendSec; // in case the >59 input is not changed, automatically assing it to 59
    setSeconds(sendSec);  }

  
  return (
    <div className={stylesLogin.loginPage}>
      <img className={stylesSetSelect.koalingoLogo} alt="" src="../koalingo_logo.svg" onClick={onLogoClick}/>
      <h1 className={stylesLobby.gamePin}>Game #{gamePin}</h1>

      <div className={stylesLobby.mainWrapper}>
        <RecWrapper
          content={
            <div className={stylesLobby.cardWrapper}>
              Set Timer
              <div className={stylesLobby.timerWrapper}>
                <input className={stylesLobby.timer}
                  type="number"
                  min="0" max="59"
                  placeholder={`${minutes} min`}
                  onChange={handleMinChange}
                /> 
                <input className={stylesLobby.timer}
                  type="number"
                  min="0" max="59"
                  placeholder = {`${seconds} sec`}
                  onChange={handleSecChange}
                /> 
              </div>
              <Button btnText="Start the game" onClick={onStartTheGame1Click}
                btnStyle="purple" length="btnMedium" />
              <Button btnText="Go Back" onClick={onBackClick}
                btnStyle="gold" length="btnMedium" />
            </div>
          }
          size="medium"
        />
      </div>

      <div className={stylesLobby.bottomWrapper}>
        <div className={stylesLobby.playersInGame}> {count} KoaLearners</div>
        <Players players={playerNames} />
      </div>

    </div>
  );
};

export default HostLobby;