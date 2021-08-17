import { useState } from "react";
import Button from "../Button/Button";
import SubmitButton from "../Button/SubmitButton";
import TestPopup from "../TestPopup";

export default function UserSection() {
  const [isTestPopup, setIsTestPopup] = useState(false);
  const [isTestPaper, setIsTestPaper] = useState(false);

  const handleClick = () => {
    setIsTestPopup((prev) => !prev);
  };

  return (
    <div className="flex ">
      <div className="border-solid border-2 border-gray-100 w-2/12 h-screen shadow-xl">
        <Button value="Add New Test" color="green" onClick={handleClick} />
      </div>
      <div className="w-10/12 border-solid border-black flex items-center justify-center min-h-screen">
        {isTestPopup ? <TestPopup getTestPopup={setIsTestPopup} /> : null}
      </div>
    </div>
  );
}
