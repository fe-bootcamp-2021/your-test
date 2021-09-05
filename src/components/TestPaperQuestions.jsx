// eslint-disable-next-line camelcase
import { v4 as uuid_v4 } from "uuid";
import Input from "./Input";

export default function TestPaperQuestions({ allQuestions }) {
  console.log(allQuestions);
  return (
    // <ul className="w-full font-bold list-outside list-decimal">
    //   {allQuestions.map((question, index) => {
    //     return (
    //       <li key={uuid_v4()}>
    //         <span>{question.question}</span>
    //         <ul className="list-inside list-decimal">
    //           {question.type === "checkbox" || question.type === "radio"
    //             ? question.answer.map((answer) => {
    //                 return (
    //                   <li key={uuid_v4()}>
    //                     {" "}
    //                     <Input type={question.type} disabled /> {answer}
    //                   </li>
    //                 );
    //               })
    //             : null}
    //         </ul>
    //       </li>
    //     );
    //   })}
    // </ul>

    allQuestions.map((obj, i) => {
      return (
        <>
          <hr />
          <p className="p-2 font-semibold">
            <span>{i + 1}. </span>
            {obj.question}
          </p>

          {obj.type === "text" ? (
            <Input
              name={uuid_v4()}
              disabled
              placeholder="Enter text"
              type={obj.type}
              value={obj.selected}
            />
          ) : (
            obj.answer.map((el) => {
              // let correct =
              return (
                <label htmlFor={uuid_v4()} className="block ml-6">
                  <Input
                    disabled
                    name={uuid_v4()}
                    // checked={correct}
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
    })
  );
}
