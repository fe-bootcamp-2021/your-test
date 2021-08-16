import React from "react";
import classNames from "classnames";

const style = classNames(
  "outline-none",
  "p-2",
  "border-b-4 blue-900",
  "bg-transparent",
  "w-96"
);

export default function Input({ type, name, placeholder, value, onChange }) {
  return (
    <input
      className={style}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
