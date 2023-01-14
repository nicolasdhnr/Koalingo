import { useCallback, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import stylesTracker from "./hostProgressTracker.module.css";
import stylesSelect from "./hostSetSelect.module.css";
import stylesLobby from "./hostLobby.module.css";
import { PlayerTracking } from "../../components/Players";
import { AuthContext } from "../../App";
import { ref, onValue } from "firebase/database";
import { realtimedb } from "../../firebase";
import { updateGameState } from "./host_logic";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import Button from "../../components/button/Button";


const HostProgressTracker = () => {
  const navigate = useNavigate();
  const {gamePin}= useContext(AuthContext)
// Just as in the Lobby, we want to scubscribe to changes in the player list and player reported number of memorized words.
const [playerData, setPlayerData] = useState({});

// Create a game pin and create the game in the database.
useEffect( () => {
return onValue(ref(realtimedb, "games/" + gamePin + "/players"), (snapshot) => {
    const data = snapshot.val();
    setPlayerData(data);
    // Get all the name components within data into an array 
    const playerNames = Object.keys(data).map((key) => data[key].name);
  });
}, [gamePin, setPlayerData]);
  
  const onRectangleButtonClick = useCallback(async () => {
    await updateGameState(gamePin, "memorizing");
  
  }, [navigate]);

  const onLoginClick = useCallback(() => {
    navigate("/host/set/timer");
  }, [navigate]);

  const onEndClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const Timer = () =>{
    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const {seconds, minutes } = useContext(AuthContext);
    const [time, setTime] = useState(minutes*60000 + seconds * 1000);
  
    useEffect(() => {
      const interval = setInterval(() => setTime(time => time - 1000), 1000);
      return () => clearInterval(interval);
    }, []);
  
    if (time < 0){
      return(
        <div>Time's up</div>
      )
    }
    else{
    return(
      <div> 
        {Math.floor((time / MINUTE) % 60) > 9 ? Math.floor((time / MINUTE) % 60) : "0" + Math.floor((time / MINUTE) % 60)} : {Math.floor((time / SECOND) % 60) > 9 ? Math.floor((time / SECOND) % 60) : "0" + Math.floor((time / SECOND) % 60)} 
      </div>
  );
  };}


  return (
    <div className={stylesSelect.selectPage}>
      <img className={stylesSelect.croppedEllipse} alt="" src="../../ellipse-21.svg" /> 
      <img className={stylesSelect.koalingoLogo} alt="" src="../../koalingo_logo.svg" /> 

      <div className={stylesTracker.mainWrapper}>
        <h1 className={stylesTracker.gamePin}>Game #{gamePin}</h1>
        <div className={stylesTracker.timerWrapper}><Timer /> </div>
        <Button btnText="End Game" onClick={onEndClick} // Missing onClick function
                btnStyle="gold" />
      </div>
  
      <div className={stylesTracker.bottomWrapper}>
        <div>Player Score</div>
        <div className={stylesTracker.trackerWrapper}>
          <PlayerTracking names={Object.keys(playerData).map((key) => playerData[key].name)}
                        reported={Object.keys(playerData).map((key) => playerData[key].reported)}
          />
        </div>
      </div>
    </div>
  );
};

export default HostProgressTracker;
