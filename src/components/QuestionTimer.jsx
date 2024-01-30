import React, { useState, useEffect } from 'react';

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log('Setting Timer');
    // const timer = setTimeout(() => {
    //   onTimeout();
    // }, timeout);
    const timer = setTimeout(onTimeout, timeout); // 위 코드로 실행하면 onTimeout is not a function이라는 오류가 발생함. 그렇다고 onTimeout; 이라고하면 정상 동작 안 해.

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log('Setting Interval');
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
};

export default QuestionTimer;
