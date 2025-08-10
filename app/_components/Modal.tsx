import React from "react";
import CoreTemplate from "./CoreTemplate";
const Btn = ({
  btntxt = "Button",
  bgcolor = "#007AFF",
  textcolor = "white",
}) => {
  return (
    <button
      style={{ backgroundColor: bgcolor, color: textcolor }}
      className="py-3 rounded-full px-10 font-medium tracking-wide cursor-pointer"
    >
      {btntxt}
    </button>
  );
};
const Modal = () => {
  return (
    <div id="modal" className="p-3 pt-5 w-full flex flex-col gap-4">
      <CoreTemplate className="px-2 w-[16rem]">
        <p className="line-clamp-2">
          Something, something. title text goes here. Some more text in case u
          need
        </p>
      </CoreTemplate>
      <CoreTemplate className="flex gap-3">
        <Btn bgcolor="red" />
        <Btn bgcolor="#00000040" textcolor="black" />
      </CoreTemplate>
    </div>
  );
};

export default Modal;
