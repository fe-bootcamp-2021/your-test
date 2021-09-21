import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Button from "./Button";
import Input from "./Input";
import RadioQuestion from "./RadioQuestion";
import {
  addQuestions,
  getTestQuestions,
  editQuestion,
} from "../services/question.services";
import SelectQuestion from "./SelectQuestion";
import Popup from "./Popup";
import hasDuplicates from "../helpers/arrayDuplicates";

// const questionSection = classNames();

export default function QuestionForm({
  changeQuestion,
  closeQuestionForm,
  setAllQuestions,
  testId,
  setIsQuestionChanged,
  setIsQuestionAdded,
}) {
  const [answerSection, setAnswerSection] = useState({
    question: "",
    type: "text",
    answer: [],
    correctAnswer: [],
    point: 0,
    questionId: "",
  });

  useEffect(() => {
    if (changeQuestion) {
      setAnswerSection({
        ...changeQuestion,
        answer: changeQuestion.type === "text" ? [] : changeQuestion.answer,
        correctAnswer:
          changeQuestion.type === "text" ? [] : changeQuestion.correctAnswer,
      });
    }
  }, [changeQuestion]);

  const [showPopup, setShowPopup] = useState({
    isPopup: false,
    massage: "",
    isError: false,
  });

  const handleSelect = ({ target }) => {
    setAnswerSection((prevState) => ({
      ...prevState,
      answer: target.value === "text" ? [] : answerSection.answer,
      type: target.value,
      point: target.value === "text" ? 0 : 1,
      correctAnswer: [],
    }));
  };

  const handleCreateQuestion = () => {
    if (!answerSection.question) {
      throw setShowPopup({
        isPopup: true,
        massage: "You didn't enter the question",
        isError: true,
      });
    }
    answerSection.answer.forEach((e) => {
      if (!e) {
        throw setShowPopup({
          isPopup: true,
          massage: "Please fill in the blank options",
          isError: true,
        });
      }
    });
    if (hasDuplicates(answerSection.answer)) {
      throw setShowPopup({
        isPopup: true,
        massage: "You have re-answers",
        isError: true,
      });
    }
    closeQuestionForm(false);

    changeQuestion
      ? editQuestion({
          answer: answerSection.answer,
          correctAnswer: answerSection.correctAnswer,
          point: Number(answerSection.point),
          question: answerSection.question,
          type: answerSection.type,
          questionId: answerSection.questionId,
          testId,
        }).then(() => {
          setIsQuestionChanged((prev) => !prev);
        })
      : addQuestions({
          answer: answerSection.answer,
          correctAnswer: answerSection.correctAnswer,
          point: Number(answerSection.point),
          question: answerSection.question,
          type: answerSection.type,
          testId,
        })
          .then(() => {
            setAllQuestions((prev) => {
              return [
                ...prev,
                {
                  answer: answerSection.answer,
                  correctAnswer: answerSection.correctAnswer,
                  point: Number(answerSection.point),
                  question: answerSection.question,
                  type: answerSection.type,
                },
              ];
            });
          })
          .then(() => {
            closeQuestionForm(false);
            setIsQuestionAdded();
          });
  };

  const handlePoint = ({ target }) => {
    setAnswerSection((prevState) => ({
      ...prevState,
      point: target.value,
    }));
  };

  const questionType = (type) => {
    switch (type) {
      case "text":
        return <Input placeholder="Enter your text" disabled type="text" />;
      case "radio":
        return (
          <>
            <RadioQuestion
              setAnswerSection={setAnswerSection}
              answerSection={answerSection}
            />
            <span>Point</span>
            <select
              value={answerSection.point}
              onChange={handlePoint}
              className="bg-gray-100 border border-gray-300 p-2 my-3 outline-none shadow-lg"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </>
        );
      case "checkbox":
        return (
          <>
            <SelectQuestion
              setAnswerSection={setAnswerSection}
              answerSection={answerSection}
            />
            <span>Point</span>
            <select
              value={answerSection.point}
              onChange={handlePoint}
              className="bg-gray-100 border border-gray-300 p-2 my-3 outline-none shadow-lg"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </>
        );
      default:
        break;
    }
  };

  return (
    <div className="absolute right-1 w-full flex flex-col justify-center items-center">
      <Popup
        message={showPopup.massage}
        isError={showPopup.isError}
        isPopup={showPopup.isPopup}
        showPopup={setShowPopup}
      />
      <div className="w-11/12 md:w-1/2 heading text-center font-bold text-2xl m-5 text-gray-800 flex justify-center items-center ">
        {changeQuestion ? "Edit Question" : "Create question"}
      </div>
      <div className="w-11/12 md:w-1/2 editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-gray-200">
        <Input
          placeholder="Question"
          onChange={({ target }) => {
            setAnswerSection((prevState) => ({
              ...prevState,
              question: target.value,
            }));
          }}
          value={answerSection.question}
          type="text"
        />

        <select
          value={answerSection.type}
          onChange={handleSelect}
          className="bg-gray-100 border border-gray-300 p-2 my-3 outline-none shadow-lg"
        >
          <option value="text">Text</option>
          <option value="radio">One of the list</option>
          <option value="checkbox">Several from the list</option>
        </select>

        {questionType(answerSection.type)}

        <div className="buttons flex mt-2">
          <Button
            buttonName="Cancel"
            color="red"
            onClick={() => {
              closeQuestionForm(false);
            }}
          />
          <Button
            buttonName={changeQuestion ? "Save" : "Create"}
            color="green"
            onClick={handleCreateQuestion}
          />
        </div>
      </div>
    </div>
  );
}
