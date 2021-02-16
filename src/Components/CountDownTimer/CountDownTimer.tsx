import { FunctionComponent, useEffect, useState } from "react";
import "./CountDownTimer.css";

interface CountDownTimerProps {
  startTimer: boolean;
  setStartTimer: (startTimer: boolean) => void;
  setDisplayPopup: (displayPopup: boolean) => void;
  internalClock: number;
  setInternalClock: (clock: number) => void;
  resetTimer: boolean;
  setResetTimer: (resetTimer: boolean) => void;
}

export const CountDownTimer: FunctionComponent<CountDownTimerProps> = ({
  startTimer,
  setStartTimer,
  setDisplayPopup,
  internalClock,
  setInternalClock,
  resetTimer,
  setResetTimer,
}) => {
  const TIME_LIMIT = 60;
  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 10;
  const ALERT_THRESHOLD = 5;
  const [circleDasharray, setCircleDasharray] = useState("283 283");
  const [remainingColorPath, setRemainingColorPath] = useState(
    "text-green-400"
  );

  useEffect(() => {
    const timeLeft = TIME_LIMIT - internalClock;

    const calculateTimeFraction = () => {
      if (timeLeft > 1) {
        const rawTimeFraction = (timeLeft - 1) / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
      }
      return 0;
    };

    const calculateTimeLeft = () => {
      if (timeLeft > 0) {
        setInternalClock(internalClock + 1);
      } else {
        setStartTimer(false);
        setDisplayPopup(true);
      }
    };

    const setRemainingPathColor = () => {
      if (timeLeft <= ALERT_THRESHOLD) {
        setRemainingColorPath("text-red-500");
      } else if (timeLeft <= WARNING_THRESHOLD && timeLeft > ALERT_THRESHOLD) {
        setRemainingColorPath("text-yellow-500");
      } else {
        setRemainingColorPath("text-green-400");
      }
    };

    const clearTimer = () => {
      return () => clearTimeout(timer);
    };

    let timer: any;
    if (startTimer) {
      timer = setTimeout(() => {
        calculateTimeLeft();
        setCircleDasharray(
          `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`
        );
        setRemainingPathColor();
      }, 1000);

      return clearTimer();
    } else {
      clearTimer();
    }

    if (resetTimer) {
      setResetTimer(false);
      setRemainingPathColor();
      setCircleDasharray(`283 283`);
      setRemainingColorPath("text-green-400");
    }
  }, [
    startTimer,
    TIME_LIMIT,
    internalClock,
    setStartTimer,
    setDisplayPopup,
    setInternalClock,
    resetTimer,
    setResetTimer,
  ]);

  return (
    <div className="base-timer">
      <svg
        className="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="base-timer__circle">
          <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            id="base-timer-path-remaining"
            strokeDasharray={circleDasharray}
            className={`base-timer__path-remaining ${remainingColorPath}`}
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          ></path>
        </g>
      </svg>
      <div className="flex flex-col base-timer__label">
        <span id="base-timer-label" className="">
          {TIME_LIMIT - internalClock}
        </span>
        <span className="text-sm font-extralight">seconds</span>
      </div>
    </div>
  );
};
