"use client";
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "./_components/HamMenu";
import Modal from "./_components/Modal";
import List from "./_components/List";
import { FiEdit, FiShare, FiTrash } from "react-icons/fi";
export default function Home() {
  const [activeState, setActiveState] = useState<"pill" | "modal" | "list">(
    "pill"
  );
  const [selected, setSelected] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const clickRef = useOutsideClick(() => {
    setCanAnimate(false);
    setSelected(false);
    setActiveState("pill");
  });
  type Size = { width: number; height: number };
  const optionsArr = [
    { name: "Edit", onClick: () => {}, icon: <FiEdit size={20} /> },
    {
      name: "Share",
      onClick: () => {
        setActiveState("list");
      },
      icon: <FiShare size={20} />,
    },
    {
      name: "Delete",
      onClick: () => {
        setActiveState("modal");
      },
      icon: <FiTrash size={20} />,
    },
  ];

  const useCacheSize = (): [RefObject<HTMLElement | null>, Size | null] => {
    const ref = useRef<HTMLElement>(null);
    const [size, setSize] = useState<Size | null>({ width: 0, height: 0 });

    useLayoutEffect(() => {
      if (!ref.current) return;

      const measure = () => {
        const { width, height } = ref.current!.getBoundingClientRect();
        setSize({ width, height });
      };

      measure();

      const observer = new ResizeObserver(measure);
      observer.observe(ref.current);

      return () => observer.disconnect();
    }, []);

    return [ref, size];
  };

  useEffect(() => {
    if (selected) {
      setCanAnimate(true);
    }
  });

  const [pillRef, pillDim] = useCacheSize();
  const [modalRef, modalDim] = useCacheSize();
  const [listRef, listDim] = useCacheSize();
  const animateVariant = () => {
    switch (activeState) {
      case "list":
        return { width: listDim?.width, height: listDim?.height };

      case "modal":
        return { width: modalDim?.width, height: modalDim?.height };
      default:
        return { width: pillDim?.width, height: pillDim?.height };
    }
  };
  return (
    <div className="h-full font-sans flex justify-center items-center gap-2">
      <div className="w-[28rem] aspect-square rounded-4xl bg-[url(/img.jpg)]  bg-cover p-1 pt-10">
        <motion.div
          //@ts-expect-error idk
          ref={clickRef}
          style={{ width: pillDim?.width, height: pillDim?.height }}
          initial={{
            width: pillDim?.width,
            height: pillDim?.height,
          }}
          animate={animateVariant()}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex justify-start border-1 border-[#ffffff80] rounded-[1.7rem] relative overflow-hidden bg-linear-0 from-[#ffffff50] to-[#ffffff80] backdrop-blur-[10px] shadow-[0_16px_20px_#00000030] font-medium text-black"
        >
          {/* Modal */}
          <div ref={modalRef} className="absolute">
            <AnimatePresence>
              {activeState === "modal" ? <Modal /> : null}
            </AnimatePresence>
          </div>
          {/* vertical List */}
          <div ref={listRef} className="absolute">
            <AnimatePresence>
              {activeState === "list" ? (
                <List arr={optionsArr} addClass="flex-col" showLable={true} />
              ) : null}
            </AnimatePresence>
          </div>
          {/* Pill */}
          <div ref={pillRef} className="absolute left-0 top-0 cursor-pointer">
            <AnimatePresence>
              {activeState === "pill" ? <List arr={optionsArr} /> : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
