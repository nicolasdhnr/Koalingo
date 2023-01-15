import ReactSwipe from 'react-swipe';
 
 const Carousel = (props) => {
  let reactSwipeEl;
    // The props will be an object containing the word and image url. Separate them and pass them to the divs
    // Map the urls to url variable
    // Map the words to word variable
  console.log(props);
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
            <div key={index}>
              <img src={url} alt={props.words[index]} />
              {props.words[index]}
            </div>
          );
        })}
 
      </ReactSwipe>
      <button onClick={() => reactSwipeEl.next()}>Next</button>
      <button onClick={() => reactSwipeEl.prev()}>Previous</button>
    </div>
  );
};

export default Carousel;