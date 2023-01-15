// THIS CODE IS NOT USED

import React from 'react';
import { useState, useEffect } from 'react';

const Timer = () => {
    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const [time, setTime] = useState(300000);

  useEffect(() => {
    const interval = setInterval(() => setTime(time => time - 1000), 1000);
    return () => clearInterval(interval);
  }, []);

  return ( time
    // <div className="timer">
    //     minutes: {Math.floor((time / MINUTE) % 60)},
    //     seconds: {Math.floor((time / SECOND) % 60)}
    // </div>
  );
};

export default Timer;


// import React from 'react';
// import { useState, useEffect } from 'react';

// const Timer = () => {
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);

//   let time = 300000;

//   const getTime = () => {
//     time = time - 1000;

//     setMinutes(Math.floor((time / 1000 / 60) % 60));
//     setSeconds(Math.floor((time / 1000) % 60));
//     console.log(time);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => getTime(), 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="timer">
//         minutes
//         {minutes}
//         seconds
//         {seconds}
//     </div>
//   );
// };

// export default Timer;