import React, { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import Popup from "./Popup";

const data = [
  {
    question: "4 + 3 = X",
    type: "radio",
    correctAnswer: ["7"],
    answer: [5, 9, 7],
    point: 3,
  },
  {
    question: "10 - 5 = X",
    point: 3,
    type: "radio",
    answer: [5, 9, 7],
    correctAnswer: ["5"],
  },
  {
    question: "100 + 3 = X",
    type: "checkbox",
    correctAnswer: ["103", "undefined", "arm"],
    answer: ["arm", "103", "undefined", "95"],
    point: 3,
    selected: [],
  },
  {
    question: "10 - 50 = X",
    point: 3,
    type: "text",
    answer: [50, 9, 7],
    correctAnswer: ["50"],
  },
];

export default function TestingForm() {
  const [state, setState] = useState(data);
  const [showPopup, setShowPopup] = useState({
    isPopup: false,
    massage: "",
    isError: false,
  });

  // useEffect(() => {
  //   if (showPopup.isPopup) {
  //     const timer = setTimeout(() => {
  //       setShowPopup((prevState) => {
  //         return { ...prevState, isPopup: false };
  //       });
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [showPopup]);

  const handleSubmit = () => {
    state.forEach((el) => {
      if (!el.selected || el.selected === []) {
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
    console.log(state);
  };

  const handleCheck = (selected, { checked, value }) => {
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
      setState((prevState) => {
        console.log(target.checked);
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
    <div className="max-w-3xl m-auto border-solid border-2 border-gray-200 shadow-xl flex flex-col p-4">
      <Popup
        message={showPopup.massage}
        isError={showPopup.isError}
        isPopup={showPopup.isPopup}
      />
      <h1 className="text-4xl">Test form example</h1>
      <p className="text-lg mb-4">Answer the question</p>
      {state.map((obj, i) => {
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
                      onChange={handleChange(i)}
                    />
                    {el}
                  </label>
                );
              })
            )}
          </>
        );
      })}
      <Button buttonName="Submit" color="blue" onClick={handleSubmit} />
    </div>
  );
}
