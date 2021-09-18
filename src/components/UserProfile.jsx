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
import DeleteIcon from "./icons/DeleteIcon";

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
              <div className="relative flex items-center" key={i}>
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

                <DeleteIcon
                  onClick={() => {
                    deleteTest({ testId: elem[0] })
                      .then(() => {
                        setIsRemoveSuccess((prev) => !prev);
                      })
                      .then(() => {
                        setIsTestPaper(false);
                      });
                  }}
                />
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
