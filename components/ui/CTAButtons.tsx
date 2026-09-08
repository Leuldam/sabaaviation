// components/ui/CTAButtons.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTAButtons() {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href="/services"
        className="btn-primary text-[10px] sm:text-xs px-4 sm:px-6"
      >
        Explore Our Services <ArrowRight size={14} className="sm:w-4 sm:h-4" />
      </Link>
      <Link
        href="/contact"
        className="btn-outline text-[10px] sm:text-xs px-4 sm:px-6"
      >
        Contact Us <ArrowRight size={14} className="sm:w-4 sm:h-4" />
      </Link>
    </motion.div>
  );
}
