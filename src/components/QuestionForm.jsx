import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Button from "./Button";
import Input from "./Input";
import RadioQuestion from "./RadioQuestion";
import { addQuestions, getTestQuestions } from "../services/question.services";
import SelectQuestion from "./SelectQuestion";

const questionSection = classNames();

export default function QuestionForm({
  closeQuestionForm,
  setAllQuestions,
  testId,
}) {
  const [answerSection, setAnswerSection] = useState({
    question: "",
    type: "text",
    answer: [],
    correctAnswer: [],
    point: 0,
  });

  const handleSelect = ({ target }) => {
    setAnswerSection((prevState) => ({
      ...prevState,
      type: target.value,
      point: target.value === "text" ? 0 : 1,
    }));
  };

  const handleCreateQuestion = () => {
    console.log({ answerSection });
    addQuestions({
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
        console.log("ekela");
      });
  };

  const handlePoint = ({ target }) => {
    setAnswerSection((prevState) => ({
      ...prevState,
      point: target.value,
    }));
  };

  const questionType = (type) => {
    console.log(type);
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
            <select value={answerSection.point} onChange={handlePoint}>
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
            <select value={answerSection.point} onChange={handlePoint}>
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
    <div className="absolute top-1/3 w-1/2 flex flex-col justify-center items-center">
      <div className="w-1/2 heading text-center font-bold text-2xl m-5 text-gray-800 flex justify-center items-center ">
        Create question
      </div>
      <div className="w-1/2 editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-gray-200">
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

        <select value={answerSection.type} onChange={handleSelect}>
          <option value="text">Text</option>
          <option value="radio">One of the list</option>
          <option value="checkbox">Several from the list</option>
          <option value="list">Drop-down list</option>
        </select>

        {/* {answerSection.type === "text" ? (
          <Input placeholder="Enter your text" disabled type="text" />
        ) : (
          <>
            <RadioQuestion
              setAnswerSection={setAnswerSection}
              answerSection={answerSection}
            />
            <span>Point</span>
            <select value={answerSection.point} onChange={handlePoint}>
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
        )} */}

        {questionType(answerSection.type)}

        <div className="buttons flex">
          <Button
            buttonName="Cancel"
            color="red"
            onClick={() => {
              closeQuestionForm(false);
            }}
          />
          <Button
            buttonName="Create"
            color="green"
            onClick={handleCreateQuestion}
          />
        </div>
      </div>
    </div>
  );
}
