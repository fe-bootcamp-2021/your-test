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
  const [showPopup, setShowPopup] = useState({
    isPopup: false,
    massage: "",
    isError: false,
  });

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
      // style={{ minHeight: "70vh" }}
    >
      <Popup
        message={showPopup.massage}
        isError={showPopup.isError}
        isPopup={showPopup.isPopup}
        showPopup={setShowPopup}
      />

      <div className="min-h-full w-full border-solid border-black flex items-center justify-center">
        {isTestPopup ? (
          <TestPopup
            getTestPopup={setIsTestPopup}
            setShowPopup={setShowPopup}
            setIsAddSuccess={setIsAddSuccess}
          />
        ) : isTestPaper ? (
          Object.keys(testPaperData).length > 0 &&
          !isTestPopup && (
            <div className="md:w-8/12 w-full p-2 m-auto">
              <Button
                buttonName="My tests"
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
          <div className="md:w-8/12 w-full p-2 m-auto">
            <h1 className="m-2 text-center font-bold text-2xl text-gray-600">
              My-Tests
            </h1>
            <Button
              buttonName="Create Test"
              color="green"
              onClick={handleClick}
            />
            {Object.keys(currentUserTests).length > 0 ? (
              Object.values(currentUserTests).map((elem, i) => (
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
            ) : (
              <div className="m-2 text-center">
                <p className="m-2">
                  You do not have a test yet, To create a test{" "}
                </p>
                <p className="m-2">Click on top create test</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
