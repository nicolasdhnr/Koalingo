import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

// Home
const Home = () => {
  const navigate = useNavigate();

  const onEnterButtonClick = useCallback(() => {
    navigate("/player/welcome");
  }, [navigate]);


  const onCreateAGameClick = useCallback(() => {
    navigate("/host/set/select");
  }, [navigate]);

  return (
    <div className={styles.web19203}>
      <div className={styles.web19203Child} />
      <div className={styles.rectangleParent}>
        <button
          className={styles.groupChild}
          autoFocus
          onClick={onEnterButtonClick}
        />
        <b className={styles.enter}>Enter</b>
      </div>
      <input
        className={styles.web19203Item}
        type=""
        placeholder="Enter Game PIN here!"
      />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="/allergies-plan-de-travail-1-12@2x.png" // This is not uploading
      />
      <button className={styles.createAGame} onClick={onCreateAGameClick}>
        Create a game
      </button>
    </div>
  );
};

export default Home;
