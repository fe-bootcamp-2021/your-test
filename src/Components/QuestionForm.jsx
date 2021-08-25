import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Button from "./Button";
import Input from "./Input";
import RadioQuestion from "./RadioQuestion";

const questionSection = classNames();

export default function QuestionForm() {
  const [answerSection, setAnswerSection] = useState({
    question: "",
    type: "text",
    answer: [1, 2],
    correctAnswer: "srgted",
  });

  const handleSelect = ({ target }) => {
    console.log(target.value);
    setAnswerSection((prevState) => {
      return { ...prevState, type: target.value };
    });
  };

  const handleCreateQuestion = () => {
    console.log({ answerSection });
  };

  return (
    <div className="fixed top-1/3 w-screen flex flex-col justify-center items-center">
      <div className="w-1/2 heading text-center font-bold text-2xl m-5 text-gray-800 flex justify-center items-center ">
        Create question
      </div>
      <div className="w-1/2 editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-gray-200">
        <Input
          placeholder="Question"
          onChange={({ target }) => {
            setAnswerSection((prevState) => {
              return { ...prevState, question: target.value };
            });
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

        {answerSection.type === "radio" || answerSection.type === "checkbox" ? (
          <RadioQuestion
            setAnswerSection={setAnswerSection}
            answerSection={answerSection}
          />
        ) : (
          <Input
            placeholder="Enter your text"
            // onChange={({ target }) => {
            //   handleAddAnswerSection(target.value);
            // }}
            type="text"
          />
        )}

        <div className="buttons flex">
          <Button
            buttonName="Cancel"
            // onClick={            }}
          />
          <Button
            buttonName="Create"
            color="red"
            onClick={handleCreateQuestion}
          />
        </div>
      </div>
    </div>
  );
}