/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useField, ErrorMessage } from "formik";
import Input from "./Input";

export default function TextField({ labelText, name, type, ...attr }) {
  const [field, meta] = useField({ name, type });

  return (
    <div className="mt-10 ">
      <label htmlFor={name}>{labelText}</label>
      <div>
        <Input name={name} type={type} {...attr} {...field} />
      </div>

      <div>
        <ErrorMessage
          name={field.name}
          component="span"
          className="text-red-400"
        />
      </div>
    </div>
  );
}
