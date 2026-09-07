// components/ui/ServiceCard.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  slug: string;
  index?: number;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  slug,
  index = 0,
}: ServiceCardProps) {
  const MotionLink = motion(Link);

  return (
    <MotionLink
      href={`/services/${slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card group cursor-default"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-warm-gold/10 flex items-center justify-center mb-4 group-hover:bg-warm-gold/20 transition-colors">
        <Icon size={22} className="text-warm-gold" />
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-base mb-2">{title}</h3>

      {/* Description */}
      <p className="text-muted text-sm leading-relaxed mb-4">{description}</p>
      
      {/* Arrow Link */}
      <div className="mt-auto pt-2 flex justify-end text-warm-gold group-hover:translate-x-1 transition-transform">
        <div className="w-8 h-8 rounded-full border border-warm-gold/30 flex items-center justify-center group-hover:bg-warm-gold group-hover:text-midnight transition-colors">
          <ArrowRight size={16} />
        </div>
      </div>
    </MotionLink>
  );
}
