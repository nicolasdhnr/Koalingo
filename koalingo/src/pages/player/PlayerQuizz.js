import styles from "./player-quizz.module.css";
import React, { useCallback, useEffect, useContext,useState } from 'react'
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { AuthContext } from '../../App';
import {realtimedb } from "../../firebase";
import { ref, update, remove, onDisconnect, onValue } from "firebase/database";


const PlayerQuizz = () => {
  const {gamePin, user} = useContext(AuthContext);
  var [word, setWord] = useState([]); 
  var [correct,setCorrect] = useState([]);
  
  useEffect(() => {
    return onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => {
      data = snapshot.val();
      setWord (Object.keys(data.words));
      setCorrect(data.quizzWords[data.round.toString()].word);
  }, {
      onlyOnce: true,
    });
   
  }, []);


  var data = undefined;
  var XP = 0;


  console.log(gamePin);
  const navigate = useNavigate();
  const [button, setButton] = useState(0);
  var bool = false;

  const onCorrect = useCallback(() => {
    navigate("/player/correct");
  }, [navigate]);
  
  
  const onWrong = useCallback(() => {
    navigate("/player/wrong");
  }, [navigate]);
 console.log(word);
 

  const Test = () => {
    const sample = [1, 2, 3];
    return (
      <div>sample[0]</div>
    )
  }
  // const [count, setCount] = useState(0);

  const idx = word.indexOf(correct);
  word.pop(idx);

  

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

  word = shuffle(word);
  var a = (word.slice(0,3));
  a.push(correct);
  a = shuffle(a);

  const HandleButtonClick = (num) => {
    setButton(num);
    console.log("clicked")
;    if (data){
      
      
      if (num == a.indexOf(correct)+1) {
        onCorrect();
        bool = true;
        XP =100;
        console.log("XP");
      }else
      {
        onWrong();
        bool = false;
        XP=15;
      };
      update(ref(realtimedb, `games/${gamePin}/players/${user.uid}/Quizz/${data.round.toString()}`), {
        ["val"]: bool,
        ["xp"]: XP,
      });
      
      
    }
    
    
  };
  
    

  const infos = {
    current_words : a,
  }
  
  useEffect(() => {
    //  get data from relatimedb
    return onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => {
      data = snapshot.val();
      
  }, {
      onlyOnce: true,
    });
  }, [button, gamePin, realtimedb]);

  

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
