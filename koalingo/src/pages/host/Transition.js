import styles from "./transition.module.css";
import stylesLogin from "../home/login.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useContext,useEffect } from "react";
import ProgressBar from  '../../components/progressBar/progressbar';
import { ref, update, remove, onDisconnect, onValue } from "firebase/database";
import { AuthContext } from '../../App';
import { realtimedb } from "../../firebase";
import { FacebookAuthProvider } from "firebase/auth";
import Button from "../../components/button/Button";

const Transition = () => {
  const [mess,setMess] = useState(""); //variable for the message displays in div
  const [round, setRound] = useState(""); //get thecurrent round of the quizz
  const navigate = useNavigate(); //allow navigation between pages
  const { gamePin} = useContext(AuthContext); //get gamepin
  const [gif,setGif] = useState("");
  const [xp,setXp] = useState(0);

  function countXP(data){
    var nb_players = Object.keys(data.players).length

    var count = 0;
    for (let i =0; i<nb_players;i++){
      var player_set =Object.values(data.players)[i];
      console.log();
      count += player_set.Quizz[data.round.toString()].xp;
    }
    return count
  }
  useEffect(() => {
    return onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => { //listen to change of the database only one time (get its data)
      var data = snapshot.val();
      setMess(Object.keys(data.urls)[parseInt(data.round-1)]);//set different values of the message component
      setRound(data.round);
      setGif(Object.values(data.urls)[parseInt(data.round-1)]);
      setXp(countXP(data));
  }, {
      onlyOnce: true,
    });
  }, []);
 
  const onNextClick = () => { //when button is clicked
    
    update(ref(realtimedb, `games/${gamePin}`), { //update the database to go to nextround
      ["quizzState"]: "game",
      ["round"]: (parseInt(round)+1).toString()
          });
          navigate("/host/quizz"); //go back to leaderboard page
     console.log(gamePin);
    
    
  
  
  };
  return (
    <div className={stylesLogin.loginPage}>
      <div className={styles.mainWrapper}>
        
        <img
          className={styles.avatar}
          alt=""
          src={gif}
        />
        Answer: {mess} <br></br>
        Your team earned {xp} xp!

        <div className={styles.buttonWrapper}>
          <Button onClick={() =>onNextClick()}
                  btnText="Next Question"
                  btnStyle="gold"
                  length="btnFit"
          />
        </div>
      </div>
    </div>
    
  );
};

export default Transition;