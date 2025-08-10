import React, { ReactNode } from "react";
import { motion } from "motion/react";

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

const CoreTemplate = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={REVEAL_TRANSITION.initial}
      animate={REVEAL_TRANSITION.final}
      exit={REVEAL_TRANSITION.initial}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default CoreTemplate;
