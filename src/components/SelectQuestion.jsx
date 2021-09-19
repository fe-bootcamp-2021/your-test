/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import DeleteIcon from "./icons/DeleteIcon";

export default function SelectQuestion({ setAnswerSection, answerSection }) {
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

  const handleCorrectAnswer = ({ target }) => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        correctAnswer: handleCheck(answerSection.correctAnswer, target),
      };
    });
  };

  const handleChange = (i) => (e) => {
    setAnswerSection((prevState) => {
      return {
        ...prevState,
        answer: answerSection.answer.map((el, index) => {
          if (i === index) {
            answerSection.correctAnswer.forEach((a, j) => {
              if (a === el) {
                answerSection.correctAnswer[j] = e.target.value;
              }
            });

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
              type="checkbox"
              checked={
                answerSection.correctAnswer
                  ? answerSection.correctAnswer.find((a) => a === e)
                  : false
              }
              onChange={handleCorrectAnswer}
            />
            <Input
              type="text"
              value={e}
              onChange={handleChange(i)}
              style={{ width: "100%" }}
            />
            {answerSection.answer.length > 1 && (
              <DeleteIcon onClick={handleDelete(e)} />
            )}
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
