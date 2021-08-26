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
