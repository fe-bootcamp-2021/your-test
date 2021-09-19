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

      <div className="min-h-full w-full border-solid border-black flex items-center justify-center">
        {isTestPopup ? (
          <TestPopup
            getTestPopup={setIsTestPopup}
            setMessagePopup={setMessagePopup}
            setIsAddSuccess={setIsAddSuccess}
          />
        ) : isTestPaper ? (
          Object.keys(testPaperData).length > 0 &&
          !isTestPopup && (
            <div className="md:w-8/12 min-w-3xl m-auto">
              <Button
                buttonName="Tests List"
                color="green"
                onClick={() => setIsTestPaper(false)}
              />
              <TestPaper
                testId={testPaperData.testId}
                testInfo={testPaperData.testInfo}
              />
            </div>
          )
        ) : (
          <div className="md:w-8/12 min-w-3xl m-auto">
            <Button
              buttonName="Create Test"
              color="green"
              onClick={handleClick}
            />
            {Object.keys(currentUserTests).length > 0
              ? Object.values(currentUserTests).map((elem, i) => (
                  <div
                    className="relative flex items-center cursor-pointer border-2 border-gray-200 p-2 my-3 justify-between"
                    key={elem[0]}
                    role="presentation"
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
                  >
                    <span>{elem[1].testTitle}</span>

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
        )}
      </div>
    </div>
  );
}
