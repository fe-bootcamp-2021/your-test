import { useEffect } from "react";

import Button from "./Button";
import Input from "./Input";

export default function RadioQuestion({ setAnswerSection, answerSection }) {
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

  const handleCorrectAnswer = ({ target }) => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        correctAnswer: target.value,
      };
    });
  };

  const handleChange = (i) => (e) => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        answer: answerSection.answer.map((el, index) => {
          if (i === index) {
            if (answerSection.correctAnswer === el) {
              handleCorrectAnswer(e);
            }
            return e.target.value;
          }
          return el;
        }),
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
              type="radio"
              onChange={handleCorrectAnswer}
            />
            <Input type="text" value={e} onChange={handleChange(i)} />
            <Button buttonName="X" color="red" onClick={handleDelete(e)} />
          </div>
        );
      })}
      <Button
        buttonName="Add"
        disabled={!answerSection.answer[answerSection.answer.length - 1]}
        color="blue"
        onClick={addAnswer}
      />
    </div>
  );
}
