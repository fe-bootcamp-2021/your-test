import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function TestingForm() {
  const [state, setState] = useState({
    answer: "",
    correctAnswer: false,
    point: 0,
  });

  const obj = {
    question: "4 + 3 = X",
    point: 3,
    type: "radio",
    correctAnswer: 7,
    answer: [5, 9, 7],
  };

  const handleSubmit = () => {
    console.log(state);
  };

  const handleChange = (el) => (e) => {
    const correct = el === obj.correctAnswer;
    setState((prevState) => {
      return {
        answer: el,
        correctAnswer: correct,
        point: correct ? obj.point : 0,
      };
    });
  };

  return (
    <>
      <h1>Test form example</h1>
      <p>{obj.question}</p>
      {obj.answer.map((el) => {
        return (
          <>
            <label htmlFor="1">
              <Input name="1" type={obj.type} onChange={handleChange(el)} />
              {el}
            </label>
          </>
        );
      })}
      <Button buttonName="Submit" color="blue" onClick={handleSubmit} />
    </>
  );
}
