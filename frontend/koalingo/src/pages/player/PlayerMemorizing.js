import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import EllipseIcon from "../../components/EllipseIcon";
import styles from "./playermemorizing.module.css";
import { WordAnimation } from "../components/WordAnimation";

const PlayerMemorizing = () => {
  const navigate = useNavigate();

  const onGroupButton1Click = useCallback(() => {
    // navigate("/web-1920-6");
  }, [navigate]);

  const onRightButtonClick = useCallback(() => {
    // navigate("/web-1920-6");
      // TODO : Change slide

  }, [navigate]);

  const onLeftButtonCLick = useCallback(() => {
    //navigate("/web-1920-7");
  // TODO : Change slide

  }, [navigate]);

  //TODO: Add on click return to home page
  const onLoginClick = useCallback(() => {
    navigate("/player/quizz"); // Dont know if we should keep this slide Kept it for now
  }, [navigate]);

  return (
    <div className={styles.web19202}>
      {/* <div className={styles.web19202Child} /> */}
      <img className={styles.web19202Item} alt="" src="../ellipse-2.svg" />
      <div className={styles.web19202Inner}> 
        <WordAnimation />
      </div>
      <img className={styles.ellipseIcon} alt="" src="../ellipse-1.svg" />
      {/* <img
        className={styles.sansTitre11}
        alt=""
        src="../sans-titre-11@2x.png"
      /> */}
      <div className={styles.hello}>
        Hello
        <button onClick={() => navigate('/host/set/select')}>Go Back to selection</button>
      </div>
      <button className={styles.ellipseParent} onClick={onRightButtonClick}>
        <img className={styles.groupChild} alt="" src="../ellipse-4.svg" />
        <button className={styles.ellipseGroup} onClick={onGroupButton1Click}>
          <EllipseIcon />
          <img className={styles.groupItem} alt="" src="../polygon-1.svg" />
        </button>
      </button>
      <button className={styles.ellipseContainer} onClick={onLeftButtonCLick}>
        <img className={styles.groupInner} alt="" src="../ellipse-4.svg" />
        <img className={styles.groupIcon} alt="" src="../group-11.svg" />
      </button>
      <div className={styles.div}>1/3</div>
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../allergies-plan-de-travail-1-1@2x.png"
      />
      <button className={styles.login} onClick={onLoginClick}>
        <div className={styles.home}>Home</div>
      </button>
    {/* <WordAnimation styles={styles.sansTitre11}/> */}
    </div>
  );
};

export default PlayerMemorizing;
