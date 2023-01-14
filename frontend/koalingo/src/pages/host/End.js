import styles from "./end.module.css";
import {useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import Button from "../../components/button/Button";

const End = () => {
  const navigate = useNavigate();
  const {gamePin} = useContext(AuthContext);
  // TODO: Add navigate to home page or replay
  const onEndGameClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.teacherQuizzResult}>
      <div className={styles.teacherQuizzResultChild} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../koalingo_logo.svg"
      />
      <b className={styles.game123456}>Game #{gamePin}</b>
      <div className={styles.teacherQuizzResultItem} />
      <b className={styles.matthieuIsThe}>
        The team got x XP! 
      </b>
      <div>
        
      <Button btnText="End Game" onClick={onEndGameClick} btnStyle="red" />
    </div>
      <img className={styles.trophyIcon} alt="" src="../../trophy@2x.png" />
    </div>
 
  );
};

export default End;
