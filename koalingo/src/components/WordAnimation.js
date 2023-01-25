import ReactSwipe from 'react-swipe';
import stylesAnimations from './word-animation.module.css';
import { useState,useEffect,useContext } from 'react';
import { AuthContext } from "../App";
import { ref, onValue,update } from "firebase/database";
import { realtimedb } from "../firebase";

const Carousel = (props) => {
  let reactSwipeEl;
  // The props will be an object containing the word and image url. Separate them and pass them to the divs
  // Map the urls to url variable
  // Map the words to word variable
  console.log(props);
  const {gamePin, user} = useContext(AuthContext);
  const [qNum, setQNum] = useState(1);
  

  // Takes button event and calls the next or previous function of the carousel
  const onClickButton = ({ target }) => {
    console.log(qNum);
    if (target.id == 'next') {
      reactSwipeEl.next();
      console.log(qNum, props.urls.length)
      update(ref(realtimedb, `games/${gamePin}/players/${user.uid.toString()}`), {
        "reported": qNum+1
      });
      if (qNum < props.urls.length) {
        setQNum(prev => prev + 1);
      }
    } 
    else if (target.id == 'prev') {
      reactSwipeEl.prev();
      if (qNum > 1) {
        setQNum(prev => prev - 1);
      }
    }
    
  }
  return (
    <div>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: false }}
        ref={el => (reactSwipeEl = el)}
        childCount={props.urls.length}
      >
        {props.urls.map((url, index) => {
          return (
            <div className={stylesAnimations.mainWrapper} >
              <div className={stylesAnimations.childWrapper} key={index}>
                <img className={stylesAnimations.image} src={url} alt={props.words[index]} />
              </div>
              <div className={stylesAnimations.textWrapper}>
                {props.words[index]}
                <div>{qNum}/{props.urls.length}</div>
              </div>
            </div>
          );
        })}


      </ReactSwipe>
      <div className={stylesAnimations.buttonWrapper}>
        <button className={stylesAnimations.buttonStyle} id='prev' onClick={onClickButton}>Previous</button>
        <button className={stylesAnimations.buttonStyle} id='next' onClick={onClickButton}>Next</button>
      </div>
    </div>
  );
};

export default Carousel;