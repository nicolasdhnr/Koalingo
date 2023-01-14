import styles from "./playerquizz.module.css";
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




const PlayerQuizz = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
    // Render state result component on click.  
  
  const onWordSelected = useCallback(() => {
    navigate("/player/result");
  }, [navigate]);





  return (
    <div className={styles.hostquizwords1}>
      <div className={styles.hostquizwords1Child} />
      <div className={styles.hostquizwords1Item} />
      <div className={styles.hostquizwords1Inner} />
      <div className={styles.rectangleDiv} />
      <div className={styles.bedroomWrapper}>
        <b className={styles.bedroom}>Bedroom</b>
      </div>
      <div className={styles.bedroomContainer}>
        <b className={styles.bedroom}>Bedroom</b>
      </div>
      <div className={styles.bedroomFrame}>
        <b className={styles.bedroom} onClick={onWordSelected}>Bedroom</b>
      </div>
      <div className={styles.groupDiv}>
        <button className={styles.bedroom}>Bedroom</button>
      </div>
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../koalingo_logo.svg"
      />
      <b className={styles.game123456}>Game #123-456</b>
    </div>
  );
};

export default PlayerQuizz;
