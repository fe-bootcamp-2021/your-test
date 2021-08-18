import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Button from "./Button";
import Input from "./Input";

const quetionSection = classNames();

export default function QuetionForm() {
  const [quetion, setQuetion] = useState("");
  const [type, setType] = useState("");
  const [answerSection, setAnswerSection] = useState([]);

  const handleSelect = ({ target }) => {
    console.log(target.value);
    setType(target.value);
  };

  const handleAddAnswerSection = (val) => (e) => {
    e.stopPropagation();
    setAnswerSection(
        console.log(val)
      answerSection.push(
        <div>
          <Input
            // onChange={(e) => {
            //   setQuetion(e.target.value);
            // }}
            name="asdd"
            value="hi"
            type={val}
          />
          {/* <label htmlFor="asdd" >Email</label> */}
        </div>
      )
    );
  };

  return (
    <div className="fixed top-1/3 w-screen flex flex-col justify-center items-center">
      <div className="w-1/2 heading text-center font-bold text-2xl m-5 text-gray-800 flex justify-center items-center ">
        Create quetion
      </div>
      <div className="w-1/2 editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-gray-200">
        <Input
          placeholder="Quetion"
          onChange={(e) => {
            setQuetion(e.target.value);
          }}
          value={quetion}
          type="text"
        />

        <select value={type} onChange={handleSelect}>
          <option value="text">Text</option>
          <option value="radio">One of the list</option>
          <option value="checkbox">Several from the list</option>
          <option value="list">Drop-down list</option>
        </select>

        {type === "radio" || type === "checkbox" ? (
          <>
            {answerSection}
            <Button buttonName="Add" onClick={handleAddAnswerSection(type)} />
          </>
        ) : (
          <Input
            placeholder="Quetion"
            // onChange={(e) => {
            //   setQuetion(e.target.value);
            // }}
            type="text"
          />
        )}

        <div className="buttons flex">
          <Button
            value="Cancel"
            // onClick={}
          />
          <Button
            value="Create"
            // onClick={}
          />
        </div>
      </div>
    </div>
  );
}
