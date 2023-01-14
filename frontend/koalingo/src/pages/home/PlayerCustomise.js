import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import stylesHome from "./home.module.css";
import stylesLogin from "./login.module.css";
import stylesCustomise from "./playerCustomise.module.css";
import stylesEmailLogin from "./emailLogin.module.css";
import { realtimedb } from "../../firebase";
import { ref, onValue, update, set} from "firebase/database";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../../App";
import RecWrapper from "../../components/rectangleWrapper/Wrapper";
import Button from "../../components/button/Button";
import "../../App"
import {logout} from "../../firebase";

// import {
//   getFirestore,
//   query,
//   getDocs,
//   collection,
//   where,
//   addDoc,
//   setDoc,
//   updateDoc,
// } from "firebase/firestore";

// Home
export const PlayerCustomise = () => {
  const navigate = useNavigate();
  const reference = ref(realtimedb, "games");
  // const [gamePinEntered, setGamePinEntered] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const {globNickname, setGlobNickname, character, setCharacter} = useContext(AuthContext);
  const [nickname, setNickname] = useState("");

  // Directly pulled from storage folder on firebase
  const girl_url = 'https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/initial-wave-girl.gif?alt=media&token=f9a02670-c2fa-423b-877f-429c81f29f9d';
  const boy_url = 'https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/initial-wave-boy.gif?alt=media&token=f87acbde-d8c5-4bad-8b8c-06564f39a0dc';

  const testUserID = 'test';
  const {gamePin} = useContext(AuthContext)

  const addNickname = async () => {
    const reference = ref(realtimedb, "games/" + gamePin + "/players/" + user.uid);
    // Create a new game
    await update(reference, {
      "nickname" : nickname
    }
    );
  };

  const onChangeNickname = (event) => {
    setNickname(event.target.value);
  }

  const onClickBoy = () => {
    setCharacter('boy');
    console.log(character);
    if (nickname != "") {
      // setGlobNickname(nickname);
      // console.log('Global Nickname: ', globNickname);
      console.log('Local nickname: ', nickname);
      addNickname()
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

  const onClickCheck = () => {
    console.log(globNickname);
    console.log(user);
    console.log(user.uid);
    console.log(gamePin);
    addNickname(gamePin, user, globNickname);

  }

  return (
    <div className={stylesLogin.loginPage}>
      <img className={stylesEmailLogin.koalingoLogo} alt="" src="../koalingo_logo.svg" />
  
      <div className={stylesHome.mainWrapper}>
          <RecWrapper size="heightFit"
                      content={
                        <div className={stylesCustomise.mainWrapperChild}>
                          Your Nickame
                          <input className={stylesCustomise.inputWrapper}
                            placeholder='Enter Nickname'
                            value={nickname}
                            onChange={onChangeNickname}
                          />
                          <div className={stylesCustomise.characterWrapper}>
                          Choose your character!
                            <div className={stylesCustomise.characterWrapperChild}>
                              <button className={stylesCustomise.child} onClick={onClickGirl}>
                                <img src={girl_url} alt="girl failed to load"/>
                              </button>
                              <button className={stylesCustomise.child} onClick={onClickBoy}>
                                <img src={boy_url} alt="boy failed to load"/>
                              </button>
                            </div>
                          </div>
                          <button onClick={onClickCheck}>Check context nickname</button>
                        </div>
                      }
          />
      </div>
    </div>
  )
};
