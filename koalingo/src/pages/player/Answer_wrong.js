import React from 'react';
import stylesResult from './state-result.module.css';
import stylesEmailLogin from '../home/emailLogin.module.css';
import RecWrapper from '../../components/rectangleWrapper/Wrapper';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const StateResult = () => {
  const navigate = useNavigate();
  const onNextClick = useCallback(() => {
    navigate("/end");
  }, [navigate]);
  
return (
  <div className={stylesResult.backgroundFalse}>
    <img className={stylesEmailLogin.koalingoLogo} alt="" src="../koalingo_logo.svg" />

    <div className={stylesResult.mainWrapper}>
      <RecWrapper length="heightFit"
                  content={
                    <div className={stylesResult.recWrapper}>
                      <div className={stylesResult.textWrapper1}>Unfortunately, this is incorrect, you will do better next time! </div>
                      <div className={stylesResult.textWrapper2}>+ 20 XP for the team</div>
                    </div>
                  }
      />
    </div>
    <div className={stylesResult.devButton}>
      <button onClick={onNextClick}> dev button: if stuck, press to proceed</button>
    </div>
  </div>
);
};


export default StateResult;

