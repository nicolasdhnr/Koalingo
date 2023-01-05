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
  const {globNickname, setGlobNickname, character, setCharacter} = useContext(AuthContext);
  const [nickname, setNickname] = useState("");

  // Directly pulled from storage folder on firebase
  const girl_url = 'https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/initial-wave-girl.gif?alt=media&token=f9a02670-c2fa-423b-877f-429c81f29f9d';
  const boy_url = 'https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/initial-wave-boy.gif?alt=media&token=f87acbde-d8c5-4bad-8b8c-06564f39a0dc';

  const onChangeNickname = (event) => {
    setNickname(event.target.value);
  }

  const onClickBoy = () => {
    setCharacter('boy');
    console.log(character);
    if (nickname != "") {
      setGlobNickname(nickname);
      console.log('Global Nickname: ', globNickname);
      console.log('Local nickname: ', nickname);
      navigate('/waiting');
    } else {
      alert('Sorry, you must choose a nickname!')
    }
  }
  const onClickGirl = () => {
    setCharacter('girl');
    console.log(character);
    if (nickname != "") {
      setGlobNickname(nickname);
      console.log('Global Nickname: ', globNickname);
      console.log('Local nickname: ', nickname);
      navigate('/waiting');
    } else {
      alert('Sorry, you must choose a nickname!')
    }
  }

  return (
    <div className={styles1.loginPage}>
      <div className={styles1.headerWrapper}>
        {user && <Button btnText='Sign out' onClick={logout}
                  btnStyle='red' length='btnShort'/>}
      </div>
      <img className={styles1.koalingoLogo} alt='' src='../koalingo_logo.svg' />
      <div className={styles.mainWrapper}>
        <input 
          placeholder='Enter Nickname'
          value={nickname}
          onChange={onChangeNickname}
        ></input>
        <h1>Choose your character below:</h1>
        <button onClick={onClickGirl}>
          Girl
          <img src={girl_url} alt="girl failed to load"/>
        </button>
        <button onClick={onClickBoy}>
          Boy
          <img src={boy_url} alt="boy failed to load"/>
        </button>
      </div>
    </div>
  )
};