import React from "react";
import CoreTemplate from "./CoreTemplate";
import { FiArrowRight } from "react-icons/fi";
import SharePeopleIcon from "./SharePeopleIcon";
import { IoIosLink } from "react-icons/io";
import Image from "next/image";

const vendorArr = [
  { name: "Instagram", iconPath: "/insta.webp" },
  { name: "Whatsapp", iconPath: "/whatsapp.png" },
  { name: "X", iconPath: "/X.avif" },
];

const ShareModal = () => {
  return (
    <div>
      <CoreTemplate>
        <div className="w-[20rem] p-3 py-5">
          <div className="flex gap-4">
            <div className="bg-[url(/file.png)] bg-cover bg-center w-[5rem] h-[5rem] rounded-2xl"></div>
            <div className="text-black">
              <p>file1.txt</p>
              <p className="opacity-50">Downloads/files/file1.txt</p>
              <button className="mt-2 flex gap-2 text-[16px] items-center bg-[#ffffffcc] px-4 py-3 rounded-full">
                <span>Options</span>
                <span>
                  <FiArrowRight />
                </span>
              </button>
            </div>
          </div>
          <hr className="my-4 opacity-10 border-1" />
          <div className=" flex gap-5 w-fit">
            <SharePeopleIcon title="Yuri" />
            <SharePeopleIcon title="Sam" />
            <SharePeopleIcon title="Jessica" />
            <SharePeopleIcon title="Dave" />
            <SharePeopleIcon title="Yuri" />
          </div>
          <hr className="my-4 opacity-10 border-1" />
          <div className=" flex gap-5 w-fit">
            <div className="w-[4rem]  h-[4rem] aspect-square rounded-2xl p-4 bg-neutral-100 ">
              <IoIosLink className="w-full h-full " />
            </div>
            {vendorArr.map((item, idx) => (
              <div
                key={item.name + idx}
                className="flex flex-col items-center gap-1"
              >
                <div
                  key={item.name + idx}
                  className=" w-[4rem] h-[4rem] overflow-hidden rounded-2xl shadow-2xl flex items-center"
                >
                  <Image
                    key={item.name}
                    src={item.iconPath}
                    alt={item.name}
                    width={120}
                    height={120}
                  />
                </div>
                <span className="text-[12px]">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CoreTemplate>
    </div>
  );
};

export default ShareModal;
