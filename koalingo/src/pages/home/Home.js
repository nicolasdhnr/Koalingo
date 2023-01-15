import { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stylesHome from "./home.module.css";
import stylesLogin from "./login.module.css";
import stylesEmailLogin from "./emailLogin.module.css";
import stylesLobby from "../host/hostLobby.module.css";
import { realtimedb } from "../../firebase";
import { ref, onValue, update, set} from "firebase/database";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../../App";
import RecWrapper from "../../components/rectangleWrapper/Wrapper";
import Button from "../../components/button/Button";
import "../../App"
import {logout} from "../../firebase";

// Home
const Home = () => {
  const navigate = useNavigate();
  const reference = ref(realtimedb, "games");
  const [gamePinEntered, setGamePinEntered] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const {gamePin, setGamePin} = useContext(AuthContext);
  const [changePage, setChangePage] = useState(false);

  const handleTextChange = (event) => {
    setGamePinEntered(event.target.value);
  };

  
useEffect(() => {
    if (changePage) {
      console.log("changing page:" + gamePinEntered);
      console.log(typeof gamePinEntered)
      setGamePin(gamePinEntered.toString());
      setChangePage(false);
      console.log(gamePin)
      navigate("/player/customise");
    }
  }, [changePage, gamePinEntered, setGamePin, navigate]);


  const checkGamePinOnSubmit = () => {
    console.log("Game pin entered:" + gamePinEntered);

    // Check if The entry exists as a key in the database
    // If it does, navigate to the player page
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data[gamePinEntered.toString()] !== undefined) {
        console.log("Game pin exists");
        setChangePage(true);
        
      } else {
        alert("Game pin does not exist");
        //TODO: Display error message
        
      }
    }
    );
  };

  const onEnterButtonClick = useCallback(() => {
    navigate("/player/welcome");
  }, [navigate]);


  const onCreateAGameClick = useCallback(() => {
    navigate("/host/set/select");
  }, [navigate]);

  return (
    <div className={stylesLogin.loginPage}>
      <img className={stylesEmailLogin.koalingoLogo} alt="" src="../koalingo_logo.svg" />

      <div className={stylesHome.mainWrapper}>
          <RecWrapper
            content={
              <div className={stylesHome.gamepinWrapper}>
                <input className={stylesHome.enter} type="text"
                        nKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                          event.preventDefault(); // Only allow numbers https://stackoverflow.com/questions/43687964/only-numbers-input-number-in-react
                          }
                        }} 
                        placeholder="Game PIN here!"
                        value={gamePinEntered}
                        onChange={handleTextChange}
                />
                <Button btnText='Submit' onClick={checkGamePinOnSubmit}
                        btnStyle='purple'/>
              </div>
            }
          />
      </div>

      <div className={stylesHome.bottomWrapper}>
        <Button btnText="Create Game" onClick={onCreateAGameClick}
                btnStyle="gold" length="btnLong"/>
        <Button btnText="Sign out" onClick={logout}
                 btnStyle="bgColor" />
        </div>
    </div>
  )
};

export default Home;