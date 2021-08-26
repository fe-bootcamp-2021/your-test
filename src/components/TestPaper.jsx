import { useState } from "react";
import Button from "./Button";
import PlusIcon from "./icons/PlusIcon";
import QuestionForm from "./QuestionForm";

export default function TestPaper({ testId, testInfo }) {
  const [isQuestionForm, setIsQuestionForm] = useState(false);

  return (
    <>
      {isQuestionForm && <QuestionForm closeQuestionForm={setIsQuestionForm} />}
      <div
        className="w-1/2 border-solid border-2 border-gray-200 shadow-xl flex items-center flex-col p-4"
        style={{ minHeight: "95%" }}
      >
        <h1 className="text-4xl">{testInfo.testTitle}</h1>
        <p className="text-lg">{testInfo.testDescription}</p>
        <div className="w-full">
          <Button
            buttonName={<PlusIcon />}
            width="12"
            color="blue"
            style={{
              borderRadius: "100px",
              height: "3rem",
              padding: "0",
            }}
            onClick={() => {
              setIsQuestionForm(true);
            }}
          />
        </div>
      </div>
    </>
  );
}
