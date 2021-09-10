/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from "react";
import classNames from "classnames";
import { useField, ErrorMessage } from "formik";
import Input from "./Input";

export default function TextField({ labelText, name, type, ...attr }) {
  const [field, meta] = useField({ name, type });
  const [focused, setFocused] = useState(false);
  const textFieldStyle = classNames(
    "w-full",
    "border",
    "rounded-lg",
    "border-blue-800",
    "p-2",
    "mb-4",
    "outline-none",
    "focus:bg-blue-500",
    "focus:text-white"
  );
  const placeholderStyle = classNames({
    "placeholder-transparent": focused,
  });
  const labelRef = useRef(null);

  function handleStyle() {
    setFocused((prev) => !prev);
    labelRef.current.style.display = "inline";
  }

  return (
    <div className="mb-5 w-full">
      <label
        ref={labelRef}
        htmlFor={name}
        className={`text-blue-700 hidden ${placeholderStyle}`}
      >
        {labelText}
      </label>
      <div className="flex items-center justify-center w-full">
        <Input
          onClick={handleStyle}
          className={`${textFieldStyle} ${placeholderStyle}`}
          Placeholder={labelText}
          name={name}
          type={type}
          {...attr}
          {...field}
        />
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
