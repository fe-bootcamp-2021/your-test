/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function Header({ children }) {
  return (
    <header
      className="bg-indigo-200 py-2 md:py-4 flex"
      style={{ minHeight: "8vh" }}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex justify-between items-center">
          <a href="" className="font-bold text-2xl text-gray-600">
            Your Test
          </a>
        </div>

        <div
          className=" md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
          id="navbar-collapse"
        >
          {children}
        </div>
      </div>
    </header>
  );
}
