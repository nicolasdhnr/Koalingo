import styles from './StateResult.module.css';
import { useNavigate } from 'react-router-dom';

export const StateResult = () => {



  return (
    <div className={styles.stateResult}>
      <div className={styles.stateResultChild} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../koalingo_logo.svg"
      />
      <b className={styles.game123456}>Game #123-456</b>
      <div className={styles.stateResultItem} />
      <b className={styles.congratulationsYouGot}>
        Congratulations, you got this one correct!
      </b>
      <div className={styles.xp}>+ 1000 XP</div>
    </div>
  );
};

