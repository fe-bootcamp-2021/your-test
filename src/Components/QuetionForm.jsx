import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Button from "./Button";
import Input from "./Input";
import RadioQuetion from "./RadioQuetion";

const quetionSection = classNames();

export default function QuetionForm() {
  const [answerSection, setAnswerSection] = useState({
    quetion: "",
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

  const handleCreateQuetion = () => {
    console.log({ answerSection });
  };

  return (
    <div className="fixed top-1/3 w-screen flex flex-col justify-center items-center">
      <div className="w-1/2 heading text-center font-bold text-2xl m-5 text-gray-800 flex justify-center items-center ">
        Create quetion
      </div>
      <div className="w-1/2 editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-gray-200">
        <Input
          placeholder="Quetion"
          onChange={({ target }) => {
            setAnswerSection((prevState) => {
              return { ...prevState, quetion: target.value };
            });
          }}
          value={answerSection.quetion}
          type="text"
        />

        <select value={answerSection.type} onChange={handleSelect}>
          <option value="text">Text</option>
          <option value="radio">One of the list</option>
          <option value="checkbox">Several from the list</option>
          <option value="list">Drop-down list</option>
        </select>

        {answerSection.type === "radio" || answerSection.type === "checkbox" ? (
          <RadioQuetion
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
            onClick={handleCreateQuetion}
          />
        </div>
      </div>
    </div>
  );
}
