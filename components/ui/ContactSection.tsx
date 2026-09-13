// components/ui/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="py-16 md:py-20 bg-[#F7F7F7]">
      <div className="w-full px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Content Container - 3 Column Grid */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-8 md:gap-12 lg:gap-16">
            {/* Left Side - "HEARD ENOUGH?" Label */}
            <div className="flex items-center justify-start">
              <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-[0.15em] font-light">
                HEARD ENOUGH?
              </p>
            </div>

            {/* Center - "Contact us" Text */}
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif font-normal text-[#0A0A0A] leading-tight tracking-tight mb-2">
                Contact us
              </h2>
              {/* Orange underline */}
              <div className="w-24 md:w-32 h-[2px] bg-[#052f4d]"></div>
            </div>

            {/* Right Side - Arrow Button */}
            <div className="flex items-center justify-end">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#052f4d] rounded-full flex items-center justify-center hover:bg-[#022742] transition-colors group"
                  aria-label="Go to contact page"
                >
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                  </motion.div>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
