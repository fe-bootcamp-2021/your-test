// eslint-disable-next-line camelcase
// import { v4 as uuid_v4 } from "uuid";
import Input from "./Input";

export default function TestPaperQuestions({ allQuestions }) {
  console.log(allQuestions);

  return allQuestions.map((obj, i) => {
    return (
      <>
        <hr />
        <p className="p-2 font-semibold">
          <span>{i + 1}. </span>
          {obj.question}
        </p>

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
              <label htmlFor={i} className="block ml-6">
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
      </>
    );
  });
}
