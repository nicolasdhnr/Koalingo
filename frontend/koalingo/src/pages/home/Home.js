import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import styles1 from "./login.module.css"
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

  const handleTextChange = (event) => {
    setGamePinEntered(event.target.value);
  };

  const checkGamePinOnSubmit = (event) => {
    console.log("Game pin entered:" + gamePinEntered);

    // Check if The entry exists as a key in the database
    // If it does, navigate to the player page
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data[gamePinEntered.toString()] !== undefined) {
        console.log("Game pin exists");
        setGamePin(gamePinEntered.toString())
        navigate("/player/customise");
        
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
    <div className={styles1.loginPage}>
      <div className={styles1.headerWrapper}>
        {user && <Button btnText='Sign out' onClick={logout}
                  btnStyle='red' length='btnShort'/>}
      </div>
      <img className={styles1.koalingoLogo} alt='' src='../koalingo_logo.svg' />
      <div className={styles.mainWrapper}>
        <RecWrapper
          children1={<input className={styles.enter} type="text"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                        event.preventDefault(); // Only allow numbers https://stackoverflow.com/questions/43687964/only-numbers-input-number-in-react
                        }
                      }} 
                      placeholder="Game PIN here!"
                      value={gamePinEntered}
                      onChange={handleTextChange}
                    />}
          children2={<Button btnText='Submit' onClick={checkGamePinOnSubmit}
                      btnStyle='purple'/>}
          />
        <p></p>
        <Button btnText='Create a Game' onClick={onCreateAGameClick}
                btnStyle='gold' length='btnLong'/>
      </div>
    </div>
  )
};

export default Home;
