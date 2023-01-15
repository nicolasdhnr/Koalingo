import ReactSwipe from 'react-swipe';
import { useState } from 'react';

const Carousel = (props) => {
  let reactSwipeEl;
  // The props will be an object containing the word and image url. Separate them and pass them to the divs
  // Map the urls to url variable
  // Map the words to word variable
  console.log(props);
  const [qNum, setQNum] = useState(1);

  // Takes button event and calls the next or previous function of the carousel
  const onClickButton = ({ target }) => {
    if (target.id == 'next') {
      reactSwipeEl.next();
      console.log(qNum, props.urls.length)
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
            <div>
              <div key={index}>
                <img src={url} alt={props.words[index]} />
                {props.words[index]}
              </div>
              <div>{qNum}/{props.urls.length}</div>
            </div>
          );
        })}


      </ReactSwipe>
      <button id='next' onClick={onClickButton}>Next</button>
      <button id='prev' onClick={onClickButton}>Previous</button>
    </div>
  );
};

export default Carousel;