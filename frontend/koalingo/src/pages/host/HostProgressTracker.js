import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hostprogresstracker.module.css";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../../firebase";


const HostProgressTracker = () => {
  const navigate = useNavigate();
  // Create a unique 6 digit ID associated with the specific user 
  // const [gameID, setGameID] = useState("");
  // const [user, loading, error] = useAuthState(auth);

  // const onContinueAsGuestClick = useCallback(() => {
  //   navigate("/home");
  //   // TODO/ Add anonymous sign in function here
  
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
        src="../allergies-plan-de-travail-1-1@2x.png"
      />
      <b className={styles.game123456}>Game #123-456</b>
      <div className={styles.repeatGrid10}>
        <div className={styles.groupParent}>
          <div className={styles.nicoWrapper}>
            <b className={styles.nico}>Nico</b>
          </div>
          <div className={styles.div}>2</div>
        </div>
        <div className={styles.groupContainer}>
          <div className={styles.nicoWrapper}>
            <b className={styles.nico}>Nico</b>
          </div>
          <div className={styles.div}>2</div>
        </div>
        <div className={styles.groupDiv}>
          <div className={styles.nicoWrapper}>
            <b className={styles.nico}>Nico</b>
          </div>
          <div className={styles.div}>2</div>
        </div>
        <div className={styles.groupParent1}>
          <div className={styles.nicoWrapper}>
            <b className={styles.nico}>Nico</b>
          </div>
          <div className={styles.div}>2</div>
        </div>
        <div className={styles.groupParent2}>
          <div className={styles.nicoWrapper}>
            <b className={styles.nico}>Nico</b>
          </div>
          <div className={styles.div}>2</div>
        </div>
        <div className={styles.groupParent3}>
          <div className={styles.nicoWrapper}>
            <b className={styles.nico}>Nico</b>
          </div>
          <div className={styles.div}>2</div>
        </div>
        <div className={styles.groupParent4}>
          <div className={styles.nicoWrapper}>
            <b className={styles.nico}>Nico</b>
          </div>
          <div className={styles.div}>2</div>
        </div>
        <div className={styles.groupParent5}>
          <div className={styles.nicoWrapper}>
            <b className={styles.nico}>Nico</b>
          </div>
          <div className={styles.div}>2</div>
        </div>
      </div>
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
