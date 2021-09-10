/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuid_v4 } from "uuid";
import { Formik, Form } from "formik";
import { emailScheme } from "../validationSchemes/emailScheme";
import { getCreatedTest } from "../services/test.services";
import { getTestQuestions } from "../services/question.services";
import { errorPageRoute } from "../constants/routes";

import Loader from "./Loader";
import Button from "./Button";
import Input from "./Input";
import Popup from "./Popup";
import TextField from "./TextField";

export default function TestingForm() {
  const [testQuestions, setTestQuestions] = useState([]);
  const [titleDec, setTitleDec] = useState({});
  const [userEmail, setUserEmail] = useState("");

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
        throw setShowPopup({
          isPopup: true,
          massage: "Please write all tasks",
          isError: true,
        });
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

  function handleEmailSubmit(formData, resetForm) {
    setUserEmail(formData.email);
    resetForm();
  }

  return (
    <>
      {Object.keys(titleDec).length > 0 && testQuestions.length > 0 ? (
        <>
          {userEmail === "" ? (
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
              <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                  <div className="max-w-md mx-auto">
                    <div>
                      <h1 className="text-2xl font-semibold">
                        Write your Email to start test .
                      </h1>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <Formik
                          initialValues={{
                            email: "",
                          }}
                          validationSchema={emailScheme}
                          onSubmit={(formData, { resetForm }) => {
                            handleEmailSubmit(formData, resetForm);
                          }}
                        >
                          <Form className="w-full">
                            <div className="relative">
                              <TextField
                                labelText="Email"
                                name="email"
                                type="email"
                                // className="w-1/2"
                              />
                            </div>
                            <div className="relative flex items-center justify-center">
                              <Button
                                type="submit"
                                className="mt-10 w-64 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                buttonName="Submit"
                              />
                            </div>
                          </Form>
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl m-auto border-solid border-2 border-gray-200 shadow-xl flex flex-col p-4">
              <Popup
                message={showPopup.massage}
                isError={showPopup.isError}
                isPopup={showPopup.isPopup}
                showPopup={setShowPopup}
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
                      <div key={i}>
                        <hr />
                        <p className="p-2 font-semibold">
                          <span>{i + 1}. </span>
                          {obj.question}
                        </p>

                        {obj.type === "text" ? (
                          <div>
                            <Input
                              name={i}
                              type={obj.type}
                              value={obj.selected}
                              onChange={handleChange(i)}
                            />
                          </div>
                        ) : (
                          obj.answer.map((el, index) => {
                            return (
                              <div key={uuid_v4()}>
                                <label htmlFor={i} className="block ml-6">
                                  <Input
                                    name={i}
                                    type={obj.type}
                                    value={el}
                                    id={i}
                                    onChange={handleChange(i)}
                                  />
                                  {el}
                                </label>
                              </div>
                            );
                          })
                        )}
                      </div>
                    );
                  })
                : null}
              <Button buttonName="Submit" color="blue" onClick={handleSubmit} />
            </div>
          )}{" "}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
