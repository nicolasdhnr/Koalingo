import stylesHostQuiz from "./hostQuizz.module.css";
import stylesLogin from "../home/login.module.css";
import stylesSelect from "./hostSetSelect.module.css";
import stylesTracker from "./hostProgressTracker.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useContext } from "react";
import Progressbar from '../../components/progressBar/progressbar';
import { AuthContext } from "../../App";

const HostQuizz = () => {
  
  const { gamePin} = useContext(AuthContext);
  const navigate = useNavigate();

  const onNextClick = useCallback(() => {
    navigate("/end");
  }, [navigate]);
var x = 10;
console.log(x);

var array = [1, 2, 3, 4, 5]
for(let i = 0; i < 30; i++) {
  setTimeout(() => {
    //Progressbar.Childdiv.width = `${i}%`;
    console.log(x);
  }, i*100);
}


  return (
    <div className={stylesLogin.loginPage}>
      <img className={stylesSelect.koalingoLogo} alt="" src="../../koalingo_logo.svg" /> 

        <div className={stylesHostQuiz.mainWrapper}>
          <h1 className={stylesTracker.gamePin}>Game #{gamePin}</h1>
          <div className={stylesHostQuiz.cardWrapper}>
            <img
              className={stylesHostQuiz.action}
              alt=""
              src="https://firebasestorage.googleapis.com/v0/b/koalingo-dc436.appspot.com/o/better.gif?alt=media&token=0cbda73d-7f0b-49b6-b4ad-f1cfad5e8348"
            />
          </div>
        </div>
    </div>
  );
};

export default HostQuizz;