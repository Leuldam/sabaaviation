// components/ui/ValueCard.tsx
"use client";

import { motion } from "framer-motion";

interface ValueCardProps {
  label: string;
  description?: string;
  index?: number;
  variant?: "pill" | "card";
}

export default function ValueCard({
  label,
  description,
  index = 0,
  variant = "pill",
}: ValueCardProps) {
  if (variant === "pill") {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-card-bg border border-card-border rounded-full text-white text-sm font-medium hover:border-warm-gold/40 transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-warm-gold" />
        {label}
      </motion.span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card-dark text-center"
    >
      <div className="w-10 h-10 rounded-full bg-warm-gold/10 flex items-center justify-center mx-auto mb-3">
        <span className="w-3 h-3 rounded-full bg-warm-gold" />
      </div>
      <h4 className="text-white font-semibold mb-2">{label}</h4>
      {description && <p className="text-muted text-sm">{description}</p>}
    </motion.div>
  );
}
