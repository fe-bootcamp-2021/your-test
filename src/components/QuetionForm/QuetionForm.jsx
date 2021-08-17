import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Button from "../Button/Button";
import Input from "../Input/Input";

const quetionSection = classNames();

export default function QuetionForm() {
  const [quetion, setQuetion] = useState("");
  const [type, setType] = useState("");

  return (
    <div className="fixed top-1/3 w-screen flex flex-col justify-center items-center">
      <div className="w-1/2 heading text-center font-bold text-2xl m-5 text-gray-800 flex justify-center items-center ">
        Create quetion
      </div>
      <div className="w-1/2 editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-gray-200">
        <Input
          spellCheck="false"
          placeholder="Quetion"
          onChange={(e) => {
            setQuetion(e.target.value);
          }}
          value={quetion}
          type="text"
        />

        <select value="Choose type" onChange={setType(value)}>
          <option value="text">Text</option>
          <option value="radio">One of the list</option>
          <option value="checkbox">Several from the list</option>
          <option value="list">Drop-down list</option>
        </select>

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
