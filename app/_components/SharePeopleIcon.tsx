import Image from "next/image";
import React from "react";

const SharePeopleIcon = ({ title = "Title" }: { title: string }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="relative w-[4rem] h-[4rem] rounded-2xl bg-white shadow-2xl">
        <Image
          src={"/whatsapp.png"}
          alt="vendor"
          width={20}
          height={20}
          className="absolute right-0 bottom-0 rounded-2xl"
        />
      </div>
      <span className="text-[12px]">{title}</span>
    </div>
  );
};

export default SharePeopleIcon;
