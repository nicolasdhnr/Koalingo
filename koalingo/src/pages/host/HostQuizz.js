import stylesHostQuiz from "./hostQuizz.module.css";
import stylesLogin from "../home/login.module.css";
import stylesSelect from "./hostSetSelect.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useContext,useEffect } from "react";
import ProgressBar from  '../../components/progressBar/progressbar';
import { ref, update, remove, onDisconnect, onValue } from "firebase/database";
import { AuthContext } from '../../App';
import { realtimedb } from "../../firebase";


const HostQuizz = () => {
  
const {message,setMessage} =useState([]);
  const { gamePin} = useContext(AuthContext);

  const [answers,setAnswers] = useState([]);
  const navigate = useNavigate();
  const [gif,setGif]= useState([]);
  const [ispressed,setIspressed] =useState(false);

  useEffect(() => {
    //  get data from relatimedb
    return onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => {
      var data = snapshot.val();
      
  }, {
      onlyOnce: true,
    });
  }, []);

  function PlayerAnswer(data,round){
    var players = Object.values(data.players);
    var player_name = Object.keys(players);
    var response = 0;
    var xp = 0;
    
    for (let i = 0; i<player_name.length;i++){ //iterate through each player of the game
      const current = players[player_name[i]].Quizz[round.toString()]; //actual player being analysed
      response += (current.xp != 0 ? 1 : 0);
      xp += current.xp; //add xp
    }
    return [response, xp]
  }
  useEffect(() => {
  const unsubscribe = onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => {
    const data = snapshot.val();

  
    //check if this dataset exists 
    if (data != null) {
      console.log(data.players.host.Quizz["1"]);
      setGif(Object.values(data.urls)[data.round-1]);
      var y = PlayerAnswer(data,parseInt(data.round));
      console.log(Object.keys(data.urls)[data.round-1]);
      var ratio = parseInt(y[0])/(Object.keys(data.players).length-1); //ratio between students that answered and total number of players
      setAnswers([`${ratio*100}% students answered`,ratio*100,data.round-1]); //set messages for display
      console.log(ratio);
     
      if(ratio>=1){
        if(data.round!=4){
          navigate("/host/transition");
          console.log("Correct answer is:", Object.keys(data.urls)[parseInt(data.round-1)])
          setAnswers([`Correct: ${Object.keys(data.urls)[parseInt(data.round-1)]}`,ratio*100,data.round-1]) //setup the message for display
          
        }else if (data.round ==4){
          navigate("/host/end"); //if game is over go the last page
        }
        }
    }

    return unsubscribe;
    
  });
}, []);

  const onNextClick = useCallback(() => {
    navigate("/host/end");
  }, [navigate]);

  const onLogoClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <div className={stylesLogin.loginPage}>
        <img
          className={stylesSelect.koalingoLogo}
          alt=""
          src="../koalingo_logo.svg"
          onClick={onLogoClick}
        />
        <div className={stylesHostQuiz.round}>Round # {answers[2]}</div>

        <div className={stylesHostQuiz.mainWrapper}>
          <div className={stylesHostQuiz.cardWrapper}>
            <img
              className={stylesHostQuiz.action}
              alt=""
              src={gif}
            />
          </div>
          <div className={stylesHostQuiz.bottomWrapper}>
            {answers[0]}
            <div className={stylesHostQuiz.barWrapper}>
              <ProgressBar key={1} bgcolor="#6a1b9a" completed= {answers[1]} />
            </div>
          </div>
        </div>

      <div className={stylesHostQuiz.devButton}>
        <button onClick={onNextClick}> dev button: if stuck, press to proceed</button>
      </div>
    </div>
  );
};

export default HostQuizz;