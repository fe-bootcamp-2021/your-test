import { useState } from "react";
import axios from "axios";
import Button from "./Button";
import Popup from "./Popup";
import { useAuth } from "../contexts/AuthContext";

export default function TestPopup({
  getTestPopup,
  setShowPopup,
  setIsAddSuccess,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { currentUser } = useAuth();
  const curentUserId = JSON.parse(JSON.stringify(currentUser.uid));

  function closePopup() {
    getTestPopup((prev) => !prev);
  }

  function sendTestInfo() {
    if (title !== "") {
      Promise.resolve({
        testTitle: title,
        testDescription: description,
        userId: curentUserId,
      }).then((sendableInfo) => {
        const sendToBase = axios
          .post(
            "https://get-forms-5e80d-default-rtdb.europe-west1.firebasedatabase.app/tests/.json",
            sendableInfo
          )
          .then(() => {
            getTestPopup((prev) => !prev);
          })
          .then(() => {
            setIsAddSuccess((prev) => !prev);
          });
      });

      return true;
    }
    setShowPopup({
      isPopup: true,
      massage: "Title field is empty",
      isError: true,
    });

    return false;
  }

  return (
    <>
      <div className="w-screen flex flex-col justify-center items-center">
        <div className="md:w-1/2 w-11/12 heading text-center font-bold text-2xl m-5 text-gray-800 flex justify-center items-center ">
          Create test
        </div>
        <div className="md:w-1/2 w-11/12 editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-gray-200">
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
            <Button
              buttonName="Cancel"
              color="red"
              width="1/4"
              onClick={closePopup}
            />
            <Button
              buttonName="Create"
              color="blue"
              width="1/4"
              onClick={sendTestInfo}
            />
          </div>
        </div>
      </div>
    </>
  );
}
