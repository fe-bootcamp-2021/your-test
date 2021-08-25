import { db } from "../libs/firebase";

export const addTest = function ({ testDescription, testTitle, userId }) {
  return db.ref(`/tests/`).set({
    testDescription,
    testTitle,
    userId,
  });
};

export const getUserTests = function ({ userId }) {
  const curentUserTests = [];
  return db
    .ref(`/tests/`)
    .orderByChild("userId")
    .equalTo(`${userId}`)
    .on("value", (snapshot) => {
      snapshot.forEach((item) => {
        console.log(item.key);
        console.log(item.val());
      });
    });
};
