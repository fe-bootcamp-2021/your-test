/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import PlusIcon from "./icons/PlusIcon";
import CopyLinkIcon from "./icons/CopyLinkIcon";
import QuestionForm from "./QuestionForm";
import TestPaperQuestions from "./TestPaperQuestions";
import { getTestQuestions } from "../services/question.services";
import { testsPageRoute } from "../constants/routes";
import Popup from "./Popup";

export default function TestPaper({ testId, testInfo }) {
  const [isQuestionForm, setIsQuestionForm] = useState(false);
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
      {isQuestionForm ? (
        <QuestionForm
          closeQuestionForm={setIsQuestionForm}
          testId={testId}
          setAllQuestions={setAllQuestions}
          setIsQuestionAdded={setIsQuestionAdded}
        />
      ) : (
        <div
          className="w-1/2 border-solid border-2 border-gray-200 shadow-xl flex items-center flex-col p-4"
          style={{ minHeight: "95%" }}
        >
          <h1 className="text-4xl">{testInfo.testTitle}</h1>
          <p className="text-lg">{testInfo.testDescription}</p>
          <div className="w-full flex justify-between">
            <Button
              buttonName={<PlusIcon />}
              color="blue"
              style={{
                width: "12px",
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
          <div className="w-full mt-10">
            {allQuestions.length > 0 && (
              <TestPaperQuestions
                allQuestions={allQuestions}
                testId={testId}
                setIsQuestionChanged={setIsQuestionChanged}
                setIsQuestionAdded={setIsQuestionAdded}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
