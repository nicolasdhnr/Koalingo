import styles from "./host-quizz-lobby.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useContext,useEffect } from "react";
import ProgressBar from  '../../components/progressBar/progressbar';
import { ref, update, remove, onDisconnect, onValue } from "firebase/database";
import { AuthContext } from '../../App';
import { realtimedb } from "../../firebase";
import { FacebookAuthProvider } from "firebase/auth";


const TeacherQuizzResult1 = () => {
  const { gamePin} = useContext(AuthContext);
  const [round,setRound] = useState([]);
  const HandleButtonClick = () => {
    console.log("clicked")
    console.log(round);
    useEffect(() => {
      return onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => {
        data = snapshot.val();
        setRound(data.round);
        console.log(round);
        

    }, {
        onlyOnce: true,
      });
     
    }, [round]);
    const HandleButtonClick = () => {

      
      update(ref(realtimedb, `games/${gamePin}/}`), {
        ["round"]: 2-1,
        ["quizzState"]: "game"
      });
      navigate("/host/quizz");
      
    };
          
          
    }
   
  return (
    <div className={styles.teacherQuizzResult1}>
      <div className={styles.teacherQuizzResult1Child} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../allergies-plan-de-travail-1-11@2x.png"
      />
      <b className={styles.game123456}>Game #123-456</b>
      <div className={styles.teacherQuizzResult1Item} />
      <div className={styles.teacherQuizzResult1Inner}  width="100px"/>
      <img className={styles.trophyIcon} alt="" src="../trophy@2x.png" />
      <div className={styles.step4}>
        <img className={styles.step4Child} alt="" src="../ellipse-6.svg" />
        <div className={styles.step4Item} />
        <div className={styles.step4Inner} />
        <b className={styles.xp}>1245 XP</b>
        <b className={styles.round4}>Round 4</b>
      </div>
      <div className={styles.step3}>
        <img className={styles.step4Child} alt="" src="../ellipse-6.svg" />
        <div className={styles.step4Item} />
        <div className={styles.step4Inner} />
        <b className={styles.xp}>1245 XP</b>
        <b className={styles.round3}>Round 3</b>
      </div>
      <div className={styles.step2}>
        <img className={styles.step2Child} alt="" src="../ellipse-6.svg" />
        <div className={styles.step2Item} />
        <div className={styles.step4Inner} />
        <b className={styles.xp}>1245 XP</b>
        <b className={styles.round3}>Round 2</b>
      </div>
      <div className={styles.step1}>
        <img className={styles.step2Child} alt="" src="../ellipse-6.svg" />
        <div className={styles.step2Item} />
        <div className={styles.step4Inner} />
        <b className={styles.xp}>1245 XP</b>
        <b className={styles.round1}>Round 1</b>
      </div>
      <b className={styles.login} onClick={navigate("/host/quizz")}>Back to game</b>
      
    </div>
  );
};

export default TeacherQuizzResult1;
