import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EllipseIcon from "../../components/EllipseIcon";
import styles from "./player-memorizing.module.css";
import Carousel from "../../components/WordAnimation";
import { realtimedb, db } from "../../firebase";
import { ref, onValue, set, onDisconnect } from "firebase/database";
import { AuthContext } from "../../App";
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

const PlayerMemorizing = () => {
  const {gamePin, character} = useContext(AuthContext);
  const [word, setWord] = useState([]); 
  const [urls, setUrls] = useState([]);
  console.log('The character is: ' + character);
  useEffect(() => {
    // I need to take the words in the session. Then access firestore database for those words and get the urls if they exist
    const collectionRef = ref(realtimedb, "games/" + gamePin + "/wordsList");
    return onValue(collectionRef, (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        // Only keep the keys 
        // const words = Object.keys(data).map((key) => key);
        const words = Object.values(data);  // Only keep values
        console.log(words);
        setWord(words);
      }
    });
  
  }, [setWord, gamePin]);

  useEffect(() => {
    // Access the firestore database and get the urls for which the key matches the word.
    if (word != []){
    const db = getFirestore();
    const q = query(collection(db, "words"));
    // const q = query(documentId(collection(db, "words"), character));
    const getUrls  = async () => {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        // Look in the data to filter only the words that are in the word state, then get the associated value
        if (doc.id == character) {
          // console.log('Doc.data() keys', Object.keys(doc.data()))
          // console.log('Words', word);
          // const retrievedWords = Object.keys(doc.data()).filter((key) => word.includes(key))
          // console.log('After filter: ', retrievedWords);
          const urls = [];
          word.forEach((element) => {urls.push(doc.data()[element])});
          // console.log('urls2', urls2);

          // const urls = Object.keys(doc.data()).filter((key) => word.includes(key)).map((key) => doc.data()[key]); deprecated since wrong order returned
          console.log("urls => ", urls);
          setUrls(urls);
        }
      });
    }
    getUrls();

  }
}, [word]);

  const navigate = useNavigate();


  //TODO: Add on click return to home page
  const onLoginClick = useCallback(() => {
    navigate("/player/quizz"); // Dont know if we should keep this slide Kept it for now
  }, [navigate]);

  return (
    <div className={styles.web19202}>
      {/* <div className={styles.web19202Child} /> */}
      <img className={styles.web19202Item} alt="" src="../ellipse-2.svg" />
      <div className={styles.web19202Inner}> 
      </div>
      <img className={styles.ellipseIcon} alt="" src="../ellipse-1.svg" />
     
      <Carousel urls={urls} words={word} className={styles.div}/>

      
      
      <button className={styles.ellipseParent}>
      
        <img className={styles.groupChild} alt="" src="../ellipse-4.svg" />
        <button className={styles.ellipseGroup}>
        
          <EllipseIcon />
          <img className={styles.groupItem} alt="" src="../polygon-1.svg" />
        </button>
      </button>
      <button className={styles.ellipseContainer}>
        <img className={styles.groupInner} alt="" src="../ellipse-4.svg" />
        <img className={styles.groupIcon} alt="" src="../group-11.svg" />
      </button>
      <div className={styles.div}>1/3</div>
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="../koalingo_logo.svg"
      />
      <button className={styles.login} onClick={onLoginClick}>
        <div className={styles.home}>Home</div>
      </button>
      
    {/* <WordAnimation styles={styles.sansTitre11}/> */}
    </div>
  );
};

export default PlayerMemorizing;
