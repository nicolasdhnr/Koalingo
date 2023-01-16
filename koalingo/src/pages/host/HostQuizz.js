import stylesHostQuiz from "./host-quizz.module.css";
import stylesLogin from "../home/login.module.css";
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

  useEffect(() => {
    console.log("fuck");
    update(ref(realtimedb, `games/${gamePin}}`), {
      ["quizzState"]: "test",
    });
  }, [ispressed]);

  function PlayerAnswer(data,round){
    var players = Object.values(data.players);
    var player_name = Object.keys(players);
    var response = 0;
    var xp = 0;
    
    for (let i = 0; i<player_name.length;i++){
      const current = players[player_name[i]].Quizz[round.toString()];
      response += (current.xp != 0 ? 1 : 0);
      console.log(response);
      xp += current.xp;
    }
    return [response, xp]
  }
  useEffect(() => {
  const unsubscribe = onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => {
    const data = snapshot.val();

  
    //console.log(Object.values(data));
    //var results = Object.values(data)
    //console.log((Object.values(data)[2]["host"].Quizz["1"]));
    if (data != null) {
      console.log(data.players.host.Quizz["1"]);
      setGif(Object.values(data.urls)[data.round]);
      var y = PlayerAnswer(data,1);
      console.log(y);
      var ratio = parseInt(y[0])/Object.keys(data.players).length;
      setAnswers([`${ratio*100}% students answered`,ratio*100,data.round]);
      //setMessage(`${ratio*100}% students answered`)
      console.log(ratio);
     
      if(ratio>=1){
        if(data.round<4){
          navigate("/host/transition");
          update(ref(realtimedb, `games/${gamePin}/`), {
            ["quizzState"]: "lobby",
            
          });
          console.log(Object.keys(data.urls)[parseInt(data.round)]);
          setAnswers([`Correct: ${Object.keys(data.urls)[parseInt(data.round)]}`,ratio*100,data.round])
          
        }else if (data.round >=4){
          navigate("/host/end");
        }
        }
       
      
    
      
    }

    return unsubscribe;
    
  });
}, []);


  const onNextClick = () => {
    console.log("clicked");
    setIspressed(true);
     console.log(gamePin);
    
    
  
  
  };


  var seconds = 30;
  var minutes = 5;
  var [time, setTime] = useState(20000); // set the initial time
    useEffect(() => {
      const interval = setInterval(() => setTime(time => time - 1000), 1000);
      setTime(interval);
      return () => clearInterval(interval);
    }, []);
  

  






  return (
    <div className={stylesHostQuiz.teacherQuizz}>
      <div className={stylesHostQuiz.teacherQuizzChild} />
      <img
        className={stylesHostQuiz.allergiesPlanDeTravail11}
        alt=""
        src="../koalingo_logo.svg"
      />
      <b className={stylesHostQuiz.game123456}>Round # {answers[2]}</b>
      <img className={stylesHostQuiz.teacherQuizzItem} alt="" src="../ellipse-5.svg" />
      <img
        className={stylesHostQuiz.sansTitre11}
        alt=""
        src={gif}
      />
      
  

      <div className={stylesHostQuiz.teacherQuizzInner} />
      <b className={stylesHostQuiz.hello}> {answers[0]}</b>
      
      
      <div className={stylesHostQuiz.matthieuGotThis}>
      <div className="App">
      
        <ProgressBar key={1} bgcolor="#6a1b9a" completed= {answers[1]} />
      
    </div>
    <div>
      <b className={stylesHostQuiz.login} onClick={() =>onNextClick()}>Next</b>
    </div>
    

      </div>
     
    </div>
  );
};

export default HostQuizz;