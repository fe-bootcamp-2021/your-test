/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { registrationScheme } from "../validationSchemes/registrationScheme";
import Button from "./Button";
import TextField from "./TextField";
import { useAuth } from "../contexts/AuthContext";
import Popup from "./Popup";
import { loginPageRoute, userPageRoute } from "../constants/routes";
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
          historyHook.push(userPageRoute);
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
          <div className="min-w-full h-screen flex items-center justify-center">
            <div className="min-w-full flex items-center justify-center">
              <Form className="w-96 flex flex-col items-center justify-center p-5 border-2 border-blue-700 rounded-3xl	">
                <TextField labelText="Full Name" name="firstName" type="text" />
                <TextField labelText="Email" name="email" type="email" />
                <TextField
                  labelText="Password"
                  name="password"
                  type="password"
                />
                <TextField
                  labelText="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
                <Button
                  type="submit"
                  className="mb-5 w-1/2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  buttonName="Submit"
                />
                <div className="w-full flex items-center justify-center">
                  <div className="text-xl">Already have an account?</div>
                  <a
                    className="underline ml-2 text-blue-500 hover:text-blue-700 hover:no-underline"
                    href={loginPageRoute}
                  >
                    Sign In
                  </a>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
