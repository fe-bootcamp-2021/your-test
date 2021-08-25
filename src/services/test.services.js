import { db } from "../libs/firebase";

export const addTest = function ({ testDescription, testTitle, userId }) {
  return db.ref(`/tests/`).set({
    testDescription,
    testTitle,
    userId,
  });
};

export const getTests = function () {
  return db.ref("/tests/").on("value", (snapshot) => {
    snapshot.forEach((item) => {
      console.log(item.key);
      console.log(item.val());
    });
  });
};
