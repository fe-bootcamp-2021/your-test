import { useEffect } from "react";

import Button from "./Button";
import Input from "./Input";

export default function SelectQuestion({ setAnswerSection, answerSection }) {
  useEffect(() => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        answer: [""],
      };
    });
  }, []);

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

  const handleCheck = (correctAnswer = [], { checked, value }) => {
    let res = [];
    if (checked) {
      res = [...correctAnswer, value];
    } else
      res = correctAnswer.filter((el) => {
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

  const handleCorrectAnswer = ({ target }) => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        correctAnswer: handleCheck(answerSection.correctAnswer, target),
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
      <Button
        buttonName="Add"
        color="blue"
        disabled={!answerSection.answer[answerSection.answer.length - 1]}
        onClick={addAnswer}
      />
    </div>
  );
}
