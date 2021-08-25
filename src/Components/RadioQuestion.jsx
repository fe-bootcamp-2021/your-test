import React from "react";
import Button from "./Button";
import Input from "./Input";

export default function RadioQuestion({ setAnswerSection, answerSection }) {
  const addAnswer = () => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        answer: [...answerSection.answer, ""],
      };
    });
  };

  const handleChange = (i) => (e) => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        answer: answerSection.answer.map((el, index) => {
          return i === index ? e.target.value : el;
        }),
      };
    });
  };

  return (
    <>
      {answerSection.answer.map((e, i) => {
        console.log(e);
        return (
          <div>
            <Input name="asdd" value={e} type="radio" />
            <Input type="text" value={e} onChange={handleChange(i)} />
          </div>
        );
      })}
      <Button buttonName="Add" onClick={addAnswer} />
    </>
  );
}
