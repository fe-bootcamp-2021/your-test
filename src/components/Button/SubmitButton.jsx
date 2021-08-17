import React from "react";
import classNames from "classnames";

export default function SubmitButton({ value, color, ...attr }) {
  const buttonStyle = classNames(
    "btn border",
    "border-gray-300",
    "p-1",
    "text-4xl",
    "px-4",
    "font-semibold",
    "cursor-pointer",
    "text-gray-500"
  );
  return (
    <button className={buttonStyle} {...attr}>
      {value}
    </button>
  );
}
