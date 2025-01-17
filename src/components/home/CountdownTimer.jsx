import React, { useState, useEffect } from "react";

function CountdownTimer({ expiryDate }) {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(expiryDate)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(expiryDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryDate]);

  function calculateTimeRemaining(expiryDate) {
    const now = Date.now() / 1000; // Convert to seconds
    const difference = expiryDate / 1000 - now;

    // if (difference <= 0) {
    //   return { hours: 0, minutes: 0, seconds: 0 };
    // }

    const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((difference % (60 * 60)) / 60);
    const seconds = Math.floor(difference % 60);

    return { hours, minutes, seconds };
  }

  return (
    <div className="de_countdown">
      {timeRemaining.hours <= 0 &&
      timeRemaining.minutes <= 0 &&
      timeRemaining.seconds <= 0
        ? "EXPIRED"
        : `
  ${timeRemaining.hours}h
  ${timeRemaining.minutes}m
  ${timeRemaining.seconds}s
   
   `}
    </div>
  );
}

export default CountdownTimer;

// function Countdown({targetTimestamp}) {
//   const [countdown, setCountdown] = useState(calculateTimeRemaining(timestamp));

//   async function fetchCountdown() {
//     const { data } = await axios.get(
//       "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
//     );
//     setCountdown(data);
// }

//   useEffect(() => {
//     fetchCountdown()
//   }, [])

//   return
<div className="de_countdown"></div>;
// }

// export default Countdown;

// const CountdownTimer = ({ unixTime }) => {
//     const calculateTimeLeft = () => {
//         const now = Math.floor(Date.now() / 1000); // current time in seconds
//         const difference = unixTime - now; // difference in seconds

//         if (difference <= 0) {
//             return { hours: 0, minutes: 0, seconds: 0 };
//         }

//         const hours = Math.floor((difference % (60 * 60 * 24)) / 3600);
//         const minutes = Math.floor((difference % (60 * 60)) / 60);
//         const seconds = Math.floor(difference % 60);

//         return { hours, minutes, seconds };
//     };

//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTimeLeft(calculateTimeLeft());
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);

//     return (
//         <div>
//             <h1></h1>
//             <h2>
//                 {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
//             </h2>
//         </div>
//     );
// };

// export default CountdownTimer;
