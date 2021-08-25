/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { loginScheme } from "../validationSchemes/loginScheme";
import Button from "./Button";
import TextField from "./TextField";
import Popup from "./Popup";
import { useAuth } from "../contexts/AuthContext";
import { userPageRote } from "../constants/routes";

export default function LoginForm() {
  const [showPopup, setShowPopup] = useState({
    isPopup: false,
    massage: "",
    isError: false,
  });
  const { signIn } = useAuth();
  const history = useHistory();

  function handleLoginSubmit(userInfo) {
    Promise.resolve().then(() => {
      signIn(userInfo.email, userInfo.password)
        .then(() => {
          setShowPopup({
            isPopup: true,
            massage: "You Logined successfully",
            isError: false,
          });
          history.push(userPageRote);
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
          email: "",
          password: "",
        }}
        validationSchema={loginScheme}
        onSubmit={(formData, { resetForm }) => {
          handleLoginSubmit(formData);
          resetForm();
        }}
      >
        {() => (
          <div className="App max-w-full flex align-center justify-center">
            <Form className="w-1/3">
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
              <Button
                type="submit"
                className="mt-10 w-64 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                buttonName="Login"
              />
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
