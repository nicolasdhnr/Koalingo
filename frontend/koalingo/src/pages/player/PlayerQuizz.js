import styles from "./playerquizz.module.css";
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";




const PlayerQuizz = () => {
  const navigate = useNavigate();
    // Render state result component on click.  
  
  const onWordSelected = useCallback(() => {
    console.log("hey");
    navigate("/player/result");
  }, [navigate]);

  var sample_list = ["My", "name", "is", "matthieu","need","redbull"];
  var good = "redbull";
  const idx = sample_list.indexOf(good);
  sample_list.pop(idx);

  

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
      var tmp, current, top = array.length;
      if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
  }

  sample_list = shuffle(sample_list);
  var a = (sample_list.slice(0,3));
  a.push(good);
  a = shuffle(a);
  




  const infos = {

    current_words : a,
  }
  





  return (
    <div className={styles.hostquizwords1}>
      <div className={styles.hostquizwords1Child} />
      <div className={styles.hostquizwords1Item} />
      <div className={styles.hostquizwords1Inner} />
      <div className={styles.rectangleDiv} />
      <div className={styles.bedroomWrapper}>
        <b className={styles.bedroom}>{infos.current_words[0]}</b>
      </div>
      <div className={styles.bedroomContainer}>
        <b className={styles.bedroom}>{infos.current_words[1]}</b>
      </div>
      <div className={styles.bedroomFrame}>
        <b className={styles.bedroom} onClick={onWordSelected}>{infos.current_words[2]}</b>
      </div>
      <div className={styles.groupDiv}>
        <button className={styles.bedroom}>{infos.current_words[3]}</button>
      </div>
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../koalingo_logo.svg"
      />
      <b className={styles.game123456}>Game #123-456</b>
    </div>
  );
};

export default PlayerQuizz;
