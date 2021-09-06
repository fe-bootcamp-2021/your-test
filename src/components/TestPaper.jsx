/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import PlusIcon from "./icons/PlusIcon";
import CopyLinkIcon from "./icons/CopyLinkIcon";
import QuestionForm from "./QuestionForm";
import TestPaperQuestions from "./TestPaperQuestions";
import { getTestQuestions } from "../services/question.services";
import { testsPageRoute, webPageRoute } from "../constants/routes";
import Popup from "./Popup";

export default function TestPaper({ testId, testInfo }) {
  const [isQuestionForm, setIsQuestionForm] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);

  const [showPCopyPopup, setShowCopyPopup] = useState({
    isPopup: false,
    massage: "",
    isError: false,
    setTimer: 1000,
  });

  useEffect(() => {
    getTestQuestions({ testId }).then((res) => {
      console.log(res);
      setAllQuestions(res);
    });
    setIsQuestionForm(false);
  }, [testId]);

  return (
    <>
      <Popup
        message={showPCopyPopup.massage}
        isError={showPCopyPopup.isError}
        isPopup={showPCopyPopup.isPopup}
        showPopup={setShowCopyPopup}
        setTimer={showPCopyPopup.setTimer}
      />
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
        <div className="w-full flex justify-between">
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
          <div className="flex">
            {allQuestions.length > 0 && (
              <Button
                buttonName={<CopyLinkIcon />}
                width="12"
                color="gray"
                style={{
                  borderRadius: "100px",
                  height: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
                onClick={() => {
                  if (
                    navigator.clipboard.writeText(
                      `${webPageRoute}${testsPageRoute}${testId}`
                    )
                  ) {
                    setShowCopyPopup({
                      isPopup: true,
                      massage: "Copied",
                      isError: false,
                      setTimer: 1000,
                    });
                  } else {
                    setShowCopyPopup({
                      isPopup: true,
                      massage: "Can not copy",
                      isError: true,
                      setTimer: 1000,
                    });
                  }
                }}
              />
            )}
          </div>
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
