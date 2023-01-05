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

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Home
export const PlayerCustomise = () => {
  const navigate = useNavigate();
  const reference = ref(realtimedb, "games");
  const [gamePinEntered, setGamePinEntered] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const {gamePin, setGamePin, globNickname, setGlobNickname, character, setCharacter} = useContext(AuthContext);
  const [nickname, setNickname] = useState("");

  // Directly pulled from storage folder on firebase
  const girl_url = 'https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/initial-wave-girl.gif?alt=media&token=f9a02670-c2fa-423b-877f-429c81f29f9d';
  const boy_url = 'https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/initial-wave-boy.gif?alt=media&token=f87acbde-d8c5-4bad-8b8c-06564f39a0dc';
  // useEffect(() => {
  //   // Access the firestore database and get the urls for which the key matches the word.
  //   if (word != []){
  //   const db = getFirestore();
  //   const q = query(collection(db, "words"));
  //   const getUrls  = async () => {
  //     const querySnapshot = await getDocs(q);
  //     console.log(querySnapshot);
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.id, " => ", doc.data());
  //       // Look in the data to filter only the words that are in the word state, then get the associated value
  //       const urls = Object.keys(doc.data()).filter((key) => word.includes(key)).map((key) => doc.data()[key]);
  //       console.log("urls => ", urls);
  //       setUrls(urls);
  //     });
  //   }
  //   getUrls();

  //   }
  // }, [word]);

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
        navigate("/waiting");
        
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

  const onChangeNickname = (event) => {
    setNickname(event.target.value);
  }

  const onSubmitNickname = (event) => {
    event.preventDefault()
    console.log('Submitted nickname:', nickname)
    setGlobNickname(nickname);
    console.log('Global nickname: ', globNickname)
  }

  const onClickBoy = () => {
    setCharacter('boy');
    console.log(character);
  }
  const onClickGirl = () => {
    setCharacter('girl');
    console.log(character);
  }
  const onClickToGame = () => {
    navigate('/waiting')
  }

  return (
    <div className={styles1.loginPage}>
      <div className={styles1.headerWrapper}>
        {user && <Button btnText='Sign out' onClick={logout}
                  btnStyle='red' length='btnShort'/>}
      </div>
      <img className={styles1.koalingoLogo} alt='' src='../koalingo_logo.svg' />
      <div className={styles.mainWrapper}>
        <form onSubmit={onSubmitNickname}>
          <input 
            placeholder='Enter Nickname'
            value={nickname}
            onChange={onChangeNickname}
          ></input>
          <button type="submit"> Submit Nickname</button>
        </form>
        <h1>Choose your character below:</h1>
        <button onClick={onClickGirl}>
          Girl
          <img src={girl_url} alt="girl failed to load"/>
        </button>
        <button onClick={onClickBoy}>
          Boy
          <img src={boy_url} alt="boy failed to load"/>
        </button>
        <button onClick={onClickToGame}>Go to Game</button>

        {/* <RecWrapper
          children1={<input className={styles.enter} type="text"
                      nKeyPress={(event) => {
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
          /> */}
        {/* <p></p> */}
        {/* <Button btnText='Create a Game' onClick={onCreateAGameClick}
                btnStyle='gold' length='btnLong'/> */}
      </div>
    </div>
  )
};
