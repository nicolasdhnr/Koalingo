import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import stylesHome from "./home.module.css";
import stylesLogin from "./login.module.css";
import stylesCustomise from "./playerCustomise.module.css";
import stylesEmailLogin from "./emailLogin.module.css";
import { realtimedb } from "../../firebase";
import { ref, update } from "firebase/database";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../../App";
import RecWrapper from "../../components/rectangleWrapper/Wrapper";
import "../../App"

/**
 * Player Customisation page
 * @returns {JSX.Element}
 */
export const PlayerCustomise = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const { setCharacter, setGlobNickname } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");

  // Directly pulled from storage folder on firebase
  const girl_url = 'https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/initial-wave-girl.gif?alt=media&token=f9a02670-c2fa-423b-877f-429c81f29f9d';
  const boy_url = 'https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/initial-wave-boy.gif?alt=media&token=f87acbde-d8c5-4bad-8b8c-06564f39a0dc';

  const { gamePin } = useContext(AuthContext)

  /**
   * Adds nickname to firebase
   * @returns {Promise<void>}
   */
  const addNickname = async () => {
    const reference = ref(realtimedb, "games/" + gamePin + "/players/" + user.uid);
    // Create a new game
    await update(reference, { name: nickname });
  };

  // Define event listeners
  const onChangeNickname = (event) => {
    setNickname(event.target.value);
  }

  // Set character and nickname to context provider when clicked
  const onClickChar = (event) => {
    const char = event.currentTarget.id;
    setCharacter(char);
    setGlobNickname(nickname);

    if (nickname != "") {
      addNickname(event.currentTarget.id)  // Add nickname to firebase
      navigate('/waiting');
    } else {
      alert('Sorry, you must choose a nickname!')
    }
  }

  return (
    <div className={stylesLogin.loginPage}>
      <img className={stylesEmailLogin.koalingoLogo} alt="" src="../koalingo_logo.svg" />

      <div className={stylesHome.mainWrapper}>
        {/*Wrap whole component in white box */}
        <RecWrapper size="heightFit"
          content={
            // Input box for nickname
            <div className={stylesCustomise.mainWrapperChild}>
              Your Nickame

              <input className={stylesCustomise.inputWrapper}
                placeholder='Enter Nickname'
                value={nickname}
                onChange={onChangeNickname}
              />

              {/*Character selection section*/}
              <div className={stylesCustomise.characterWrapper}>
                Choose your character!
                <div className={stylesCustomise.characterWrapperChild}>

                  <button id='girl' className={stylesCustomise.child} onClick={onClickChar}>
                    <img src={girl_url} alt="girl failed to load" />
                  </button>
                  <button id='boy' className={stylesCustomise.child} onClick={onClickChar}>
                    <img src={boy_url} alt="boy failed to load" />
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
