import { useCallback, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hostprogresstracker.module.css";
import { PlayerTracking } from "../../components/Players";
import { AuthContext } from "../../App";
import { ref, onValue } from "firebase/database";
import { realtimedb } from "../../firebase";
import { updateGameState } from "./host_logic";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../../firebase";


const HostProgressTracker = () => {
  const navigate = useNavigate();
  const {gamePin}= useContext(AuthContext)
// Just as in the Lobby, we want to scubscribe to changes in the player list and player reported number of memorized words.
const [playerData, setPlayerData] = useState({});

// Ge t

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

  return (
    <div className={styles.web19205}>
      <img className={styles.web19205Child} alt="" src="../ellipse-2.svg" />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../koalingo_logo.svg"
      />
      <b className={styles.game123456}>Game #{gamePin}</b>
      <div>
        <PlayerTracking names={Object.keys(playerData).map((key) => playerData[key].name)} reported={Object.keys(playerData).map((key) => playerData[key].reported)} />
      </div>
      <button
        className={styles.web19205Item}
        onClick={onRectangleButtonClick}
      />
      <img className={styles.web19205Inner} alt="" src="../group-34.svg" />
      <b className={styles.startTheGame}>Start the game</b>
      <button className={styles.login} onClick={onLoginClick}>
        <div className={styles.timer}><Timer /> </div>
      </button>
    </div>
  );
};

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

export default HostProgressTracker;
