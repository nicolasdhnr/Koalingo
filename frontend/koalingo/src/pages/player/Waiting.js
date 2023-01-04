import React, { Component, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import {TypeAnimation} from 'react-type-animation'
import styles from "./waiting.module.css";
import koala from './koala.gif';

const Waiting = () => {
  const steps = [
    'Waiting', 1000,
    'For', 1000,
    'Your teacher 👌', 1000
  ];

  const navigate = useNavigate()

  const onClickNavigate = useCallback(() => {
    navigate("/player/quizz");
   }, [navigate]);
  
    return (
      <div className={styles.page}>
      <div onClick={onClickNavigate} className={styles.rectangleParent}>
      <img className={styles.gif} src={koala} alt="loading..." />
      <div>
       <TypeAnimation wrapper="div" sequence={steps} repeat={Infinity} cursor={true} className={'caca'} />
       </div>
      </div>
      </div>
    );
  };

  export default Waiting;
