import { db } from "../libs/firebase";

export const addResults = function ({ userEmail, date, testId, results }) {
  console.log(userEmail, date, testId, results);
  return db.ref(`/results/`).push({
    userEmail,
    date,
    testId,
    results,
  });
};

export const getResults = function ({ testId }) {
  const currentTestResults = [];
  return new Promise((resolve) => {
    db.ref(`/results/`)
      .orderByChild("testId")
      .equalTo(testId)
      .once("value", (snapshot) => {
        snapshot.forEach((item) => {
          currentTestResults.push({
            email: item.val().answer,
            date: item.val().correctAnswer,
            resultId: item.key,
          });
        });
        resolve(currentTestResults);
      });
  });
};

export const getCurrentResults = function ({ resultId }) {
  const currentTestResults = [];
  return new Promise((resolve) => {
    db.ref(`/results/${resultId}`).once("value", (snapshot) => {
      snapshot.forEach((item) => {
        currentTestResults.push(item.val().results);
      });
      resolve(currentTestResults);
    });
  });
};
