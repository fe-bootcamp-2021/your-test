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
      <div className="min-h-full border-solid border-2 border-gray-100 w-96 shadow-xl">
        <Button buttonName="Create Test" color="green" onClick={handleClick} />
        <div>{currentUser && currentUser.email}</div>
        {Object.keys(currentUserTests).length > 0
          ? Object.values(currentUserTests).map((elem) => (
              <div>
                <Button
                  buttonName={elem[1].testTitle}
                  color="blue"
                  key={elem[0]}
                  width="11/12"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block md:from-blue-500 md:hover:from-blue-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
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
        {isTestPaper &&
          Object.keys(testPaperData).length > 0 &&
          !isTestPopup && (
            <TestPaper
              testId={testPaperData.testId}
              testInfo={testPaperData.testInfo}
            />
          )}
      </div>
    </div>
  );
}
