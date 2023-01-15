import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import stylesHome from "./home.module.css";
import stylesLogin from "./login.module.css";
import stylesCustomise from "./playerCustomise.module.css";
import stylesSelect from "../host/hostSetSelect.module.css";
import { realtimedb } from "../../firebase";
import { ref, update} from "firebase/database";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../../App";
import RecWrapper from "../../components/rectangleWrapper/Wrapper";
import "../../App"
import { useCallback } from "react";

export const PlayerCustomise = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const {setCharacter, setGlobNickname} = useContext(AuthContext);
  const [nickname, setNickname] = useState("");

  // Directly pulled from storage folder on firebase
  const girl_url = "https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/girl%2Fwave.gif?alt=media&token=820d53ec-b73e-48d1-b691-436ad3683606";
  const boy_url = "https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/boy%2Fwave.gif?alt=media&token=87f0a651-1db4-4f93-9e24-ec9567c933c3";

  const {gamePin} = useContext(AuthContext)
  const onLogoClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const addNickname = async () => {
    const reference = ref(realtimedb, "games/" + gamePin + "/players/" + user.uid);
    // Create a new game
    await update(reference, {name : nickname});
  };

  const onChangeNickname = (event) => {
    setNickname(event.target.value);
  }
  

  const onClickChar = (event) => {
    const char = event.currentTarget.id;
    setCharacter(char);
    setGlobNickname(nickname);

    if (nickname != "") {
      addNickname(event.currentTarget.id)
      navigate('/waiting');
    } else {
      alert('Sorry, you must choose a nickname!')
    }
  }

  return (
    <div className={stylesCustomise.background}>
      <img className={stylesSelect.koalingoLogo} alt="" src="../../koalingo_logo.svg" onClick={onLogoClick} />
  
      <div className={stylesCustomise.mainWrapper}>
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
                              <button id='girl' className={stylesCustomise.child} onClick={onClickChar}>
                                <img className={stylesCustomise.image} src={girl_url} alt=""/>
                              </button>
                              <button id='boy' className={stylesCustomise.child} onClick={onClickChar}>
                                <img className={stylesCustomise.image} src={boy_url} alt=""/>
                              </button>
                            </div>
                          </div>
                        </div>
                      }
          />
      </div>
    </div>
  )
};
