"use client";
import { useEffect, useRef, useState } from "react";
import HamMenu from "./_components/HamMenu";
export default function Home() {
  const ref = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSelected(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  return (
    <div className="h-full font-sans flex justify-center items-center">
      <div className="w-[18rem] aspect-square rounded-2xl bg-[url(/img.jpg)] bg-cover p-2">
        <div className="relative inset-0">
          <HamMenu ref={ref} selected={selected} setSelected={setSelected} />
        </div>
      </div>
    </div>
  );
}
