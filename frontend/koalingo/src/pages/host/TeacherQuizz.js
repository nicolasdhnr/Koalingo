import styles from "./TeacherQuizz.module.css";

const TeacherQuizz = () => {
  return (
    <div className={styles.teacherQuizz}>
      <div className={styles.teacherQuizzChild} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../koalingo_logo.svg"
      />
      <b className={styles.game123456}>Game #123-456</b>
      <img className={styles.teacherQuizzItem} alt="" src="../ellipse-5.svg" />
      <img
        className={styles.sansTitre11}
        alt=""
        src="../sans-titre-11@2x.png"
      />
      <div className={styles.teacherQuizzInner} />
      <b className={styles.hello}>Hello</b>
      <div className={styles.matthieuGotThis}>
        Matthieu got this one correct!
      </div>
      <b className={styles.next}>next</b>
    </div>
  );
};

export default TeacherQuizz;
