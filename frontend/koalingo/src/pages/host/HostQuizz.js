import styles from "./HostQuizz.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useContext } from "react";
import { AuthContext } from "../../App";

const HostQuizz = () => {
  const { gamePin} = useContext(AuthContext);

  const navigate = useNavigate();

  const onNextClick = useCallback(() => {
    navigate("/end");
  }, [navigate]);

  return (
    <div className={styles.teacherQuizz}>
      <div className={styles.teacherQuizzChild} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../koalingo_logo.svg"
      />
      <b className={styles.game123456}>Game #{gamePin}</b>
      <img className={styles.teacherQuizzItem} alt="" src="../ellipse-5.svg" />
      <img
        className={styles.sansTitre11}
        alt=""
        src="https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/better.gif?alt=media&token=0cbda73d-7f0b-49b6-b4ad-f1cfad5e8348"
      />
      <div className={styles.teacherQuizzInner} />
      <b className={styles.hello}>Hello</b>
      <div className={styles.matthieuGotThis}>
        Insert some kind of progress bar here for the whole group
      </div>
      <b className={styles.next} onClick={onNextClick}>next</b>
    </div>
  );
};

export default HostQuizz;
