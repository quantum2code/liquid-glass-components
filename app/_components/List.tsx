import React, { JSX } from "react";
import CoreTemplate from "./CoreTemplate";

type OptionArr = { name: string; onClick: () => void; icon: JSX.Element }[];

const List = ({
  arr,
  addClass,
  showLable = false,
}: {
  arr: OptionArr;
  addClass?: string;
  showLable?: boolean;
}) => {
  return (
    <CoreTemplate className={`flex gap-4 px-5 py-4 ` + addClass}>
      {arr.map((item, idx) => (
        <div
          key={item.name + idx}
          className="flex gap-2 items-center cursor-pointer"
          onClick={item.onClick}
        >
          {item.icon}
          <span className="text-[18px]" hidden={!showLable}>
            {item.name}
          </span>
        </div>
      ))}
    </CoreTemplate>
  );
};

export default List;
