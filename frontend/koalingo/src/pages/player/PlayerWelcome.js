import styles from "./playerwelcome.module.css";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

const PlayerWelcome = () => {

    //Use this page as CHARACTER SEL
    const navigate = useNavigate();

    const onCharacterSelect = useCallback(() => {
        navigate("/waiting");
    }, [navigate]);

  return (
    <div className={styles.web19208}>
      <div className={styles.web19208Child} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../allergies-plan-de-travail-1-14@2x.png"
      />
      <b className={styles.game123456}>Game #123-456</b>
      <img className={styles.web19208Item} alt="" src="../ellipse-5.svg" />
      <img
        className={styles.sansTitre11}
        alt=""
        src="../sans-titre-111@2x.png"
        onClick={onCharacterSelect}
      />
      <div className={styles.web19208Inner} />
      <b className={styles.hello}>Hello</b>


    </div>
  );
};

export default PlayerWelcome;
