// components/ui/ProcessStep.tsx
"use client";

import { motion } from "framer-motion";

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  index?: number;
  isLast?: boolean;
}

export default function ProcessStep({
  step,
  title,
  description,
  index = 0,
  isLast = false,
}: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col items-center text-center relative group"
    >
      {/* Connector line (hidden on last item) */}
      {!isLast && (
        <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-white/10" />
      )}

      {/* Step number */}
      <div className="relative z-10 mb-5">
        <div className="w-12 h-12 rounded-full bg-[#0A1628] border border-white/20 flex items-center justify-center group-hover:border-white transition-colors duration-300">
          <span className="text-white/60 font-medium text-xs tracking-widest group-hover:text-white transition-colors">
            {String(step).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-white font-semibold text-xs sm:text-sm mb-2">{title}</h4>

      {/* Description */}
      <p className="text-white/40 text-[10px] sm:text-xs max-w-[140px] leading-relaxed">{description}</p>
    </motion.div>
  );
}
