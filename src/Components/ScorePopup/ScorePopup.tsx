import { FunctionComponent } from "react";
import { X } from "react-feather";

interface ScorePopupProps {
  resetTest: () => void;
  wordsPerMin: number;
  charsPerMin: number;
  accuracy: number;
}

export const ScorePopup: FunctionComponent<ScorePopupProps> = ({
  resetTest,
  wordsPerMin,
  charsPerMin,
  accuracy,
}) => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-10 flex items-center justify-center">
      <div className="relative w-1/2 max-w-3xl h-96 bg-white rounded-lg z-20 flex flex-col items-center justify-center shadow-xl">
        <div
          className="absolute top-0 right-0 m-4 cursor-pointer"
          onClick={resetTest}
        >
          <X className="text-grey-600" />
        </div>
        <div className="flex flex-col mb-12">
          <div className="text-2xl mb-4">WOW! You typed:</div>
          <div className="text-md ml-16 mb-1">
            <span className="text-blue-500 font-bold text-3xl">
              {wordsPerMin}
            </span>{" "}
            words/min
          </div>
          <div className="text-md ml-16 mb-1">
            <span className="text-blue-500 font-bold text-3xl">
              {charsPerMin}
            </span>{" "}
            characters/min
          </div>
          <div className="text-md ml-16 mb-1">
            <span className="text-blue-500 font-bold text-3xl">{accuracy}</span>{" "}
            % accuracy
          </div>
        </div>
        <button
          className="bg-green-500 rounded py-2 px-4 text-white text-2xl shadow-md"
          onClick={resetTest}
        >
          Try again
        </button>
      </div>
      <div className="bg-black opacity-50 w-screen h-screen absolute" />
    </div>
  );
};
