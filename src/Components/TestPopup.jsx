import { useState } from "react";
import Button from "./Button";

export default function TestPopup({ getTestPopup }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function closePopup() {
    getTestPopup((prev) => !prev);
  }

  function sendPopupInfo() {
    console.log(title);
    console.log(description);
    getTestPopup((prev) => !prev);
  }

  return (
    <>
      <div className="fixed w-screen flex flex-col justify-center items-center">
        <div className="w-1/2 heading text-center font-bold text-2xl m-5 text-gray-800 flex justify-center items-center ">
          Text Info
        </div>
        <div className="w-1/2 editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-gray-200">
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
          />
          <textarea
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
            spellCheck="false"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div className="buttons flex justify-end">
            <Button buttonName="Cancel" color="red" onClick={closePopup} />
            <Button buttonName="Create" color="blue" onClick={sendPopupInfo} />
          </div>
        </div>
      </div>
    </>
  );
}
