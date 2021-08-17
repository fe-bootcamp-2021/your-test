import React from "react";
import classNames from "classnames";

export default function Button({ value, color, ...attr }) {
  const buttonStyle = classNames(
    "px-5",
    "py-5",
    `border-${color}-500`,
    `bg-${color}-400`,
    "rounded-xl",
    "md:w-40"
  );
  return (
    <button className={buttonStyle} {...attr}>
      {value}
    </button>
  );
}
