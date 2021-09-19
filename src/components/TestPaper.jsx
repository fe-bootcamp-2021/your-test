/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Button from "./Button";
import Results from "./Results";
import PlusIcon from "./icons/PlusIcon";
import CopyLinkIcon from "./icons/CopyLinkIcon";
import QuestionForm from "./QuestionForm";
import TestPaperQuestions from "./TestPaperQuestions";
import { getTestQuestions } from "../services/question.services";
import { testsPageRoute } from "../constants/routes";
import Popup from "./Popup";

export default function TestPaper({ testId, testInfo }) {
  const [isQuestionForm, setIsQuestionForm] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [isQuestionChanged, setIsQuestionChanged] = useState(false);
  const [isQuestionAdded, setIsQuestionAdded] = useState(false);

  const [showCopyPopup, setShowCopyPopup] = useState({
    isPopup: false,
    massage: "",
    isError: false,
    setTimer: 1000,
  });

  useEffect(() => {
    getTestQuestions({ testId }).then((res) => {
      setAllQuestions(res);
    });
    setIsQuestionForm(false);
  }, [testId, isQuestionChanged, isQuestionAdded]);

  return (
    <>
      <Popup
        message={showCopyPopup.massage}
        isError={showCopyPopup.isError}
        isPopup={showCopyPopup.isPopup}
        showPopup={setShowCopyPopup}
        setTimer={showCopyPopup.setTimer}
      />

      <div className="m-auto">
        <Button
          buttonName={isResult ? "Test" : "Results"}
          color="blue"
          onClick={() => {
            setIsResult((prev) => !prev);
          }}
        />
        {isResult ? (
          <Results testId={testId} testInfo={testInfo} />
        ) : (
          <div className="my-3 min-h-screen border-solid border-2 border-gray-200 shadow-xl flex flex-col p-4">
            <h1 className="text-4xl">{testInfo.testTitle}</h1>
            <p className="text-lg">{testInfo.testDescription}</p>
            <div className="w-full flex justify-between">
              <Button
                buttonName={<PlusIcon />}
                color="blue"
                style={{
                  width: "50px",
                  borderRadius: "100px",
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
                    color="green"
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
                          `${window.location.origin}${testsPageRoute}${testId}`
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
            <div className="mt-10">
              {isQuestionForm ? (
                <QuestionForm
                  closeQuestionForm={setIsQuestionForm}
                  testId={testId}
                  setAllQuestions={setAllQuestions}
                  setIsQuestionAdded={setIsQuestionAdded}
                />
              ) : (
                allQuestions.length > 0 && (
                  <TestPaperQuestions
                    allQuestions={allQuestions}
                    testId={testId}
                    setIsQuestionChanged={setIsQuestionChanged}
                    setIsQuestionAdded={setIsQuestionAdded}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
