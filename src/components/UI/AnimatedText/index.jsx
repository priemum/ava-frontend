import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

const index = ({
  text,
  className,
  hiddenLetterY,
  staggerDuration,
  textMR,
  childDelay,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { i18n } = useTranslation();
  const sentence = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration ?? 0.08,
        delayChildren: childDelay ?? 0.04 * i,
      },
    }),
  };
  const letter = {
    hidden: {
      opacity: 0,
      y: hiddenLetterY ?? 80,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };
  return (
    <motion.p
      variants={sentence}
      initial="hidden"
      whileInView={isInView}
      animate={isInView && "visible"}
      ref={ref}
      className={`${className}`}
    >
      {text.split("").map((char, index) => {
        return (
          <motion.span
            key={index}
            variants={letter}
            className={`${i18n.language == "en" ? textMR ?? "mr-1" : ""}`}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.p>
  );
};

export default index;
