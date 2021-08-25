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

  const handleDelete = (val) => (e) => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        answer: answerSection.answer.filter((el) => {
          return el !== val;
        }),
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

  // const handlePoint = ({ target }) => {
  //   setAnswerSection((prevState) => {
  //     return {
  //       ...prevState,
  //       point: target.value,
  //     };
  //   });
  // };

  const handleCorrectAnswer = ({ target }) => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        correctAnswer: target.value,
      };
    });
  };

  return (
    <>
      {answerSection.answer.map((e, i) => {
        return (
          <div>
            <Input
              name="asdd"
              value={e}
              type="radio"
              onChange={handleCorrectAnswer}
            />
            <Input type="text" value={e} onChange={handleChange(i)} />
            <Button buttonName="X" onClick={handleDelete(e)} />
          </div>
        );
      })}
      <Button buttonName="Add" onClick={addAnswer} />
      {/* <span>Point</span>
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
      </select> */}
    </>
  );
}
