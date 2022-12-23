import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const onCreateAGameClick = useCallback(() => {
    navigate("/host/lobby"); // User wants to create a game - send them to the host page 
  }, [navigate]);


  return (
    <div className={styles.home}>
      <div className={styles.rectangleDiv} />
      <div className={styles.groupDiv}>
        <button className={styles.rectangleButton} autoFocus />
        <b className={styles.enter}>Enter</b>
        
      </div>
      <input className={styles.groupInput} type="text" placeholder="Game PIN" />
      <img
        className={styles.logo}
        alt=""
        src="../assets/logo.png"
      />
     
      <button className={styles.createAGame} onClick={onCreateAGameClick}>
        Create a game
      </button>      
      
    </div>
  );
};

export default Home;     