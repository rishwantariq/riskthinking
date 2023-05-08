"use client";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

export const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
    <div>
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          duration: 0.5,
        }}
        onAnimationComplete={() =>  window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ position: "relative" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </div>
);