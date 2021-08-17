import React from "react";

export default function TestPopup() {
  return (
    <>
      <div className="fixed top-1/3 w-screen flex flex-col justify-center items-center">
        <div className="w-1/2 heading text-center font-bold text-2xl m-5 text-gray-800 flex justify-center items-center ">
          New Post
        </div>
        <div className="w-1/2 editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-gray-200">
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            // onChange={(e) => {
            //   setTitle(e.target.value);
            // }}
            type="text"
          />
          <textarea
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
            spellCheck="false"
            placeholder="Describe everything about this post here"
            // onChange={(e) => {
            //   setDescription(e.target.value);
            // }}
          />
          <div className="buttons flex">
            {/* <ButtonComponent
              type="button"
              className=" btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer
               text-gray-500 ml-auto"
              buttonName="Cancel"
              onClick={onClick}
            /> */}
            {/* <ButtonComponent
              type="button"
              className=" btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer
               text-gray-200 ml-2 bg-indigo-500"
              buttonName="Post"
              // onClick={() => {
              //   if (
              //     handlePostSubmit(
              //       title,
              //       description,
              //     )
              //   ) {
              //     onClick();
              //   }
              // }}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
