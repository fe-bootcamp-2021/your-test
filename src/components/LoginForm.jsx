/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { loginScheme } from "../validationSchemes/loginScheme";
import { useAuth } from "../contexts/AuthContext";
import { registerPageRoute, userPageRoute } from "../constants/routes";
import Button from "./Button";
import TextField from "./TextField";
import Popup from "./Popup";
import Loader from "./Loader";

export default function LoginForm() {
  const [showPopup, setShowPopup] = useState({
    isPopup: false,
    massage: "",
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const history = useHistory();

  function handleLoginSubmit(userInfo, onSubmit) {
    setIsLoading(true);
    return signIn(userInfo.email, userInfo.password)
      .then(() => {
        setShowPopup({
          isPopup: true,
          massage: "You Logined successfully",
          isError: false,
        });
        setIsLoading(false);
        history.push(userPageRoute);
        onSubmit();
      })
      .catch((err) => {
        const errMassage = String(err).slice(13);
        setShowPopup({
          isPopup: true,
          massage: errMassage,
          isError: true,
        });
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Popup
        message={showPopup.massage}
        isError={showPopup.isError}
        isPopup={showPopup.isPopup}
        showPopup={setShowPopup}
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginScheme}
        onSubmit={(formData, { resetForm }) => {
          handleLoginSubmit(formData, resetForm);
        }}
      >
        {() => (
          <div className="min-w-full h-screen flex items-center justify-center">
            <div className="min-w-full flex items-center justify-center">
              <Form className="w-1/4 flex flex-col items-center justify-center p-5 border-2 border-blue-700 rounded-3xl	">
                <TextField labelText="Email" name="email" type="email" />
                <TextField
                  labelText="Password"
                  name="password"
                  type="password"
                />
                <Button
                  type="submit"
                  className="mb-5 w-1/2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  buttonName="Login"
                />
                <div className="w-full flex items-center justify-center">
                  <div className="text-xl">Don`t have an account? </div>
                  <a
                    className="underline ml-2 text-blue-500 hover:text-blue-700 hover:no-underline"
                    href={registerPageRoute}
                  >
                    Sign Up
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
