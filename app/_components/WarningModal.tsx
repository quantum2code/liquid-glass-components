import React from "react";
import CoreTemplate from "./CoreTemplate";
import { Btn } from "./Button";


interface ModalProps {
  onClose?: () => void;
}
const WarningModal = ({ onClose }: ModalProps) => {
  return (
    <div className="p-3 pt-5 w-full flex flex-col gap-4">
      <CoreTemplate className="px-2 w-[16rem]">
        <p className="line-clamp-2">
          This will permanently delete the selected file.
        </p>
      </CoreTemplate>
      <CoreTemplate className="flex gap-3">
        <Btn bgcolor="#00000020" textcolor="black" btntxt="Keep" onClick={onClose} />
        <Btn bgcolor="#FF3B30" btntxt="Delete" onClick={onClose} />
      </CoreTemplate>
    </div>
  );
};

export default WarningModal;
