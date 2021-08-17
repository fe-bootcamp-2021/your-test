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

export default function Input({
  type,
  name,
  placeholder,
  value,
  spellCheck,
  onChange,
}) {
  return (
    <input
      className={style}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      spellCheck={spellCheck}
      onChange={onChange}
    />
  );
}
