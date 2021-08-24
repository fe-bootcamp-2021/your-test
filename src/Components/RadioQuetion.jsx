import React from "react";
import Button from "./Button";
import Input from "./Input";

export default function RadioQuetion({ setAnswerSection, answerSection }) {
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

  const handlePoint = (val) => (e) => {
    console.log(val);
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        point: e.target.value,
      };
    });
  };

  return (
    <>
      {answerSection.answer.map((e, i) => {
        return (
          <div>
            <Input name="asdd" value={e} type="radio" />
            <Input type="text" value={e} onChange={handleChange(i)} />
          </div>
        );
      })}
      <Button buttonName="Add" onClick={addAnswer} />
      <span>Point</span>
      <select value={answerSection.point} onChange={handlePoint("point")}>
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
}
