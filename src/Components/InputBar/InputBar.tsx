import randomWords from "random-words";
import { FunctionComponent, useEffect, useRef, useState } from "react";

interface InputBarProps {
  words: string[];
  wordsPerMin: number;
  setWordsPerMin: (wordsPerMin: number) => void;
  charsPerMin: number;
  setCharsPerMin: (charsPerMin: number) => void;
  totalNumberOfWordsTyped: number;
  setTotalNumberOfWordsTyped: (wordsTyped: number) => void;
  startTimer: boolean;
  setStartTimer: (startTimer: boolean) => void;
  resetInput: boolean;
  setResetInput: (resetInput: boolean) => void;
  displayPopup: boolean;
}

export const InputBar: FunctionComponent<InputBarProps> = ({
  words,
  wordsPerMin,
  setWordsPerMin,
  charsPerMin,
  setCharsPerMin,
  totalNumberOfWordsTyped,
  setTotalNumberOfWordsTyped,
  startTimer,
  setStartTimer,
  resetInput,
  setResetInput,
  displayPopup,
}) => {
  const caretRef = useRef<HTMLDivElement>(null);

  const caretFocus = () => {
    if (null !== caretRef.current) {
      caretRef.current.focus();
    }
  };

  const moveCursorToEnd = (el: any) => {
    if (el.innerText && document.createRange) {
      window.setTimeout(() => {
        let selection = document.getSelection();
        let range = document.createRange();

        range.setStart(el.childNodes[0], el.innerText.length);
        range.collapse(true);
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }, 1);
    }
  };

  const [wordsArray, setWordsArray] = useState([...words]);
  const [masterList, setMasterList] = useState([...words]);
  const [typedWord, setTypedWord] = useState("");
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState(wordsArray[0]);
  const [displayCurrentWord, setDisplayCurrentWord] = useState(currentWord);
  const clonedWordsArray = [...wordsArray];
  const WordsArrayFrom2ndWordsOnwards = clonedWordsArray.splice(1);
  const wordsToBeTyped = [displayCurrentWord, ...WordsArrayFrom2ndWordsOnwards];

  useEffect(() => {
    setCurrentWord(wordsArray[0]);
    setDisplayCurrentWord(wordsArray[0]);
  }, [wordsArray]);

  useEffect(() => {
    if (resetInput) {
      setWordsArray([...words]);
      setMasterList([...words]);
      setTypedWord("");
      setTypedWords([]);
      setResetInput(false);
      if (null !== caretRef.current) {
        caretRef.current.innerText = "";
      }
    }
  }, [
    resetInput,
    setResetInput,
    setWordsArray,
    setMasterList,
    setTypedWord,
    setTypedWords,
    words,
  ]);

  useEffect(() => {
    if (null !== caretRef.current && displayPopup) {
      caretRef.current.blur();
    }
  }, [displayPopup]);

  const typing = (event: any) => {
    if (!startTimer) {
      setStartTimer(true);
    }
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setTotalNumberOfWordsTyped(totalNumberOfWordsTyped + 1);
      if (typedWord) {
        setTypedWords([...typedWords, typedWord]);
        setTypedWord("");
        event.target.innerText = "";
        const generateRandomWord = randomWords(1) as string[];
        setWordsArray([...wordsArray.splice(1), ...generateRandomWord]);
        setMasterList([...masterList, ...generateRandomWord]);
        if (typedWord === currentWord) {
          setWordsPerMin(wordsPerMin + 1);
          setCharsPerMin(charsPerMin + typedWord.length);
        }
      }
    } else if (event.key === "Backspace") {
      const typingWordWithBackspaced = typedWord.slice(0, -1);
      const regex = new RegExp(`^${typingWordWithBackspaced}`, "i");
      const typingCheck = regex.test(currentWord);

      event.target.className = !typingCheck
        ? "focus:outline-none focus:shadow-none pl-1 w-0 line-through text-red-400"
        : "focus:outline-none focus:shadow-none pl-1 w-0";

      if (displayCurrentWord.length + typedWord.length <= currentWord.length) {
        setDisplayCurrentWord(currentWord.substring(typedWord.length - 1));
      }
      setTypedWord(typingWordWithBackspaced);
    } else if (listOfKeys.includes(event.key)) {
      const typingWord = `${typedWord}${event.key}`;
      const regex = new RegExp(`^${typingWord}`, "i");
      const typingCheck = regex.test(currentWord);
      event.target.className = !typingCheck
        ? "focus:outline-none focus:shadow-none pl-1 w-0 line-through text-red-400"
        : "focus:outline-none focus:shadow-none pl-1 w-0";

      setTypedWord(typingWord);
      if (event.key === displayCurrentWord[0]) {
        setDisplayCurrentWord(displayCurrentWord.substring(1));
      }
    }
  };

  const checkWord = (index: number): string => {
    return typedWords[index] === masterList[index]
      ? "text-green-300"
      : "text-yellow-400 line-through";
  };

  return (
    <div className="w-screen max-w-7xl flex justify-center my-24">
      <div
        className="bg-white rounded shadow-lg w-1/2 h-20 relative text-3xl flex items-center cursor-text inline-block"
        onClick={() => caretFocus()}
      >
        <div className="w-1/2 overflow-hidden">
          <div className="float-right whitespace-nowrap text-right flex font-serif text-gray-400">
            {typedWords.map((words: string, i: number) => (
              <span className={`mr-4 ${checkWord(i)}`} key={i}>
                {words}
              </span>
            ))}
            <div
              id="input-bar"
              onFocus={(e) => moveCursorToEnd(e.target)}
              ref={caretRef}
              className={`focus:outline-none focus:shadow-none pl-1 w-0`}
              style={{ caretColor: "black" }}
              contentEditable={!displayPopup}
              tabIndex={1}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              onKeyDown={typing}
            />
          </div>
        </div>
        <div className="w-1/2 outline-none overflow-hidden inline">
          {wordsToBeTyped.map((word: string, i: number) => {
            return (
              <span key={i} className="font-serif mr-4">
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const listOfKeys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "=",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  "'",
  '"',
  ",",
  "<",
  ".",
  ">",
  "/",
  "?",
];
