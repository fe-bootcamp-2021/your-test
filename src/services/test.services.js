import { db } from "../libs/firebase";

export const addTest = function ({ testDescription, testTitle, userId }) {
  return db.ref(`/tests/`).set({
    testDescription,
    testTitle,
    userId,
  });
};

export const getUserTests = function ({ userId }) {
  const currentUserTests = [];
  return new Promise((resolve) => {
    db.ref(`/tests/`)
      .orderByChild("userId")
      .equalTo(`${userId}`)
      .on("value", (snapshot) => {
        snapshot.forEach((item) => {
          currentUserTests.push([
            item.key,
            {
              testDescription: item.val().testDescription,
              testTitle: item.val().testTitle,
              userId: item.val().userId,
            },
          ]);
        });
        resolve(currentUserTests);
      });
  });
};

export const getCreatedTest = function ({ testId }) {
  const currentCreatedTest = {};
  return new Promise((resolve, reject) => {
    db.ref(`/tests/${testId}`).once("value", (snapshot) => {
      if (snapshot.val()) {
        currentCreatedTest.testDescription = snapshot.val().testDescription;
        currentCreatedTest.testTitle = snapshot.val().testTitle;
      }
      resolve(currentCreatedTest);
    });
  });
};
