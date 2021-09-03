/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Button from "./Button";
import PlusIcon from "./icons/PlusIcon";
import QuestionForm from "./QuestionForm";
import TestPaperQuestions from "./TestPaperQuestions";
import { getTestQuestions } from "../services/question.services";

export default function TestPaper({ testId, testInfo }) {
  const [isQuestionForm, setIsQuestionForm] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    getTestQuestions({ testId }).then((res) => {
      console.log(res);
      setAllQuestions(res);
    });
    setIsQuestionForm(false);
  }, [testId]);

  return (
    <>
      {isQuestionForm && (
        <QuestionForm
          closeQuestionForm={setIsQuestionForm}
          testId={testId}
          setAllQuestions={setAllQuestions}
        />
      )}
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
        <div className="w-full mt-10">
          {allQuestions.length > 0 && (
            <TestPaperQuestions allQuestions={allQuestions} />
          )}
        </div>
      </div>
    </>
  );
}
