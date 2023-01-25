import stylesPlayerQuiz from "./player-quizz.module.css";
import stylesSelect from "../host/hostSetSelect.module.css";
import stylesLogin from "../home/login.module.css";
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
  var [round,setRound] = useState([1]);

  var data = undefined;
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
  
  useEffect(() => {
    return onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => {
      data = snapshot.val();
  
      var set = Object.values(data.wordsList).slice(0,4);
      console.log(data.round);
      setCorrect(Object.keys(data.urls)[parseInt(data.round)-1]);
      console.log(Object.keys(data.urls)[(data.round)-1]);
      if(set.includes(Object.keys(data.urls)[parseInt(data.round)-1])==false){
        set[0]=Object.keys(data.urls)[parseInt(data.round)-1];
        console.log(set[0]);
      }
      console.log(set);
      setWord (set);
      setRound(data.round.toString());
  }, {
      onlyOnce: true,
    });
   
  }, []);


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

 const onLogoClick = useCallback(() => {
  navigate("/home");
  }, [navigate]);
 
    // http://stackoverflow.com/questions/962802#962890

  const HandleButtonClick = (num) => {
    setButton(num);

      update(ref(realtimedb, `games/${gamePin}`), {
        ["quizzState"]: "wait",
      
      });
    
      if (num == word.indexOf(correct)+1) {
        onCorrect();
        bool = true;
        XP =250;
        console.log("XP");
      }else
      {
        onWrong();
        bool = false;
        XP=15;
      };
      update(ref(realtimedb, `games/${gamePin}/players/${user.uid.toString()}/Quizz/${round}`), {
        ["val"]: bool,
        ["xp"]: XP,
      });
  };
  
  useEffect(() => {
    //  get data from relatimedb
    return onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => {
      data = snapshot.val();
      
  }, {
      onlyOnce: true,
    });
  }, [button, gamePin, realtimedb]);

  return (
    <div className={stylesLogin.loginPage}>
      <div className={stylesPlayerQuiz.devMessage}>
        *dev message: if nothing happens after first click, click again to proceed
      </div>
      <div className={stylesPlayerQuiz.mainWrapper}>
        <div className={stylesPlayerQuiz.option1} onClick={() => HandleButtonClick(1)}>
          {word[0]}
        </div>
        <div className={stylesPlayerQuiz.option2} onClick={() => HandleButtonClick(2)}>
          {word[1]}
        </div>
        <div className={stylesPlayerQuiz.option3} onClick={() => HandleButtonClick(3)}>
          {word[2]}
        </div>
        <div className={stylesPlayerQuiz.option4} onClick={() => HandleButtonClick(4)}>
          {word[3]}
        </div>
      </div>
    </div>
  );
};

export default PlayerQuizz;