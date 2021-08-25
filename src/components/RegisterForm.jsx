/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { registrationScheme } from "../validationSchemes/registrationScheme";
import Button from "./Button";
import TextField from "./TextField";
import { useAuth } from "../contexts/AuthContext";
import Popup from "./Popup";
import { userPageRote } from "../constants/routes";
import { addUser } from "../services/user.services";

export default function RegistrationForm() {
  const [showPopup, setShowPopup] = useState({
    isPopup: false,
    massage: "",
    isError: false,
  });
  const { signup, currentUser } = useAuth();
  const historyHook = useHistory();

  function handleRegistrationSubmit(userInfo) {
    const user = {
      name: userInfo.firstName,
      email: userInfo.email,
      password: userInfo.password,
    };

    Promise.resolve().then(() => {
      signup(user.email, user.password)
        .then(() => {
          addUser({
            email: user.email,
            password: user.password,
            uid: currentUser.uid,
          });
        })
        .then(() => {
          setShowPopup({
            isPopup: true,
            massage: "You registered successfully",
            isError: false,
          });
          historyHook.push(userPageRote);
        })
        .catch((err) => {
          const errMassage = String(err).slice(13);
          setShowPopup({
            isPopup: true,
            massage: errMassage,
            isError: true,
          });
        });
    });

    return true;
  }

  return (
    <>
      <Popup
        message={showPopup.massage}
        isError={showPopup.isError}
        isPopup={showPopup.isPopup}
      />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registrationScheme}
        onSubmit={(formData, { resetForm }) => {
          handleRegistrationSubmit(formData);
          resetForm();
        }}
      >
        {() => (
          <div className="App max-w-full flex align-center justify-center">
            <Form className="w-1/3">
              <TextField
                labelText="First Name"
                name="firstName"
                type="text"
                // className="w-1/2"
              />
              <TextField
                labelText="Last Name"
                name="lastName"
                type="text"
                // className="w-1/2"
              />
              <TextField
                labelText="Email"
                name="email"
                type="email"
                // className="w-1/2"
              />
              <TextField
                labelText="Password"
                name="password"
                type="password"
                // className="w-1/2"
              />
              <TextField
                labelText="Confirm Password"
                name="confirmPassword"
                type="password"
                // className="w-1/2"
              />

              <Button
                type="submit"
                className="mt-10 w-64 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                buttonName="Submit"
              />
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
