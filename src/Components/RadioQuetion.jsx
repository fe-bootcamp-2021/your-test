import React, { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";

export default function RadioQuetion() {
  const [answer, setAnswer] = useState(["asdd", "asdd", "assdf"]);

  const addAnswer = () => {
    setAnswer((state) => {
      return [...state, ""];
    });
  };

  const handleChange = (e) => (i) => {
    setAnswer((state) => {
      state.map((el, index) => {
        return i === index ? e.target.value : el;
      });
    });
  };

  return (
    <>
      {answer.map((e, i) => {
        console.log(e);
        return (
          <div>
            <Input name="asdd" value={e} type="radio" />
            <Input type="text" value={e} onChange={handleChange(i)} />
          </div>
        );
      })}
      <Button buttonName="Add" onClick={addAnswer} />
    </>
  );
}
