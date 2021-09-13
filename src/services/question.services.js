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
    db.ref(`/questions/`)
      .orderByChild("testId")
      .equalTo(testId)
      .once("value", (snapshot) => {
        snapshot.forEach((item) => {
          currentTestQuestions.push({
            answer: item.val().answer,
            correctAnswer: item.val().correctAnswer,
            point: item.val().point,
            question: item.val().question,
            type: item.val().type,
            questionId: item.key,
          });
        });
        resolve(currentTestQuestions);
      });
  });
};

export const getQuestionsNoCorrectAnswers = function ({ testId }) {
  const currentTestQuestions = [];
  return new Promise((resolve) => {
    db.ref(`/questions/`)
      .orderByChild("testId")
      .equalTo(testId)
      .once("value", (snapshot) => {
        snapshot.forEach((item) => {
          currentTestQuestions.push({
            answer: item.val().answer,
            point: item.val().point,
            question: item.val().question,
            type: item.val().type,
          });
        });
        resolve(currentTestQuestions);
      });
  });
};

export const getCorrectAnswers = function ({ testId }) {
  const currentTestQuestions = [];
  return new Promise((resolve) => {
    db.ref(`/questions/`)
      .orderByChild("testId")
      .equalTo(testId)
      .once("value", (snapshot) => {
        snapshot.forEach((item) => {
          currentTestQuestions.push({
            correctAnswer: item.val().correctAnswer,
          });
        });
        resolve(currentTestQuestions);
      });
  });
};

export const editQuestion = function ({
  answer,
  correctAnswer,
  point,
  question,
  type,
  questionId,
  testId,
}) {
  console.log(questionId);
  return db.ref(`/questions/${questionId}`).update({
    answer,
    correctAnswer,
    point,
    question,
    type,
    testId,
  });
};
