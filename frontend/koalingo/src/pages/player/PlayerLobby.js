import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./playerlobby.module.css";

const PlayerLobby = () => {
  const navigate = useNavigate();

  const onLetsGoClick = useCallback(() => {
    navigate("/player/memorizing"); // Take to the memorizing page
  }, [navigate]);

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <div className={styles.web192014}>
      <div className={styles.web192014Child} />
      <img
        className={styles.allergiesPlanDeTravail11}
        alt=""
        src="/allergies-plan-de-travail-1-12@2x.png"
      />
      <button className={styles.letsGo} onClick={onLetsGoClick}>
        Let’s go
      </button>
    </div>
  );
};

export default PlayerLobby;
