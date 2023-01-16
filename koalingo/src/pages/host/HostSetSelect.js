import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import NewWord from "../../components/NewWord";
import RecWrapper from "../../components/rectangleWrapper/Wrapper";
import WordsList from "../../components/WordList";
import stylesSelect from "./hostSetSelect.module.css";
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
        <img className={stylesSelect.koalingoLogo} alt="" src="../../koalingo_logo.svg" onClick={onLogoClick} />

        <div className={stylesSelect.nameSetWrapper}>
          Name your set:
          <input className={stylesSelect.setName} type="text" placeholder="daily phrases" />
          <div className={stylesSelect.buttonWrapper}>
            <Button btnText='Save your set' onClick={onSaveYourSetClick}
              btnStyle='gold' length="btnMedium" />
            <Button btnText='Words' onClick={() => navigate("/host/available-words")}
              btnStyle='bgColor' length='btnFit' />
          </div>
        </div>

        <div className={stylesSelect.enterWordWrapper}>
          <NewWord className={stylesSelect} />
        </div>

        <div className={stylesSelect.wordsListWrapper}>
          <WordsList />
        </div>
      </div>

    </div>
  );
};

export default HostSetSelect;
