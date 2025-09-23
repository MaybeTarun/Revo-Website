"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "npx create-revo [project]",
  "creating project. . .",
  "setup ready under 50ms",
];

const Feature1 = () => {
  const [step, setStep] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) {
      const timers: NodeJS.Timeout[] = [];

      timers.push(setTimeout(() => setStep(1), 0));
      
      for (let i = 2; i < messages.length; i++) {
        timers.push(setTimeout(() => setStep(i), (i - 1) * 600));
      }

      const lastMessageTime = (messages.length - 1) * 600;
      timers.push(setTimeout(() => {
        setStep(0);
        setHovering(false);
      }, lastMessageTime + 2000));

      return () => timers.forEach(clearTimeout);
    }
  }, [hovering]);

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-between pb-4 overflow-hidden rounded-l-md relative"
      onMouseEnter={() => {
        if (!hovering) {
          setHovering(true);
          setStep(0);
        }
      }}
    >

      <div className="w-full flex items-center gap-2 px-3 py-2 border-b border-gray-300">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
      </div>

      <div className="absolute bottom-4 left-4 text-base md:text-lg font-semibold text-white">
        &gt;_
      </div>
      
      <AnimatePresence mode="wait">
        <motion.span
          key={step}
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`text-sm md:text-base font-mono ml-12 ${
            step === messages.length - 1 ? "text-green-600" : "text-white"
          }`}
        >
          {messages[step]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default Feature1;
