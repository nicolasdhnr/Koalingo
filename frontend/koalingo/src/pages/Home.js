import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { realtimedb } from "../firebase";
import { ref, onValue, update} from "firebase/database";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";

// Home
const Home = () => {
  const navigate = useNavigate();
  const reference = ref(realtimedb, "games");
  const [gamePin, setGamePin] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  const [nickname, setNickName] = useState('');
  const [showNickname, setShowNickname] = useState(false);

  console.log(user)

  const handleTextChange = (event) => {
    setGamePin(event.target.value);
  };


  const checkGamePinOnSubmit = (event) => {
    // event.preventDefault();
    console.log("Game pin entered:" + gamePin);

    // Check if The entry exists as a key in the database
    // If it does, navigate to the player page
    // If it doesn't, display an error message
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      if (data[gamePin] !== undefined) {
        console.log("Game pin exists");

       // Add user ID to the list of players in the game
        update(ref(realtimedb, "games/" + gamePin + "/players"), {
          [user.uid]: {
            name: "Nicolas", 
            score: 0,
          },
        });
        
        if (!showNickname) {
          setShowNickname(true);
        }
        // navigate("/player/welcome");
      } else {
        console.log("Game pin does not exist");
        //TODO: Display error message
        if (!showNickname) {  // only for testing with no gamepin
          setShowNickname(true);
        }
        
      }
    }
    );

  };

    
  const onEnterButtonClick =() => {
    console.log('Button clicked: ', nickname)
    navigate("/player/welcome");
  };


  const onCreateAGameClick = useCallback(() => {
    navigate("/host/set/select");
  }, [navigate]);

  // const onGoToSelectClick = () => navigate('/host/set/select_words')
  const onGoToSelectClick = () => navigate('/host/set/select')
  const onChangeNickname = ({target}) => {
    const {name, value} = target
    setNickName(prev => value);
    console.log(nickname);
  }
  const onSubmitNickname = () => {navigate('/player/welcome')}
  const NicknameComp = (showNickname ? 
          <form style ={{
          width: 100,
          height: 100,
          position: 'absolute',
          top: 150,
          left: 90
          }} onSubmit={onSubmitNickname}>
          <input
          placeholder="Enter Nickname"
          name='title'
          value={nickname}
          onChange={onChangeNickname}>
          </input>
          <button type='submit'>Submit nickname</button>

        </form> : <div></div>);

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
        {NicknameComp}
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
        value={gamePin}
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
