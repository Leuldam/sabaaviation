// components/ui/HeroSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  breadcrumbs?: { label: string; href: string }[];
  children?: React.ReactNode;
  fullHeight?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  breadcrumbs,
  children,
  fullHeight = false,
}: HeroSectionProps) {
  return (
    <section
      className={`relative ${fullHeight ? "min-h-screen" : "min-h-[50vh]"} flex items-end overflow-hidden`}
    >
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />

      {/* Gradient overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="relative z-10 container-max w-full pb-12 pl-6 pr-3 sm:pb-16 pt-24 sm:pt-32">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs sm:text-sm text-white/60 mb-6"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={14} className="text-white/40" />}
                {i < breadcrumbs.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-warm-gold transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-8xl font-serif font-semibold text-white max-w-xs md:max-w-4xl lg:max-w-2xl leading-tight tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-lg lg:text-base font-poppins text-white/70 max-w-2xl text-balance"
        >
          {subtitle}
        </motion.p>

        {/* Optional extra content (CTAs, badges etc.) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
