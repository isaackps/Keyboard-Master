import randomWords from "random-words";
import { FunctionComponent, useState } from "react";
import { CountDownTimer } from "../Components/CountDownTimer";
import { InputBar } from "../Components/InputBar";
import { ScoreBox } from "../Components/ScoreBox";
import { ScorePopup } from "../Components/ScorePopup";

export const HomePage: FunctionComponent = () => {
  const [wordsPerMin, setWordsPerMin] = useState(0);
  const [totalNumberOfWordsTyped, setTotalNumberOfWordsTyped] = useState(0);
  const [charsPerMin, setCharsPerMin] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [internalClock, setInternalClock] = useState(0);
  const randomW = randomWords({ exactly: 5, maxLength: 6 });
  const [words, setWords] = useState(
    typeof randomW === "string" ? [randomW] : randomW
  );
  const [resetTimer, setResetTimer] = useState(false);
  const [resetInput, setResetInput] = useState(false);

  const resetTest = () => {
    setWordsPerMin(0);
    setTotalNumberOfWordsTyped(0);
    setCharsPerMin(0);
    setInternalClock(0);
    setStartTimer(false);
    setDisplayPopup(false);
    const newWords = randomWords(5) as string[];
    setWords(newWords);
    setResetTimer(true);
    setResetInput(true);
  };

  const accuracy = ~~((wordsPerMin / totalNumberOfWordsTyped) * 100);
  return (
    <div className="bg-gray-100">
      <div className="relative">
        {displayPopup && (
          <ScorePopup
            resetTest={resetTest}
            wordsPerMin={wordsPerMin}
            charsPerMin={charsPerMin}
            accuracy={accuracy}
          />
        )}
        <div className="container flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <p className="font-mono text-sm font-thin text-gray-600 pb-4 uppercase">
              Speed Typing Test
            </p>
            <h1 className="text-6xl font-bold">Test your typing skills</h1>
            <p className="text-md font-extralight text-gray-600 pt-4">
              Become the Keyboard Master
            </p>
            <InputBar
              words={words}
              wordsPerMin={wordsPerMin}
              setWordsPerMin={setWordsPerMin}
              charsPerMin={charsPerMin}
              setCharsPerMin={setCharsPerMin}
              totalNumberOfWordsTyped={totalNumberOfWordsTyped}
              setTotalNumberOfWordsTyped={setTotalNumberOfWordsTyped}
              startTimer={startTimer}
              setStartTimer={setStartTimer}
              resetInput={resetInput}
              setResetInput={setResetInput}
              displayPopup={displayPopup}
            />
            <div className="flex m-8">
              <ScoreBox title="words/min">{wordsPerMin}</ScoreBox>
              <ScoreBox title="chars/min">{charsPerMin}</ScoreBox>
              <ScoreBox title="% accuracy">{accuracy}</ScoreBox>
              <CountDownTimer
                startTimer={startTimer}
                setStartTimer={setStartTimer}
                setDisplayPopup={setDisplayPopup}
                internalClock={internalClock}
                setInternalClock={setInternalClock}
                resetTimer={resetTimer}
                setResetTimer={setResetTimer}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
