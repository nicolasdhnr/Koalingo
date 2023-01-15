import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./web19201.module.css";

const Web19201 = () => {
  const navigate = useNavigate();

  const onRectangleButtonClick = useCallback(() => {
    navigate("/web-1920-2");
  }, [navigate]);

  return (
    <div className={styles.web19201}>
      <div className={styles.web19201Child} />
      <div className={styles.repeatGrid11}>
        <div className={styles.helloParent}>
          <div className={styles.hello}>Hello</div>
          <img className={styles.groupChild} alt="" src="../ellipse-11.svg" />
          <img
            className={styles.sansTitre11}
            alt=""
            src="../sans-titre-112@2x.png"
          />
        </div>
        <div className={styles.helloGroup}>
          <div className={styles.hello}>Hello</div>
          <img className={styles.groupChild} alt="" src="../ellipse-11.svg" />
          <img
            className={styles.sansTitre11}
            alt=""
            src="../sans-titre-112@2x.png"
          />
        </div>
        <div className={styles.helloContainer}>
          <div className={styles.hello}>Hello</div>
          <img className={styles.groupChild} alt="" src="../ellipse-11.svg" />
          <img
            className={styles.sansTitre11}
            alt=""
            src="../sans-titre-112@2x.png"
          />
        </div>
        <div className={styles.groupDiv}>
          <div className={styles.hello}>Hello</div>
          <img className={styles.groupChild} alt="" src="../ellipse-11.svg" />
          <img
            className={styles.sansTitre11}
            alt=""
            src="../sans-titre-112@2x.png"
          />
        </div>
        <div className={styles.helloParent1}>
          <div className={styles.hello}>Hello</div>
          <img className={styles.groupChild} alt="" src="../ellipse-11.svg" />
          <img
            className={styles.sansTitre11}
            alt=""
            src="../sans-titre-112@2x.png"
          />
        </div>
        <div className={styles.helloParent2}>
          <div className={styles.hello}>Hello</div>
          <img className={styles.groupChild} alt="" src="../ellipse-11.svg" />
          <img
            className={styles.sansTitre11}
            alt=""
            src="../sans-titre-112@2x.png"
          />
        </div>
        <div className={styles.helloParent3}>
          <div className={styles.hello}>Hello</div>
          <img className={styles.groupChild} alt="" src="../ellipse-11.svg" />
          <img
            className={styles.sansTitre11}
            alt=""
            src="../sans-titre-112@2x.png"
          />
        </div>
        <div className={styles.helloParent4}>
          <div className={styles.hello}>Hello</div>
          <img className={styles.groupChild} alt="" src="../ellipse-11.svg" />
          <img
            className={styles.sansTitre11}
            alt=""
            src="../sans-titre-112@2x.png"
          />
        </div>
      </div>
      <img className={styles.web19201Item} alt="" src="../ellipse-2.svg" />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../allergies-plan-de-travail-1-1@2x.png"
      />
      <b className={styles.clickOnTheWordYouWantTo}>
        Click on the word you want to learn!
      </b>
      <button
        className={styles.web19201Inner}
        onClick={onRectangleButtonClick}
      />
      <b className={styles.startTheGame}>Start the game</b>
      <img className={styles.groupIcon} alt="" src="../group-34.svg" />
    </div>
  );
};

export default Web19201;
