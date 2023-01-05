import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hostprogresstracker.module.css";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { PlayerTracking } from "../../components/Players";

const HostProgressTracker = () => {
  const navigate = useNavigate();
  
// Just as in the Lobby, we want to scubscribe to changes in the player list and player reported number of memorized words.

  
  const onRectangleButtonClick = useCallback(() => {
    navigate("/player/welcome");
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
      <b className={styles.game123456}>Game #123-456</b>
      
      <button
        className={styles.web19205Item}
        onClick={onRectangleButtonClick}
      />
      <img className={styles.web19205Inner} alt="" src="../group-34.svg" />
      <b className={styles.startTheGame}>Start the game</b>
      <button className={styles.login} onClick={onLoginClick}>
        <div className={styles.timer}>Timer</div>
      </button>
    </div>
  );
};

export default HostProgressTracker;
