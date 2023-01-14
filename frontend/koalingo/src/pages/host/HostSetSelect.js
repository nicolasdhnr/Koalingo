import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import NewWord from "../../components/NewWord";
import RecWrapper from "../../components/rectangleWrapper/Wrapper";
import WordsList from "../../components/WordList";
import stylesSelect from "./host-set-select.module.css";
import listStyles from "./word-list-styles.css";

const HostSetSelect = () => {
  const navigate = useNavigate();

  const onLogoClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onSaveYourSetClick = useCallback(() => {
    navigate("/host/lobby");
  }, [navigate]);

  return (
    <div>
    <div className={stylesSelect.selectPage}>
      <img className={stylesSelect.croppedEllipse} alt="" src="../../ellipse-21.svg" /> 
      <img className={stylesSelect.koalingoLogo} alt="" src="../../koalingo_logo.svg" onClick={onLogoClick}/> 

      <div className={stylesSelect.nameSetWrapper}>
          Name your set:
          <input className={stylesSelect.setName} type="text" placeholder="daily phrases"/>
          <Button btnText='Save your set' onClick={onSaveYourSetClick}
                  btnStyle='gold' length="btnMedium"/>
      </div>

      <div className={stylesSelect.enterWordWrapper}>
        {/* Enter word: */}
        {/* <input className={stylesSelect.wordInput} type="text" placeholder=" 'How are you?'"/> */}
        <NewWord className={stylesSelect} />
        {/* <div className={stylesSelect.buttonWrapper}>
          <img className={stylesSelect.circleBtn} alt="" src="../../ellipse-31.svg" />
          <img className={stylesSelect.cross} alt="" src="../../polygon-11.svg" />
        </div> */}
        {/* <div className={stylesSelect.wordInput}> <NewWord/> </div> */}
      </div>

      <div className={stylesSelect.cardWrapper}>
        {/* <RecWrapper shading='shaded' content='how are you' size='small'></RecWrapper>
        <RecWrapper shading='shaded' content='better' size='small'></RecWrapper>
        <RecWrapper shading='shaded' content='hearing' size='small'></RecWrapper>
        <RecWrapper shading='shaded' content='happy' size='small'></RecWrapper>
        <RecWrapper shading='shaded' content='sad' size='small'></RecWrapper> */}
      </div>
      <WordsList />
    </div>
    
    </div>
  );
};

export default HostSetSelect;
