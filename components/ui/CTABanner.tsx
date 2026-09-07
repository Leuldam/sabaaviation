// components/ui/CTABanner.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: "dark" | "gold";
}

export default function CTABanner({
  title = "Ready to Support Your Operation?",
  subtitle = "Get in touch with our experienced team and discover reliable and professional aviation support in Ethiopia.",
  buttonText = "CONTACT US",
  buttonHref = "/contact",
  variant = "dark",
}: CTABannerProps) {
  return (
    <section
      className={`section-padding ${
        variant === "gold"
          ? "bg-gradient-to-r from-warm-gold to-light-gold"
          : "bg-dark-navy"
      }`}
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div className="max-w-xl">
            <h2
              className={`text-3xl md:text-4xl font-bold tracking-tight ${
                variant === "gold" ? "text-midnight" : "text-white"
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-3 text-lg ${
                variant === "gold" ? "text-midnight/70" : "text-white/60"
              }`}
            >
              {subtitle}
            </p>
          </div>
          <Link
            href={buttonHref}
            className={`${
              variant === "gold" ? "btn-outline" : "btn-outline-gold"
            } whitespace-nowrap`}
          >
            {buttonText} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
