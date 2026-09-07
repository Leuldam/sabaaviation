// components/ui/SectionHeading.tsx
"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? "text-center" : ""}`}
    >
      {label && <p className="section-label">{label}</p>}
      <div className="gold-line mb-4" style={centered ? { margin: "0 auto 1rem" } : {}} />
      <h2
        className={`text-3xl md:text-4xl font-bold tracking-tight ${
          light ? "text-midnight" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-muted" : "text-white/60"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
