import React from "react";
import CoreTemplate from "./CoreTemplate";
import { Btn } from "./Button";


interface FormProps {
  onClose?: () => void;
}

const Form = ({ onClose }: FormProps) => {
  return (
    <div id="modal" className="p-3 pt-5 w-full flex flex-col gap-4">
      <CoreTemplate className="w-[16rem]">
        <input
          className="w-full h-10 px-4 outline-none focus:ring-2 focus:ring-[#007AFF]/50 rounded-lg bg-black/5 placeholder:text-black/40 text-black transition-all"
          placeholder="Write something..."
          type="text"
          autoFocus
        />
      </CoreTemplate>
      <CoreTemplate className="flex gap-3 justify-between">
        <Btn
          bgcolor="#00000010"
          textcolor="black"
          btntxt="Cancel"
          onClick={onClose}
        />
        <Btn bgcolor="#007AFF" btntxt="Save" onClick={onClose} />
      </CoreTemplate>
    </div>
  );
};

export default Form;
