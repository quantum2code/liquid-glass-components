import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import CrossSVG from "./CrossSVG";

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);
  return ref;
};

const MAIN_BUTTON_SIZE = "4rem";
const MODAL_SIZE = "20rem";
const BORDER_RADIUS = "2rem";

const SIZE_TRANSITION = {
  initial: {
    width: MAIN_BUTTON_SIZE,
    height: MAIN_BUTTON_SIZE,
  },
  final: {
    width: MODAL_SIZE,
    height: MODAL_SIZE,
  },
};

const OPACITY_TRANSITION = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
  },
  final: {
    opacity: 1,
    filter: "blur(0px)",
  },
};

const REVEAL_TRANSITION = {
  initial: {
    ...OPACITY_TRANSITION.initial,
    scale: "120%",
  },
  final: {
    ...OPACITY_TRANSITION.final,
    scale: "100%",
  },
};

const HamMenu = () => {
  const [selected, setSelected] = useState(false);
  const clickRef = useOutsideClick(() => setSelected(false));
  return (
    //@ts-expect-error idk
    <div ref={clickRef} className="relative">
      <AnimatePresence>
        {!selected ? (
          <motion.div
            initial={OPACITY_TRANSITION.initial}
            animate={OPACITY_TRANSITION.final}
            exit={OPACITY_TRANSITION.initial}
            transition={{ duration: 0.5 }}
            style={SIZE_TRANSITION.initial}
            className="absolute p-2 inset-0 z-100 pointer-events-none"
          >
            <CrossSVG />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        style={{
          borderRadius: BORDER_RADIUS,
        }}
        initial={SIZE_TRANSITION.initial}
        animate={selected ? SIZE_TRANSITION.final : SIZE_TRANSITION.initial}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="shadow-[0_15px_50px_rgba(0,0,0,0.3) absolute inset-0 z-10 overflow-hidden flex flex-col gap-3 border-[1px] border-[#ffffff80]  bg-[#ffffff90] backdrop-blur-xl"
        onClick={() => {
          setSelected(true);
        }}
      >
        <div
          style={SIZE_TRANSITION.final}
          className="absolute inset-0 z-20 flex flex-col p-4 pt-9 text-black justify-between "
        >
          <AnimatePresence>
            {selected ? (
              <motion.p
                initial={REVEAL_TRANSITION.initial}
                animate={REVEAL_TRANSITION.final}
                exit={REVEAL_TRANSITION.initial}
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
                initial={REVEAL_TRANSITION.initial}
                animate={REVEAL_TRANSITION.final}
                exit={REVEAL_TRANSITION.initial}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="flex flex-col text-xl gap-2"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(false);
                  }}
                  className="font-medium text-white bg-[#ff000099] py-4 rounded-full"
                >
                  Delete Draft
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(false);
                  }}
                  className="font-medium  bg-[#0000005f] py-4 rounded-full"
                >
                  Save Draft
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default HamMenu;
