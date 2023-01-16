import styles from "./host-quizz-lobby.module.css";
import { useNavigate } from "react-router-dom";

const TeacherQuizzResult1 = () => {
  return (
    <div className={styles.teacherQuizzResult1}>
      <div className={styles.teacherQuizzResult1Child} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../allergies-plan-de-travail-1-11@2x.png"
      />
      <b className={styles.game123456}>Game #123-456</b>
      <div className={styles.teacherQuizzResult1Item} />
      <div className={styles.teacherQuizzResult1Inner} />
      <img className={styles.trophyIcon} alt="" src="../trophy@2x.png" />
      <div className={styles.step4}>
        <img className={styles.step4Child} alt="" src="../ellipse-6.svg" />
        <div className={styles.step4Item} />
        <div className={styles.step4Inner} />
        <b className={styles.xp}>1245 XP</b>
        <b className={styles.round4}>Round 4</b>
      </div>
      <div className={styles.step3}>
        <img className={styles.step4Child} alt="" src="../ellipse-6.svg" />
        <div className={styles.step4Item} />
        <div className={styles.step4Inner} />
        <b className={styles.xp}>1245 XP</b>
        <b className={styles.round3}>Round 3</b>
      </div>
      <div className={styles.step2}>
        <img className={styles.step2Child} alt="" src="../ellipse-6.svg" />
        <div className={styles.step2Item} />
        <div className={styles.step4Inner} />
        <b className={styles.xp}>1245 XP</b>
        <b className={styles.round3}>Round 2</b>
      </div>
      <div className={styles.step1}>
        <img className={styles.step2Child} alt="" src="../ellipse-6.svg" />
        <div className={styles.step2Item} />
        <div className={styles.step4Inner} />
        <b className={styles.xp}>1245 XP</b>
        <b className={styles.round1}>Round 1</b>
      </div>
      <button className={styles.login}>
        <div className={styles.backToGame}>Back to game</div>
      </button>
    </div>
  );
};

export default TeacherQuizzResult1;
