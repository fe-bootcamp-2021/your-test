/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import DeleteIcon from "./icons/DeleteIcon";

export default function RadioQuestion({ setAnswerSection, answerSection }) {
  useEffect(() => {
    if (!answerSection.answer.length) {
      setAnswerSection((prevState) => {
        return {
          ...prevState,
          answer: [""],
        };
      });
    }
  }, []);

  const addAnswer = () => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        answer: [...answerSection.answer, ""],
      };
    });
  };

  const handleDelete = (i) => (e) => {
    e.stopPropagation();
    answerSection.answer.splice(i, 1);
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        answer: answerSection.answer,
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
          <div
            key={Number(i)}
            className="relative h-12 flex justify-start items-center"
          >
            <Input
              name="asdd"
              value={e}
              type="radio"
              checked={e === answerSection.correctAnswer}
              onChange={handleCorrectAnswer}
            />
            <Input
              type="text"
              value={e}
              onChange={handleChange(i)}
              style={{ width: "100%" }}
            />
            {answerSection.answer.length > 1 && (
              <DeleteIcon onClick={handleDelete(i)} />
            )}
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
