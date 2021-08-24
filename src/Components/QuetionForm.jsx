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
    answer: [],
    correctAnswer: [],
    point: 0,
  });

  const handleSelect = ({ target }) => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        type: target.value,
        point: target.value === "text" ? 0 : 1,
      };
    });
  };

  const handleCreateQuetion = () => {
    console.log({ answerSection });
  };

  const handlePoint = ({ target }) => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        point: target.value,
      };
    });
  };

  return (
    <div className=" top-1/3 w-screen flex flex-col justify-center items-center">
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

        {answerSection.type === "text" ? (
          <Input placeholder="Enter your text" disabled type="text" />
        ) : (
          <>
            <RadioQuetion
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
