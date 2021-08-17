import { useState } from "react";
import Button from "./Button/Button";
import TestPopup from "./TestPopup";

export default function AddNewTests() {
  const [isPopup, setIsPopup] = useState();
  const handleClick = () => {
    console.log("bob");
  };
  return (
    <div>
      <Button value="Add New Test" color="green" onClick={handleClick} />
    </div>
  );
}
