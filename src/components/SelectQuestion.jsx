import React from "react";
import Button from "./Button";
import Input from "./Input";

export default function SelectQuestion({ setAnswerSection, answerSection }) {
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

  const handleCheck = (selected = [], { checked, value }) => {
    console.log(selected);
    let res = [];
    if (checked) {
      res = [...selected, value];
    } else
      res = selected.filter((el) => {
        return el !== value;
      });
    return res;
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
        selected: handleCheck(answerSection.selected, target),
      };
    });
  };

  return (
    <div className="mt-5 mb-5">
      {answerSection.answer.map((e, i) => {
        return (
          <div key={Number(i)}>
            <Input
              name="asdd"
              value={e}
              type="checkbox"
              onChange={handleCorrectAnswer}
            />
            <Input type="text" value={e} onChange={handleChange(i)} />
            <Button buttonName="X" color="red" onClick={handleDelete(e)} />
          </div>
        );
      })}
      <Button buttonName="Add" color="blue" onClick={addAnswer} />
    </div>
  );
}
