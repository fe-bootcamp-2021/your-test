import { useState, useEffect } from "react";

import { getCurrentResults, getResults } from "../services/results.services";
import Loader from "./Loader";
import Input from "./Input";
import Button from "./Button";

export default function Results({ testId, testInfo }) {
  const [currentResults, setCurrentResults] = useState([
    {
      answer: ["fvsdzgrtg", "vdgrt"],
      correctAnswer: ["vdgrt"],
      point: 0,
      question: "vsgrd",
      questionId: "-MjWkN5Qyow52S0inXFZ",
      selected: ["fvsdzgrtg"],
      type: "checkbox",
    },
    {
      answer: [],
      correctAnswer: [],
      point: 0,
      question: "vsgrd",
      questionId: "-MjWkN5Qyow52S0inXFZ",
      selected: "fvsdzgrtg",
      type: "text",
    },
    {
      answer: ["fvsdzgrtg", "vdgrt"],
      correctAnswer: "vdgrt",
      point: 5,
      question: "vsgrd",
      questionId: "-MjWkN5Qyow52S0inXFZ",
      selected: "vdgrt",
      type: "radio",
    },
  ]);
  const [results, setResults] = useState(false);

  useEffect(() => {
    getResults({ testId }).then((res) => {
      setResults(res);
      console.log(res);
    });
  }, [testId]);

  const handleCurrentResults = (resultId) => {
    // alert(resultId);
    getCurrentResults(resultId).then((res) => {
      setCurrentResults(res);
      console.log(res);
    });
  };

  if (!results) {
    return <Loader />;
  }
  return (
    <div
      className="my-3 min-h-screen border-solid border-2 border-gray-200 shadow-xl flex flex-col p-4"
      style={{ minHeight: "95%" }}
    >
      <h1 className="text-4xl">{testInfo.testTitle}</h1>
      <p className="text-lg">{testInfo.testDescription}</p>

      {currentResults ? (
        <div>
          <Button
            buttonName="Back"
            color="red"
            onClick={() => {
              setCurrentResults(false);
            }}
          />
          {currentResults.map((obj, i) => {
            return (
              <div>
                <hr />
                <div className="p-2 flex justify-between">
                  <p className="font-semibold">
                    <span>{i + 1}. </span>
                    {obj.question}
                  </p>
                  {obj.point}
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
                      <label htmlFor={i} className="block ml-6">
                        <Input
                          disabled
                          name={i}
                          checked={
                            obj.type === "radio"
                              ? el === obj.correctAnswer
                              : obj.correctAnswer
                              ? obj.correctAnswer.find((a) => a === el)
                              : false
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
          })}
        </div>
      ) : (
        results.map((e) => {
          return (
            <div
              className="cursor-pointer border-2 border-gray-200 p-2 m-2 flex justify-between"
              key={e.resultId}
              onClick={() => {
                handleCurrentResults(e.resultId);
              }}
              role="presentation"
            >
              <span>{e.email}</span>
              <span>{e.date}</span>
            </div>
          );
        })
      )}
    </div>
  );
}
