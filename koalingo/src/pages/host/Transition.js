import styles from "./transition.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useContext,useEffect } from "react";
import ProgressBar from  '../../components/progressBar/progressbar';
import { ref, update, remove, onDisconnect, onValue } from "firebase/database";
import { AuthContext } from '../../App';
import { realtimedb } from "../../firebase";
import { FacebookAuthProvider } from "firebase/auth";

const Transition = () => {
  const [mess,setMess] = useState("");
  const [round, setRound] = useState("")
  const navigate = useNavigate();
  const { gamePin} = useContext(AuthContext);
  useEffect(() => {
    const unsubscribe = onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => {
      var data = snapshot.val();
      setMess(Object.keys(data.urls)[parseInt(data.round)]);
      setRound(data.round);
      return unsubscribe;
    }, {
        return unsubscribe;
      onlyOnce: true,
    });
  }, []);
 
  const onNextClick = () => {
    console.log("clicked");
    update(ref(realtimedb, `games/${gamePin}`), {
      ["quizzState"]: "lobby",
      ["round"]: (parseInt(round)+1).toString()
          });
          navigate("/host/quizz");
     console.log(gamePin);
    
    
  
  
  };
  return (
    <div className={styles.teacherQuizzResult2}>
      <div className={styles.teacherQuizzResult2Child} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../allergies-plan-de-travail-1-11@2x.png"
      />
      <div className={styles.teacherQuizzResult2Item} />
      <b className={styles.xp}>Answer: {mess}</b>
      <button className={styles.nextQuestion} onClick={() =>onNextClick()}>Next Question</button>
    </div>
  );
};

export default Transition;
