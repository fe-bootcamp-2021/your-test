import React from "react";
import classNames from "classnames";

const style = classNames(
  "bg-gray-100",
  "border",
  "border-gray-300",
  "p-2",
  "mb-4",
  "outline-none"
);

export default function Input({ ...attr }) {
  return <input className={style} {...attr} />;
}
