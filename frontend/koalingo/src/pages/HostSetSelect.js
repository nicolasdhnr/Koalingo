import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hostsetselect.module.css";

const HostSetSelect = () => {
  const navigate = useNavigate();

  const onLogoClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onSaveYourSetClick = useCallback(() => {
    navigate("/host/lobby");
  }, [navigate]);

  return (
    <div className={styles.web192011}>
      <img className={styles.web192011Child} alt="" src="../ellipse-21.svg" />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../allergies-plan-de-travail-1-13@2x.png"
        onClick={onLogoClick}
      />
      <b className={styles.game123456}>Game #123-456</b>
      <div className={styles.startTheGame}>
        <b className={styles.food}>Food</b>
      </div>
      <div className={styles.enterYourWordParent}>
        <div className={styles.enterYourWord}>Enter your word:</div>
        <div className={styles.ellipseParent}>
          <img className={styles.groupChild} alt="" src="../ellipse-42.svg" />
          <div className={styles.ellipseGroup}>
            <img className={styles.groupItem} alt="" src="../ellipse-31.svg" />
            <div className={styles.div}>+</div>
            <img className={styles.groupInner} alt="" src="../polygon-11.svg" />
          </div>
        </div>
        <input
          className={styles.groupInput}
          type="text"
          placeholder="Game PIN"
        />
      </div>
      <b className={styles.nameYourSet}>Name your set:</b>
      <div className={styles.repeatGrid8}>
        <div className={styles.div1}>
          <div className={styles.child} />
          <div className={styles.eating}>
            <p className={styles.eating1}>Eating</p>
          </div>
        </div>
        <div className={styles.div2}>
          <div className={styles.child} />
          <div className={styles.eating}>
            <p className={styles.eating1}>Eating</p>
          </div>
        </div>
        <div className={styles.div3}>
          <div className={styles.child} />
          <div className={styles.eating}>
            <p className={styles.eating1}>Eating</p>
          </div>
        </div>
        <div className={styles.div4}>
          <div className={styles.child} />
          <div className={styles.eating}>
            <p className={styles.eating1}>Eating</p>
          </div>
        </div>
        <div className={styles.div5}>
          <div className={styles.child} />
          <div className={styles.eating}>
            <p className={styles.eating1}>Eating</p>
          </div>
        </div>
        <div className={styles.div6}>
          <div className={styles.child} />
          <div className={styles.eating}>
            <p className={styles.eating1}>Eating</p>
          </div>
        </div>
        <div className={styles.div7}>
          <div className={styles.child} />
          <div className={styles.eating}>
            <p className={styles.eating1}>Eating</p>
          </div>
        </div>
        <div className={styles.div8}>
          <div className={styles.child} />
          <div className={styles.eating}>
            <p className={styles.eating1}>Eating</p>
          </div>
        </div>
        <div className={styles.div9}>
          <div className={styles.child} />
          <div className={styles.eating}>
            <p className={styles.eating1}>Eating</p>
          </div>
        </div>
        <div className={styles.div10}>
          <div className={styles.child} />
          <div className={styles.eating}>
            <p className={styles.eating1}>Eating</p>
          </div>
        </div>
        <div className={styles.div11}>
          <div className={styles.child} />
          <div className={styles.eating}>
            <p className={styles.eating1}>Eating</p>
          </div>
        </div>
        <div className={styles.div12}>
          <div className={styles.child} />
          <div className={styles.eating}>
            <p className={styles.eating1}>Eating</p>
          </div>
        </div>
      </div>

      <button className={styles.saveYourSet} onClick={onSaveYourSetClick}>
        Save your set
      </button>
    </div>
  );
};

export default HostSetSelect;
