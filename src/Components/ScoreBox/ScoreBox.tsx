import { FunctionComponent } from "react";

interface ScoreBoxProps {
  title: string;
}

export const ScoreBox: FunctionComponent<ScoreBoxProps> = ({
  children,
  title,
}) => {
  return (
    <div className="flex flex-col items-center mr-8">
      <div className="rounded-lg bg-white h-24 w-24 flex items-center justify-center font-bold text-4xl">
        {children}
      </div>
      <div className="mt-2 font-light">{title}</div>
    </div>
  );
};
