/* eslint-disable import/prefer-default-export */
import * as Yup from "yup";

export const emailScheme = Yup.object({
  email: Yup.string()
    .email("Enter valid email")
    .required("Please enter your email"),
});
