import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./playerlobby.module.css";

const PlayerLobby = () => {
  const navigate = useNavigate();

  const onLetsGoClick = useCallback(() => {
    navigate("/player/memorizing"); // Take to the memorizing page
  }, [navigate]);


  return (
    <div className={styles.web192014}>
      <div className={styles.web192014Child} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="/koalingo-logo.png"
      />
      <button className={styles.letsGo} onClick={onLetsGoClick}>
        Waiting for host to start the game...
      </button>
    </div>
  );
};

export default PlayerLobby;
