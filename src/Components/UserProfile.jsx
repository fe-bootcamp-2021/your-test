/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import TestPopup from "./TestPopup";

export default function UserProfile() {
  const { currentUser } = useAuth();
  const [isTestPopup, setIsTestPopup] = useState(false);
  const [isTestPaper, setIsTestPaper] = useState(false);

  const handleClick = () => {
    setIsTestPopup((prev) => !prev);
  };

  return (
    <div className="flex ">
      <div className="border-solid border-2 border-gray-100 w-2/12 h-screen shadow-xl">
        <Button buttonName="Add New Test" color="green" onClick={handleClick} />
        <div>{currentUser ? JSON.stringify(currentUser.email) : null}</div>
      </div>
      <div className="w-10/12 border-solid border-black flex items-center justify-center min-h-screen">
        {isTestPopup ? <TestPopup getTestPopup={setIsTestPopup} /> : null}
      </div>
    </div>
  );
}
