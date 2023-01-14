import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import stylesSetTimer from "./settimer.module.css";
import stylesLogin from "../home/login.module.css";
import stylesEmailLogin from "../home/emailLogin.module.css";
import stylesHome from "../home/home.module.css";
import { useState, useEffect } from 'react';
import RecWrapper from "../../components/rectangleWrapper/Wrapper";


const SetTimer = () => {
  const navigate = useNavigate();

  const onLoginClick = useCallback(() => {
    navigate("/host/lobby");
  }, [navigate]);

  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const [time, setTime] = useState(300000);

  useEffect(() => {
    const interval = setInterval(() => setTime(time => time - 1000), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={stylesLogin.loginPage}>
      <img className={stylesEmailLogin.koalingoLogo} alt="" src="../../koalingo_logo.svg" />

      <div className={stylesHome.mainWrapper}>
          <RecWrapper size="heightFit"
                      content={
                        <div>
                          <div>
                            <b>{Math.floor((time / MINUTE) % 60)} </b>
                          </div>
                          <div>
                            <b>{Math.floor((time / SECOND) % 60)}</b>
                          </div>
                          <b>Minutes</b>
                          <b>Seconds</b>
                          <button onClick={onLoginClick}>
                            <div>Progress Tracking</div>
                          </button>
                        </div>
                      }
          />
      </div>
    </div>
  );
};

export default SetTimer;
