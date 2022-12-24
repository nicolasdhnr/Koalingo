import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hostlobby.module.css";

const HostLobby = () => {
  const navigate = useNavigate();

  const onTimerButtonClick = useCallback(() => {
    navigate("/set/timer");
  }, [navigate]);

  const onStartTheGame1Click = useCallback(() => {
    navigate("/host/progress-tracker");
  }, [navigate]);

  return (
    <div className={styles.web19204}>
      <div className={styles.web19204Child} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../allergies-plan-de-travail-1-14@2x.png"
      />
      <b className={styles.game123456}>Game #123-456</b>
      <div className={styles.startTheGame} onClick={onStartTheGame1Click}>
        <button
          className={styles.startTheGameChild}
          onClick={onTimerButtonClick}
        />
        <img className={styles.startTheGameItem} alt="" src="../group-34.svg" />
        <b className={styles.startTheGame1}>Start the game</b>
        <b className={styles.setTimer}>Set timer</b>
      </div>
      <div className={styles.repeatGrid5}>
        <div className={styles.nicoWrapper}>
          <b className={styles.nico}>Nico</b>
        </div>
        <div className={styles.nicoContainer}>
          <b className={styles.nico}>Nico</b>
        </div>
        <div className={styles.nicoFrame}>
          <b className={styles.nico}>Nico</b>
        </div>
        <div className={styles.groupDiv}>
          <b className={styles.nico}>Nico</b>
        </div>
        <div className={styles.nicoWrapper1}>
          <b className={styles.nico}>Nico</b>
        </div>
        <div className={styles.nicoWrapper2}>
          <b className={styles.nico}>Nico</b>
        </div>
        <div className={styles.nicoWrapper3}>
          <b className={styles.nico}>Nico</b>
        </div>
        <div className={styles.nicoWrapper4}>
          <b className={styles.nico}>Nico</b>
        </div>
        <div className={styles.nicoWrapper5}>
          <b className={styles.nico}>Nico</b>
        </div>
      </div>
      <div className={styles.playersReadyToKoalearn}>
        6 players ready to Koalearn
      </div>
      <div className={styles.wrapper}>
        <b className={styles.b}>05</b>
      </div>
      <div className={styles.parent}>
        <b className={styles.b1}>00</b>
        <b className={styles.b2}>:</b>
      </div>
    </div>
  );
};

export default HostLobby;
