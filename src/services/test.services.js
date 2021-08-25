import { db } from "../libs/firebase";

export const addTest = function ({ testDescription, testTitle, userId }) {
  return db.ref(`/tests/`).set({
    testDescription,
    testTitle,
    userId,
  });
};

export const getUserTests = function ({ userId }) {
  console.log(userId);
  return db
    .ref(`/tests/`)
    .orderByChild("userId")
    .equalTo(`${userId}`)
    .on("value", (snapshot) => {
      //   console.log(userId);
      //   console.log(snapshot);

      snapshot.forEach((item) => {
        console.log(item.val());
      });
    });
};
