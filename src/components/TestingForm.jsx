/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuid_v4 } from "uuid";
import { getCreatedTest } from "../services/test.services";
import { getTestQuestions } from "../services/question.services";
import { errorPageRoute } from "../constants/routes";

import Loader from "./Loader";
import Button from "./Button";
import Input from "./Input";
import Popup from "./Popup";

export default function TestingForm() {
  const [testQuestions, setTestQuestions] = useState([]);
  const [titleDec, setTitleDec] = useState({});
  const historyHook = useHistory();

  const testId = useParams();

  const [showPopup, setShowPopup] = useState({
    isPopup: false,
    massage: "",
    isError: false,
  });

  useEffect(() => {
    getCreatedTest(testId).then((res) => {
      if (Object.keys(res).length > 0) {
        setTitleDec(res);
        getTestQuestions(testId).then((result) => {
          if (result.length > 0) {
            setTestQuestions(result);
          } else {
            historyHook.push(errorPageRoute);
          }
        });
      } else {
        historyHook.push(errorPageRoute);
      }
    });
  }, []);

  // useEffect(() => {
  //   console.log(titleDec);
  // }, [titleDec]);

  const handleSubmit = () => {
    testQuestions.forEach((el) => {
      if (!el.selected || !el.selected.length) {
        throw alert("Please write all tasks");
      } else if (el.type === "checkbox") {
        if (
          el.correctAnswer.sort().join(",") !== el.selected.sort().join(",")
        ) {
          el.point = 0;
        }
      } else if (el.correctAnswer !== el.selected) {
        el.point = 0;
      }
    });
    console.log(testQuestions);
  };

  const handleCheck = (selected = [], { checked, value }) => {
    let res = [];
    if (checked) {
      res = [...selected, value];
    } else
      res = selected.filter((el) => {
        return el !== value;
      });
    return res;
  };

  const handleChange =
    (i) =>
    ({ target }) => {
      setTestQuestions((prevState) => {
        return prevState.map((item, ind) => {
          if (i === ind) {
            if (target.type === "checkbox") {
              return {
                ...item,
                selected: handleCheck(item.selected, target),
              };
            }
            return { ...item, selected: target.value };
          }
          return item;
        });
      });
    };

  return (
    <>
      {Object.keys(titleDec).length > 0 && testQuestions.length > 0 ? (
        <div className="max-w-3xl m-auto border-solid border-2 border-gray-200 shadow-xl flex flex-col p-4">
          <Popup
            message={showPopup.massage}
            isError={showPopup.isError}
            isPopup={showPopup.isPopup}
          />
          <h1 className="text-4xl">
            {Object.keys(titleDec).length > 0 ? titleDec.testTitle : "null"}
          </h1>
          <p className="text-lg mb-4">
            {Object.keys(titleDec).length > 0
              ? titleDec.testDescription
              : "null"}
          </p>
          {testQuestions.length > 0
            ? testQuestions.map((obj, i) => {
                return (
                  <div key={uuid_v4()}>
                    <hr />
                    <p className="p-2 font-semibold">
                      <span>{i + 1}. </span>
                      {obj.question}
                    </p>

                    {obj.type === "text" ? (
                      <Input
                        name={i}
                        type={obj.type}
                        value={obj.selected}
                        onChange={handleChange(i)}
                      />
                    ) : (
                      obj.answer.map((el) => {
                        return (
                          <label htmlFor={i} className=" ml-6">
                            <Input
                              name={i}
                              type={obj.type}
                              value={el}
                              checked={
                                obj.type === "radio"
                                  ? el === obj.selected
                                  : obj.selected
                                  ? obj.selected.find((a) => a === el)
                                  : false
                              }
                              onChange={handleChange(i)}
                            />
                            {el}
                          </label>
                        );
                      })
                    )}
                  </div>
                );
              })
            : null}
          <Button buttonName="Submit" color="blue" onClick={handleSubmit} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
