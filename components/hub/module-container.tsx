"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface ModuleContainerProps {
  children: ReactNode;
  delay?: number;
}

export function ModuleContainer({ children, delay = 0 }: ModuleContainerProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
