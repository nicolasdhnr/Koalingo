import { useCallback, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import stylesTracker from "./hostProgressTracker.module.css";
import stylesSelect from "./hostSetSelect.module.css";
import stylesLobby from "./hostLobby.module.css";
import { PlayerTracking } from "../../components/Players";
import { AuthContext } from "../../App";
import { ref, onValue,update } from "firebase/database";
import { realtimedb } from "../../firebase";
import { updateGameState } from "./host_logic";
import Button from "../../components/button/Button";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  updateDoc,
  documentId,
} from "firebase/firestore";

const HostProgressTracker = () => {
  const navigate = useNavigate();
  const {gamePin}= useContext(AuthContext)
// Just as in the Lobby, we want to scubscribe to changes in the player list and player reported number of memorized words.
const [playerData, setPlayerData] = useState({});
const [word, setWord] = useState([]);
const [urls, setUrls] = useState([]);
// Create a game pin and create the game in the database.


useEffect(() => {
  // Access the firestore database and get the urls for which the key matches the word.
  
    const db = getFirestore();
    const q = query(collection(db, "words"));
    // const q = query(documentId(collection(db, "words"), character));
    const getUrls = async () => {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        // Look in the data to filter only the words that are in the word state, then get the associated value
        if (doc.id == 'girl') {
          // console.log('Doc.data() keys', Object.keys(doc.data()))
          // console.log('Words', word);
          // const retrievedWords = Object.keys(doc.data()).filter((key) => word.includes(key))
          // console.log('After filter: ', retrievedWords);
          
          // console.log('urls2', urls2);
          return onValue(ref(realtimedb, "games/" + gamePin + "/words"), (snapshot) => {
            const data = snapshot.val();
            var words = Object.keys(data);
            var shuffle = [];
            for(let i=0; i<=4;i++){
              var j = Math.floor(
                Math.random() * (words.length)
              )
              console.log(j);
              shuffle.push(words[j]);  
              words.splice(j,1)
              console.log(words);
                      }
              console.log(shuffle);
            console.log(data);
            const urls = {};
            for (let i=0;i<=4;i++){
              urls[shuffle[i]] = doc.data()[shuffle[i]];
            }
            console.log("urls => ", urls);
            update(ref(realtimedb, `games/${gamePin}/`), {
              urls
            });
            setUrls(urls);
            
          }),{
            onlyOnce: true,
          };
       
          // const urls = Object.keys(doc.data()).filter((key) => word.includes(key)).map((key) => doc.data()[key]); deprecated since wrong order returned
         
        }
      });
    }
    getUrls();

}, []);
useEffect( () => {


return onValue(ref(realtimedb, "games/" + gamePin + "/players"), (snapshot) => {
    const data = snapshot.val();
    setPlayerData(data);
    console.log( playerData)
    // Get all the name components within data into an array 
    const playerNames = Object.keys(data).map((key) => data[key].name);
  });
}, [gamePin, setPlayerData]);
  
  const onRectangleButtonClick = useCallback(async () => {
    await updateGameState(gamePin, "memorizing");
  }, [navigate]);
  
  const onLogoClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onGoToQuizzClick = useCallback(() => {
    navigate("/host/quizz");
  }, [navigate]);


  // The countdown timer that can be seen on the screen
  // Navigates to the quizz game once the timer runs out
  // The time is set in host/setSelect
  const Timer = () =>{
    //predefine constants
    const SECOND = 1000; // seconds in miliseconds
    const MINUTE = SECOND * 60; // minutes in miliseconds
    const {seconds, minutes } = useContext(AuthContext); // gets selected time value from setSelect
    const [time, setTime] = useState(minutes*60000 + seconds * 1000); // set the initial time

  //updates every setInterval (1s) and changes the time seen on the screen
    useEffect(() => {
      const interval = setInterval(() => setTime(time => time - 1000), 1000);
      return () => clearInterval(interval);
    }, []);
  
    //Logic for the timer
    // When the timer runs out, navigate to quiz screen
    // else, show the timer
    if (time < 0){
      onGoToQuizzClick();
    }
    else{
    return(
      <div> 
        {Math.floor((time / MINUTE) % 60) > 9 ? Math.floor((time / MINUTE) % 60) : "0" + Math.floor((time / MINUTE) % 60)} : {Math.floor((time / SECOND) % 60) > 9 ? Math.floor((time / SECOND) % 60) : "0" + Math.floor((time / SECOND) % 60)} 
      </div>
    );
    };
  }

  return (
    <div className={stylesSelect.selectPage}>
      <img className={stylesSelect.croppedEllipse} alt="" src="../../ellipse-21.svg" /> 
      <img className={stylesSelect.koalingoLogo} alt="" src="../../koalingo_logo.svg" onClick={onLogoClick} />
      <h1 className={stylesLobby.gamePin}>Game #{gamePin}</h1> 

      <div className={stylesTracker.mainWrapper}>
        <div className={stylesTracker.timerWrapper}><Timer /> </div>
        <div className={stylesTracker.buttonWrapper}>
          <Button btnText="Go to Quiz" onClick={onGoToQuizzClick} // Missing onClick function
                  btnStyle="gold" length="btnFit"/>
        </div>
      </div>

      <div className={stylesTracker.bottomWrapper}>
        <div>Cards Memorised</div>
        <div className={stylesTracker.trackerWrapper}>
          <PlayerTracking names={Object.keys(playerData).map((key) => playerData[key].name)}
                        reported={Object.keys(playerData).map((key) => playerData[key].reported)}
          />
        </div>
      </div>
    </div>
  );
};

export default HostProgressTracker;
