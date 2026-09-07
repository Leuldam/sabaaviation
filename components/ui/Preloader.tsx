"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a slight delay for better UX and to ensure fonts/images start loading
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 600);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback timeout just in case
      const timeoutId = setTimeout(() => setIsLoading(false), 2500);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-midnight flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            {/* Logo Pulse Animation */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="w-16 h-16 rounded-xl bg-warm-gold flex items-center justify-center mb-4 shadow-lg shadow-warm-gold/20"
            >
              <span className="text-midnight font-extrabold text-3xl">S</span>
            </motion.div>

            {/* Brand Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <span className="text-white font-bold text-xl tracking-tight">SABA</span>
              <span className="text-warm-gold text-xs tracking-[0.2em] uppercase mt-1">
                Aviation
              </span>
            </motion.div>

            {/* Loading Bar */}
            <div className="w-40 h-1 bg-white/10 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-warm-gold to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
