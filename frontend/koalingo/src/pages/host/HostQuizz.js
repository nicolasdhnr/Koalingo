import stylesHostQuiz from "./HostQuizz.module.css";
import stylesLogin from "../home/login.module.css";
import stylesSelect from "./hostSetSelect.module.css";
import stylesTracker from "./hostProgressTracker.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useContext } from "react";
import { AuthContext } from "../../App";

const HostQuizz = () => {
  const { gamePin} = useContext(AuthContext);
  const navigate = useNavigate();

  const onNextClick = useCallback(() => {
    navigate("/end");
  }, [navigate]);

  return (
    <div className={stylesLogin.loginPage}>
      <img className={stylesSelect.koalingoLogo} alt="" src="../../koalingo_logo.svg" /> 

      <div className={stylesHostQuiz.mainWrapper}>
        <h1 className={stylesTracker.gamePin}>Game #{gamePin}</h1>
        <div className={stylesHostQuiz.circleContainer}>
          
        </div>
      </div>
    </div>
  );
};

export default HostQuizz;
