import styles from "./TeacherQuizzResult.module.css";

const TeacherQuizzResult = () => {
  return (
    <div className={styles.teacherQuizzResult}>
      <div className={styles.teacherQuizzResultChild} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../koalingo_logo.svg"
      />
      <b className={styles.game123456}>Game #123-456</b>
      <div className={styles.teacherQuizzResultItem} />
      <b className={styles.matthieuIsThe}>
        Matthieu is the winner with +1000 XP
      </b>
      <b className={styles.endGame}>END GAME</b>
      <img className={styles.trophyIcon} alt="" src="../trophy@2x.png" />
    </div>
  );
};

export default TeacherQuizzResult;
