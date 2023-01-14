import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import stylesHome from "./home.module.css";
import stylesLogin from "./login.module.css";
import stylesCustomise from "./player-customise.module.css";
import stylesEmailLogin from "./email-login.module.css";
import { realtimedb } from "../../firebase";
import { ref, update} from "firebase/database";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../../App";
import RecWrapper from "../../components/rectangleWrapper/Wrapper";
import "../../App"

export const PlayerCustomise = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const {setCharacter} = useContext(AuthContext);
  const [nickname, setNickname] = useState("");

  // Directly pulled from storage folder on firebase
  const girl_url = 'https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/initial-wave-girl.gif?alt=media&token=f9a02670-c2fa-423b-877f-429c81f29f9d';
  const boy_url = 'https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/initial-wave-boy.gif?alt=media&token=f87acbde-d8c5-4bad-8b8c-06564f39a0dc';

  const {gamePin} = useContext(AuthContext)

  const addNickname = async () => {
    const reference = ref(realtimedb, "games/" + gamePin + "/players/" + user.uid);
    // Create a new game
    await update(reference, {"nickname" : nickname});
  };

  const onChangeNickname = (event) => {
    setNickname(event.target.value);
  }

  const onClickChar = (event) => {
    const char = event.currentTarget.id;
    setCharacter(char);

    if (nickname != "") {
      console.log('Local nickname: ', nickname);
      addNickname(event.currentTarget.id)
      navigate('/waiting');
    } else {
      alert('Sorry, you must choose a nickname!')
    }
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
                              <button id='girl' className={stylesCustomise.child} onClick={onClickChar}>
                                <img src={girl_url} alt="girl failed to load"/>
                              </button>
                              <button id='boy' className={stylesCustomise.child} onClick={onClickChar}>
                                <img src={boy_url} alt="boy failed to load"/>
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
