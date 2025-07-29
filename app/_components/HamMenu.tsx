import { AnimatePresence, motion } from "motion/react";
import React, { Ref } from "react";
import CrossSVG from "./CrossSVG";

const HamMenu = ({
  ref,
  selected,
  setSelected,
}: {
  ref: Ref<HTMLElement | null>;
  selected: unknown;
  setSelected: (e: boolean) => unknown;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        ref={(e) => {
          //@ts-expect-error idk
          ref.current = e;
        }}
        style={{ borderRadius: "2rem" }}
        initial={{
          width: "3rem",
          height: "3rem",
        }}
        animate={
          selected
            ? { width: "10rem", height: "10rem" }
            : {
                width: "3rem",
                height: "3rem",
              }
        }
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="flex justify-start bg-[#ffffff40] backdrop-blur-[5px] shadow-xl relative overflow-hidden text-black font-medium"
        onClick={() => {
          setSelected(true);
        }}
      >
        <div
          style={{ borderRadius: "2rem" }}
          className="absolute inset-0 border-1 border-white blur-[2px]"
        ></div>
        <motion.div
          initial={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          animate={
            selected
              ? {
                  opacity: 0,
                  filter: "blur(10px)",
                }
              : {
                  opacity: 1,
                  filter: "blur(0px)",
                }
          }
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className="w-[3rem] h-[3rem] p-2"
        >
          <CrossSVG />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HamMenu;
