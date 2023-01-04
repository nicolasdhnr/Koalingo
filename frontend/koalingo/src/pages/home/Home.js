import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { realtimedb } from "../../firebase";
import { ref, onValue, update, set} from "firebase/database";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../../App";

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
    // If it doesn't, display an error message
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data[gamePinEntered.toString()] !== undefined) {
        console.log("Game pin exists");
        setGamePin(gamePinEntered.toString())
        navigate("/waiting");
        
      } else {
        console.log("Game pin does not exist");
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

  // const onGoToSelectClick = () => navigate('/host/set/select_words')
  const onGoToSelectClick = () => navigate('/host/set/select')

  return (
    <div className={styles.web19203}>
      <div className={styles.web19203Child} />
      <div className={styles.rectangleParent}>
        <button
          className={styles.groupChild}
          autoFocus
          onClick={checkGamePinOnSubmit}
        />
        <b className={styles.enter}>Enter</b>
      </div>
      <input
        className={styles.web19203Item}
        type="text"
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault(); // Only allow numbers https://stackoverflow.com/questions/43687964/only-numbers-input-number-in-react
          }
        }} 
        placeholder="Enter Game PIN here!"
        value={gamePinEntered}
        onChange={handleTextChange}
      />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="/koalingo-logo.png" // This is not uploading
      />
      <button className={styles.createAGame} onClick={onCreateAGameClick}>
        Create a game
      </button>
      <br></br>
      <br></br>
      <button className={styles.navToSelect} onClick={onGoToSelectClick}>Go to word select dev page</button>
    </div>
  );
};

export default Home;
