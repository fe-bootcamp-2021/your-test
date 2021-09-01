/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import TestPopup from "./TestPopup";
import TestPaper from "./TestPaper";
import Popup from "./Popup";
import { getUserTests } from "../services/test.services";

export default function UserProfile() {
  const { currentUser } = useAuth();
  const [isAddSuccess, setIsAddSuccess] = useState();
  const [isTestPopup, setIsTestPopup] = useState(false);

  const [isTestPaper, setIsTestPaper] = useState(false);
  const [testPaperData, setTestPaperData] = useState({});

  const [currentUserTests, setCurrentUserTests] = useState({});
  const [messagePopup, setMessagePopup] = useState();

  const handleClick = () => {
    setIsTestPopup((prev) => !prev);
  };

  // get current user tests
  useEffect(() => {
    if (currentUser) {
      const currentUserUId = String(currentUser.uid);
      getUserTests({ userId: currentUserUId }).then((res) => {
        setCurrentUserTests((pre) => ({ ...pre, ...res }));
      });
    }
  }, [currentUser, isAddSuccess]);

  return (
    <div className="flex" style={{ minHeight: "92vh" }}>
      {messagePopup && <Popup {...messagePopup} />}
      <div className="min-h-full border-solid border-2 border-gray-100 w-2/12 shadow-xl">
        <Button buttonName="Create Test" color="green" onClick={handleClick} />
        <div>{currentUser && currentUser.email}</div>
        {Object.keys(currentUserTests).length > 0
          ? Object.values(currentUserTests).map((elem) => (
              <Button
                buttonName={elem[1].testTitle}
                color="blue"
                key={elem[0]}
                onClick={(e) => {
                  e.preventDefault();
                  Promise.resolve(true)
                    .then(() => {
                      setTestPaperData((prev) => ({
                        ...prev,
                        testId: elem[0],
                        testInfo: elem[1],
                      }));

                      return true;
                    })
                    .then(() => {
                      setIsTestPaper(true);
                    });
                }}
              />
            ))
          : null}
      </div>
      <div className="min-h-full w-10/12 border-solid border-black flex items-center justify-center">
        {isTestPopup && (
          <TestPopup
            getTestPopup={setIsTestPopup}
            setMessagePopup={setMessagePopup}
            setIsAddSuccess={setIsAddSuccess}
          />
        )}
        {isTestPaper && Object.keys(testPaperData).length > 0 && (
          <TestPaper
            testId={testPaperData.testId}
            testInfo={testPaperData.testInfo}
          />
        )}
      </div>
    </div>
  );
}
