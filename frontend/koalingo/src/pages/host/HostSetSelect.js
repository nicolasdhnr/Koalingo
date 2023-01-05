import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import NewWord from "../../components/NewWord";
import RecWrapper from "../../components/rectangleWrapper/Wrapper";
import WordsList from "../../components/WordList";
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
    <div className={styles.selectPage}>
      <img className={styles.croppedEllipse} alt="" src="../../ellipse-21.svg" /> 
      <img className={styles.koalingoLogo} alt="" src="../../koalingo_logo.svg" onClick={onLogoClick}/> 
        <div className={styles.nameSetWrapper}>
          <div>Name your set:</div>
          <input className={styles.setName} type="text" placeholder="daily phrases"/>
          <br></br>
          <br></br>
          <Button btnText='Save your set' onClick={onSaveYourSetClick}
                  btnStyle='gold'/>
        </div>
      <div className={styles.enterWordWrapper}>
        <div>Enter word:</div>
        <input className={styles.wordInput} type="text" placeholder=" 'How are you?'"/>
        <div className={styles.buttonWrapper}>
          <img className={styles.circleBtn} alt="" src="../../ellipse-31.svg" />
          <img className={styles.cross} alt="" src="../../polygon-11.svg" />
        </div>
      </div>
      <div className={styles.cardWrapper}>
        <RecWrapper shading='shaded' children1='how are you' size='small'></RecWrapper>
        <RecWrapper shading='shaded' children1='better' size='small'></RecWrapper>
        <RecWrapper shading='shaded' children1='hearing' size='small'></RecWrapper>
        <RecWrapper shading='shaded' children1='happy' size='small'></RecWrapper>
        <RecWrapper shading='shaded' children1='sad' size='small'></RecWrapper>
      </div>
    </div>
  );
};

export default HostSetSelect;
