"use client";
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "./_components/HamMenu";
import WarningModal from "./_components/WarningModal";
import List from "./_components/List";
import Form from "./_components/Form";
import ShareModal from "./_components/ShareModal";
import {
  IoCreateOutline,
  IoShareOutline,
  IoTrashOutline,
} from "react-icons/io5";

export default function Home() {
  const pillIconSize = 27;
  const [activeState, setActiveState] = useState<
    "pill" | "modal" | "list" | "form" | "share"
  >("pill");
  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault(); // Prevents the default browser context menu
    console.log("Right-clicked!");
    setActiveState("list");
  };
  const clickRef = useOutsideClick(() => {
    setActiveState("pill");
  });
  type Size = { width: number; height: number };
  const optionsArr = [
    {
      name: "Edit",
      onClick: () => {
        setActiveState("form");
      },
      icon: <IoCreateOutline size={pillIconSize} />,
    },
    {
      name: "Share",
      onClick: () => {
        setActiveState("share");
      },
      icon: <IoShareOutline size={pillIconSize} />,
    },
    {
      name: "Delete",
      onClick: () => {
        setActiveState("modal");
      },
      icon: <IoTrashOutline size={pillIconSize} />,
    },
  ];

  const useCacheSize = (): [RefObject<HTMLDivElement | null>, Size | null] => {
    const ref = useRef<HTMLDivElement>(null);
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

  const [pillRef, pillDim] = useCacheSize();
  const [modalRef, modalDim] = useCacheSize();
  const [listRef, listDim] = useCacheSize();
  const [formRef, formDim] = useCacheSize();
  const [shareModalRef, shareModalDim] = useCacheSize();
  const animateVariant = () => {
    switch (activeState) {
      case "list":
        return { width: listDim?.width, height: listDim?.height };

      case "modal":
        return { width: modalDim?.width, height: modalDim?.height };
      case "form":
        return { width: formDim?.width, height: formDim?.height };
      case "share":
        return { width: shareModalDim?.width, height: shareModalDim?.height };
      default:
        return { width: pillDim?.width, height: pillDim?.height };
    }
  };
  return (
    <div className="h-full font-sans flex justify-center items-center gap-2">
      <div className="w-[28rem] h-[28rem] aspect-square rounded-4xl bg-[url(/img4.jpg)]  bg-cover p-1 pt-10">
        <motion.div
          //@ts-expect-error idk
          ref={clickRef}
          style={{ width: pillDim?.width, height: pillDim?.height }}
          initial={{
            width: pillDim?.width,
            height: pillDim?.height,
          }}
          animate={animateVariant()}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex justify-start border-[0.5px] border-white/10 rounded-[1.7rem] relative overflow-hidden bg-linear-0 from-[#ffffff50] to-[#ffffff80] backdrop-blur-[8px] shadow-[0_16px_20px_#00000030] font-medium text-black will-change-[width_height]"
          onContextMenu={(event) => {
            if (activeState === "pill") {
              event.preventDefault();
              setActiveState("list");
            }
          }}
        >
          {/* Modal */}
          <div ref={modalRef} className="absolute left-0 top-0">
            <AnimatePresence>
              {activeState === "modal" ? (
                <WarningModal onClose={() => setActiveState("pill")} />
              ) : null}
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
          {/* form */}
          <div ref={formRef} className="absolute">
            <AnimatePresence>
              {activeState === "form" ? (
                <Form onClose={() => setActiveState("pill")} />
              ) : null}
            </AnimatePresence>
          </div>
          {/* share modal */}
          <div ref={shareModalRef} className="absolute left-0 top-0">
            <AnimatePresence>
              {activeState === "share" ? <ShareModal /> : null}
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
