import styles from "./transition.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useContext,useEffect } from "react";
import ProgressBar from  '../../components/progressBar/progressbar';
import { ref, update, remove, onDisconnect, onValue } from "firebase/database";
import { AuthContext } from '../../App';
import { realtimedb } from "../../firebase";
import { FacebookAuthProvider } from "firebase/auth";

const Transition = () => {
  const [mess,setMess] = useState(""); //variable for the message displays in div
  const [round, setRound] = useState(""); //get thecurrent round of the quizz
  const navigate = useNavigate(); //allow navigation between pages
  const { gamePin} = useContext(AuthContext); //get gamepin
  useEffect(() => {
    return onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => { //listen to change of the database only one time (get its data)
      var data = snapshot.val();
      setMess(Object.keys(data.urls)[parseInt(data.round)]);//set different values of the message component
      setRound(data.round);
  }, {
      onlyOnce: true,
    });
  }, []);
 
  const onNextClick = () => { //when button is clicked
    
    update(ref(realtimedb, `games/${gamePin}`), { //update the database to go to nextround
      ["quizzState"]: "lobby",
      ["round"]: (parseInt(round)+1).toString()
          });
          navigate("/host/quizz"); //go back to leaderboard page
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
