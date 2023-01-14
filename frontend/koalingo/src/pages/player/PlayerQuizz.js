import styles from "./playerquizz.module.css";
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";




const PlayerQuizz = () => {
  const navigate = useNavigate();
    // Render state result component on click.  
  const [button, setButton] = useState(0);
  const onCorrect = useCallback(() => {

    navigate("/player/correct");
  }, [navigate]);
  
  const onWrong = useCallback(() => {

    navigate("/player/wrong");
  }, [navigate]);

  // const handleButtonClick = () 

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
  
  const HandleButtonClick = (num) => {
    setButton(num);
    console.log(num);
    console.log(a.indexOf(good));
    if (num == a.indexOf(good)+1) {
      onCorrect();
    }else{
      onWrong();
    }
  };





  const infos = {

    current_words : a,
  }
  





  return (
    <div className={styles.hostquizwords1}>
      <div className={styles.hostquizwords1Child} />
      <div className={styles.hostquizwords1Item} />
      <div className={styles.hostquizwords1Inner} />
      <div className={styles.rectangleDiv} />
      <div className={styles.bedroomWrapper} onClick={() => HandleButtonClick(1)}>
        <b className={styles.bedroom} onClick={() => HandleButtonClick(1)}>{infos.current_words[0]}</b>
      </div>
      <div className={styles.bedroomContainer} onClick={() => HandleButtonClick(2)}>
        <b className={styles.bedroom} onClick={() => HandleButtonClick(2)}>{infos.current_words[1]}</b>
      </div>
      <div className={styles.bedroomFrame} onClick={() => HandleButtonClick(3)}>
        <b className={styles.bedroom} onClick={() => HandleButtonClick(3)}>{infos.current_words[2]}</b>
      </div>
      <div className={styles.groupDiv} onClick={() => HandleButtonClick(4)}>
        <b className={styles.bedroom} onClick={() => HandleButtonClick(4)}>{infos.current_words[3]}</b>
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
