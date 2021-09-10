/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import TestPopup from "./TestPopup";
import TestPaper from "./TestPaper";
import Popup from "./Popup";
import { getUserTests, deleteTest } from "../services/test.services";

export default function UserProfile() {
  const { currentUser } = useAuth();

  const [isAddSuccess, setIsAddSuccess] = useState();
  const [isRemoveSuccess, setIsRemoveSuccess] = useState();
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
        console.log("render");
        setCurrentUserTests((pre) => ({ ...res }));
      });
    }
  }, [currentUser, isAddSuccess, isRemoveSuccess]);

  return (
    <div
      className="flex justify-between max-w-full"
      style={{ minHeight: "92vh" }}
    >
      {messagePopup && <Popup {...messagePopup} />}
      <div className=" border-solid border-2 border-gray-100 w-72 shadow-xl">
        <Button buttonName="Create Test" color="green" onClick={handleClick} />
        {Object.keys(currentUserTests).length > 0
          ? Object.values(currentUserTests).map((elem, i) => (
              <div className="relative" key={i}>
                <Button
                  buttonName={elem[1].testTitle}
                  color="blue"
                  key={elem[0]}
                  // width="10/12"
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
                  className="inline-block absolute right-1 mt-1 h-8 w-6 hover:text-red-500 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => {
                    deleteTest({ testId: elem[0] })
                      .then(() => {
                        setIsRemoveSuccess((prev) => !prev);
                      })
                      .then(() => {
                        setIsTestPaper(false);
                      });
                  }}
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
      <div className="min-h-full w-full border-solid border-black flex items-center justify-center">
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
