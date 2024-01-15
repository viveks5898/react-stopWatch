import React, { useEffect, useRef, useState } from "react";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const startRef = useRef(0);
  useEffect(() => {
    if (isRunning) {
      setInterval(() => {
        intervalRef.current = setElapsedTime(Date.now() - startRef.current);
      }, 10);

      return () => {
        clearInterval(intervalRef);
      };
    }
  }, [isRunning]);
  function start() {
    setIsRunning(true);
    startRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setElapsedTime(0);
  }
  function formtTime() {
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let miliseconds = Math.floor((elapsedTime % 1000) / 10);
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliseconds = String(miliseconds).padStart(2, "0");
    return `${minutes}:${seconds}:${miliseconds}`;
  }
  return (
    <div className="stopWatch">
      <div className="display">{formtTime()}</div>
      <div className="controls">
        <button onClick={start} className="start-button">
          {" "}
          start
        </button>
        <button onClick={stop} className="stop-button">
          {" "}
          stop
        </button>
        <button onClick={reset} className="reset-button">
          {" "}
          reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
