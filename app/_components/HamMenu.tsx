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
    <div className="relative inset-0">
      <div
        ref={(e) => {
          //@ts-expect-error idk
          ref.current = e;
        }}
        className="relative"
      >
        <AnimatePresence>
          {!selected ? (
            <motion.div
              initial={{
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                filter: "blur(10px)",
              }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className="absolute p-1 inset-0 w-[3rem] h-[3rem] z-100 pointer-events-none"
            >
              <CrossSVG />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div
          style={{
            borderRadius: "2rem",
          }}
          initial={{
            width: "3rem",
            height: "3rem",
          }}
          animate={
            selected
              ? { width: "20rem", height: "20rem" }
              : {
                  width: "3rem",
                  height: "3rem",
                }
          }
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-[#ffffff50] backdrop-blur-[6px] shadow-[0_10px_20px_rgba(0,0,0,0.3)] absolute inset-0 z-10 overflow-hidden flex flex-col gap-3"
          onClick={() => {
            setSelected(true);
          }}
        >
          <div className="w-[20rem] h-[20rem] absolute inset-0 flex flex-col px-5 py-9 text-black justify-between">
            <AnimatePresence>
              {selected ? (
                <motion.p
                  initial={{
                    scale: "120%",
                    opacity: 0,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    scale: "100%",
                    opacity: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    scale: "105%",
                    opacity: 0,
                    filter: "blur(10px)",
                  }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                  className="text-xl font-medium px-2"
                >
                  You have unsaved changes.
                  <br />
                  Delete of keep editing?
                </motion.p>
              ) : null}
            </AnimatePresence>
            <AnimatePresence>
              {selected ? (
                <motion.div
                  initial={{
                    scale: "120%",
                    opacity: 0,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    scale: "100%",
                    opacity: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    scale: "105%",
                    opacity: 0,
                    filter: "blur(10px)",
                  }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                  className="flex flex-col text-xl gap-2"
                >
                  <button className="font-medium text-red-700 bg-[#00000040] py-4 rounded-full">
                    Delete Draft
                  </button>
                  <button className="font-medium text-blue-700 bg-[#00000040] py-4 rounded-full">
                    Save Draft
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div
            style={{ borderRadius: "2rem" }}
            className="absolute inset-0 border-1 border-white blur-[3px]"
          ></div>
        </motion.div>
      </div>
    </div>
  );
};

export default HamMenu;
