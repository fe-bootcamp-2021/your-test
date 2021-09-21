import { useState, useEffect, createRef } from "react";
import Popup from "./Popup";
// import Pdf from "react-to-pdf";
import {
  getCurrentResults,
  getResults,
  editCurrentResults,
} from "../services/results.services";
import Loader from "./Loader";
import Input from "./Input";
import Button from "./Button";

const ref = createRef();

export default function Results({ testId, testInfo }) {
  const [currentResults, setCurrentResults] = useState(false);
  const [results, setResults] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState({
    isPopup: false,
    massage: "",
    isError: false,
    setTimer: 1000,
  });

  useEffect(() => {
    getResults({ testId }).then((res) => {
      setResults(res);
    });
  }, [testId]);

  const handleCurrentResults = (e) => {
    getCurrentResults({ resultId: e.resultId }).then((res) => {
      setCurrentUser(e);
      setCurrentResults(res);
    });
  };

  const handleChangePoint = (i) => (e) => {
    const newArr = [...currentResults];
    newArr[1][i].point = e.target.value;
    setCurrentResults(newArr);
  };

  if (!results) {
    return <Loader />;
  }
  return (
    <>
      {currentResults ? (
        <>
          <Popup
            message={showSavePopup.massage}
            isError={showSavePopup.isError}
            isPopup={showSavePopup.isPopup}
            showPopup={setShowSavePopup}
            setTimer={showSavePopup.setTimer}
          />
          <Button
            buttonName="Back"
            color="red"
            onClick={() => {
              setCurrentResults(false);
            }}
          />
          <div
            className="my-3 min-h-screen border-solid border-2 border-gray-200 shadow-xl flex flex-col p-4"
            style={{ minHeight: "95%" }}
            ref={ref}
          >
            <h1 className="text-4xl">{testInfo.testTitle}</h1>
            <p className="text-lg">{testInfo.testDescription}</p>
            <p className="text-lg">{currentUser.email}</p>

            {currentResults[1].map((obj, i) => {
              return (
                <div key={`main${i}`}>
                  <hr />
                  <div className="p-2 flex justify-between">
                    <p className="font-semibold">
                      <span>{i + 1}. </span>
                      {obj.question}
                    </p>
                    <select
                      value={obj.point}
                      onChange={handleChangePoint(i)}
                      className="bg-gray-100 border border-gray-300 p-1 outline-none shadow-lg"
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                  {obj.type === "text" ? (
                    <div className="flex justify-between">
                      <Input
                        name={i}
                        disabled
                        placeholder="Enter text"
                        type={obj.type}
                        value={obj.selected}
                      />
                    </div>
                  ) : (
                    obj.answer.map((el, index) => {
                      return (
                        <label
                          key={`label${index}`}
                          htmlFor={i}
                          className="block ml-6"
                        >
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
          <div className="flex ">
            <Button
              buttonName="save"
              color="blue"
              onClick={() => {
                editCurrentResults({
                  resultId: currentUser.resultId,
                  newResults: currentResults[1],
                }).then(() => {
                  setShowSavePopup({
                    isPopup: true,
                    massage: "Saved",
                    isError: false,
                    setTimer: 1000,
                  });
                });
              }}
            />
            <Button
              buttonName="Sent results"
              color="green"
              onClick={() => {
                // console.log("ste mail kuxxarki");
              }}
            />
          </div>
          {/* <Pdf
            targetRef={ref}
            filename={`${testInfo.testTitle}-results.pdf`}
            x={1}
            y={1}
            scale={1}
          >
            {({ toPdf }) => (
              <Button color="green" buttonName="Generate Pdf" onClick={toPdf} />
            )}
          </Pdf> */}
        </>
      ) : (
        <div
          className="my-3 min-h-screen border-solid border-2 border-gray-200 shadow-xl flex flex-col p-4"
          style={{ minHeight: "95%" }}
          ref={ref}
        >
          <h1 className="text-4xl">{testInfo.testTitle}</h1>
          {results.length ? (
            results.map((e) => {
              return (
                <div
                  className="cursor-pointer border-2 border-gray-200 p-2 m-2 flex justify-between"
                  key={e.resultId}
                  onClick={() => {
                    handleCurrentResults(e);
                  }}
                  role="presentation"
                >
                  <span>{e.email}</span>
                  <span>{e.date}</span>
                </div>
              );
            })
          ) : (
            <div className="m-2 mt-4 text-center">
              <p className="m-2">No one has passed this test</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
