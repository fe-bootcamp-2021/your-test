// eslint-disable-next-line camelcase
import { v4 as uuid_v4 } from "uuid";

export default function TestPaperQuestions({ allQuestions }) {
  console.log(allQuestions);
  return (
    <ul className="w-full font-bold list-outside list-decimal">
      {allQuestions.map((question, index) => {
        return (
          <li key={uuid_v4()}>
            <span>{question.question}</span>
            <ul className="list-inside list-decimal">
              {question.type === "checkbox" || question.type === "radio"
                ? question.answer.map((answer) => {
                    return (
                      <li key={uuid_v4()}>
                        {" "}
                        <input type={question.type} disabled /> {answer}
                      </li>
                    );
                  })
                : null}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
