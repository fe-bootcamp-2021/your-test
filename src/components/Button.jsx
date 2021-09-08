/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import classNames from "classnames";

export default function Button({ buttonName, color, width = "full", ...attr }) {
  const buttonStyle = classNames(
    `w-${width}`,
    "mb-1",
    // "block",
    "px-6",
    "py-2",
    "text-xs",
    "font-medium",
    "leading-6",
    "text-center",
    "text-white",
    "uppercase",
    "transition",
    `bg-${color}-500`,
    "rounded",
    "shadow",
    "ripple",
    "hover:shadow-lg",
    `hover:bg-${color}-600`,
    "focus:outline-none"
  );
  return (
    <button className={buttonStyle} {...attr}>
      {buttonName}
    </button>
  );
}
