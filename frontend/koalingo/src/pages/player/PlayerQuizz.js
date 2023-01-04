import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./playerquizz.module.css";

const PlayerQuizz = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/web-1920-8");
  }, [navigate]);

  return (
    <div className={styles.web19209}>
      <div className={styles.repeatGrid9}>
        <div className={styles.bedroomWrapper} onClick={onGroupContainerClick}>
          <b className={styles.bedroom}>Bedroom</b>
        </div>
        <div className={styles.bedroomContainer}>
          <b className={styles.bedroom}>Bedroom</b>
        </div>
        <div className={styles.bedroomFrame}>
          <b className={styles.bedroom}>Bedroom</b>
        </div>
        <div className={styles.groupDiv}>
          <b className={styles.bedroom}>Bedroom</b>
        </div>
      </div>
      <b className={styles.clickIfYourWordAppearOnT}>
        Click if your word appear on the board :
      </b>
    </div>
  );
};

export default PlayerQuizz;
