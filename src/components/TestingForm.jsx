import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const data = [
  {
    question: "4 + 3 = X",
    type: "radio",
    correctAnswer: "7",
    answer: [5, 9, 7],
    point: 3,
  },
  {
    question: "10 - 5 = X",
    point: 3,
    type: "radio",
    answer: [5, 9, 7],
    correctAnswer: "5",
  },
  {
    question: "100 + 3 = X",
    type: "checkbox",
    correctAnswer: "103",
    answer: [8, 103, 7, 95],
    point: 3,
  },
  {
    question: "10 - 50 = X",
    point: 3,
    type: "text",
    answer: [50, 9, 7],
    correctAnswer: "50",
  },
];

export default function TestingForm() {
  const [state, setState] = useState(data);

  const handleSubmit = () => {
    state.forEach((el) => {
      if (el.correctAnswer !== el.selected) {
        el.point = 0;
      }
    });
    console.log(state);
  };

  const handleChange = (i) => (e) => {
    setState((prevState) => {
      return prevState.map((item, ind) => {
        return i === ind ? { ...item, selected: e.target.value } : item;
      });
    });
  };

  return (
    <div className="max-w-3xl m-auto border-solid border-2 border-gray-200 shadow-xl flex flex-col p-4">
      <h1 className="text-4xl">Test form example</h1>
      <p className="text-lg mb-4">Answer the question</p>
      {state.map((obj, i) => {
        return (
          <>
            <hr />
            <p className="p-2 font-semibold">
              <span>{i + 1}. </span>
              {obj.question}
            </p>

            {obj.type === "text" ? (
              <Input
                name={i}
                type={obj.type}
                value={obj.selected}
                onChange={handleChange(i)}
              />
            ) : (
              obj.answer.map((el) => {
                return (
                  <label htmlFor={i} className=" ml-6">
                    <Input
                      name={i}
                      type={obj.type}
                      value={el}
                      onChange={handleChange(i)}
                    />
                    {el}
                  </label>
                );
              })
            )}
          </>
        );
      })}
      <Button buttonName="Submit" color="blue" onClick={handleSubmit} />
    </div>
  );
}
