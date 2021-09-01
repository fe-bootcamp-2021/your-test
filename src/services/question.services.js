import { db } from "../libs/firebase";

export const addQuestions = function ({
  answer,
  correctAnswer,
  point,
  question,
  type,
  testId,
}) {
  return db.ref(`/questions/`).push({
    answer,
    correctAnswer,
    point,
    question,
    type,
    testId,
  });
};

export const getTestQuestions = function ({ testId }) {
  const currentTestQuestions = [];
  return new Promise((resolve) => {
    db.ref(`/questions`)
      .orderByChild("testId")
      .equalTo(testId)
      .on("value", (snapshot) => {
        snapshot.forEach((item) => {
          currentTestQuestions.push({
            answer: item.val().answer,
            correctAnswer: item.val().correctAnswer,
            point: item.val().point,
            question: item.val().question,
            type: item.val().type,
          });
        });
        resolve(currentTestQuestions);
      });
  });
};
