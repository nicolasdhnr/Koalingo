import React from 'react';
import styles from './state-result.module.css';
import { useNavigate } from 'react-router-dom';

const StateResult = () => {
  const navigate = useNavigate();
  
return (
  <div className={styles.stateResult}>
    <div className={styles.background_false} />
    <img
      className={styles.allergiesPlanDeTravail11}
      alt=""
      src="../koalingo_logo.svg"
    />
    <b className={styles.game123456}>Game #123-456</b>
    <div className={styles.stateResultItem}>
    <p className={styles.message}>
      Unfortunately, this answer is uncorrect, you will do better next time :)
    </p>
    </div>
    
    <div className={styles.xp}>+20 XP for the team</div>
  </div>
);
};


export default StateResult;

