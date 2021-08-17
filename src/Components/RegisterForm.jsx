/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { registrationScheme } from "../validationSchemes/registrationScheme";
import Button from "./Button";
import TextField from "./TextField";
import handleRegistrationSubmit from "../handlers/handleRegistraionSubmit";
import { useAuth } from "../contexts/AuthContext";
import Popup from "./Popup";

export default function RegistrationForm() {
  const [showPopup, setShowPopup] = useState({
    isPopup: false,
    massage: "",
    isError: false,
  });
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const { signup, currentUser } = useAuth();
  const historyHook = useHistory();

  // get users block in local storage
  useEffect(() => {
    const users = localStorage.getItem("users");

    if (users) {
      setRegisteredUsers(JSON.parse(users));
    }
  }, []);

  //   Close popup after some time
  useEffect(() => {
    if (showPopup.isPopup === true) {
      const timer = setTimeout(() => {
        setShowPopup({ isPopup: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <>
      {showPopup.isPopup ? (
        <Popup message={showPopup.massage} isError={showPopup.isError} />
      ) : null}
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
          handleRegistrationSubmit(
            formData,
            setShowPopup,
            { signup },
            { historyHook }
          );
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
