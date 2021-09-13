// eslint-disable-next-line camelcase
import { v4 as uuid_v4 } from "uuid";
import { useState } from "react";
import EditIcon from "./icons/EditIcon";
import Input from "./Input";
import QuestionForm from "./QuestionForm";

export default function TestPaperQuestions({
  allQuestions,
  testId,
  setIsQuestionChanged,
  setIsQuestionAdded,
}) {
  const [isQuestionForm, setIsQuestionForm] = useState(false);
  return isQuestionForm ? (
    <QuestionForm
      changeQuestion={isQuestionForm}
      closeQuestionForm={setIsQuestionForm}
      testId={testId}
      setIsQuestionChanged={setIsQuestionChanged}
      setIsQuestionAdded={setIsQuestionAdded}
    />
  ) : (
    allQuestions.map((obj, i) => {
      return (
        <div key={uuid_v4()}>
          <hr />
          <div className="p-2 flex justify-between">
            <p className="font-semibold">
              <span>{i + 1}. </span>
              {obj.question}
            </p>
            <EditIcon
              onClick={() => {
                setIsQuestionForm(obj);
              }}
            />
          </div>

          {obj.type === "text" ? (
            <Input
              name={i}
              disabled
              placeholder="Enter text"
              type={obj.type}
              value={obj.selected}
            />
          ) : (
            obj.answer.map((el) => {
              return (
                <label htmlFor={i} className="block ml-6" key={uuid_v4()}>
                  <Input
                    disabled
                    name={i}
                    checked={
                      obj.type === "radio"
                        ? el === obj.correctAnswer
                        : obj.correctAnswer.find((a) => a === el)
                    }
                    type={obj.type}
                    value={el}
                  />
                  {el}
                </label>
              );
            })
          )}
        </div>
      );
    })
  );
}
