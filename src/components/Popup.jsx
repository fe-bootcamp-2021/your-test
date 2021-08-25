import React from "react";

const classNames = require("classnames");

export default function Popup({ message, isError }) {
  const popupStyle = classNames({
    "flex flex-col p-8 shadow-md hover:shodow-lg rounded-2xl fixed top-20 right-3": true,
    "bg-green-400": !isError,
    "bg-red-400": isError,
  });

  return (
    <div className={popupStyle}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            >
              {">"}
            </path>
          </svg>
          <div className="flex flex-col ml-3">
            <div className="font-medium leading-none">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
