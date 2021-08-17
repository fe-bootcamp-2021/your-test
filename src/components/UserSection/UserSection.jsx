import { useState } from "react";
import Button from "../Button/Button";
import TestPopup from "../TestPopup";

export default function UserSection() {
  const [isTestPopup, setIsTestPopup] = useState(false);
  const handleClick = () => {
    console.log(isTestPopup);
    setIsTestPopup((prev) => !prev);
  };

  return (
    <div className="flex ">
      {isTestPopup ? <TestPopup /> : null}
      <div className="border-solid border-2 border-gray-100 w-2/12 h-screen shadow-xl">
        <Button value="Add New Test" color="green" onClick={handleClick} />
      </div>
      <div className="w-10/12 border-solid border-black flex items-center justify-center min-h-screen">
        <div className="w-1/2 h-5/6 border-solid border-2 border-gray-100 shadow-xl flex items-center flex-col">
          <h4>Title</h4>
          <p>Description</p>
        </div>
      </div>
    </div>
  );
}
