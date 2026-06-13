import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

function Loader({ onComplete }) {
  const letters = useMemo(() => "Dr. Bipin Nepal".split(""), []);
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loader-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
    >
      <motion.div
        className="loader-title"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {letters.map((char, index) => (
          <motion.span key={`${char}-${index}`} variants={letterVariants}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
      <div className="loader-progress-track">
        <motion.span
          className="loader-progress"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

export default Loader;
