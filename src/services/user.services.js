import { db } from "../libs/firebase";

export const addUser = function ({ email, password, uid }) {
  return db.ref(`/users/${uid}`).set({
    email,
    password,
    uid,
  });
};

export const updateProfile = function (uid, { description }) {
  return db.ref("/users/").child(uid).update({
    description,
  });
};
