"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  subtitle?: string;
  slug: string;
  image: string;
  index?: number;
  active?: boolean;
  tall?: boolean;
}

export default function ServiceCard({
  title,
  description,
  subtitle,
  slug,
  image,
  index = 0,
}: ServiceCardProps) {
  const displaySubtitle = subtitle || description;

  return (
    <div className="w-full h-full">
      <Link
        href={`/services/${slug}`}
        className="group relative flex flex-col justify-end overflow-hidden rounded-[26px] cursor-pointer w-full h-[370px] md:h-[390px] shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#0B0F19]"
      >
        {/* Full-bleed background image */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={index < 4}
        />

        {/* Dark gradient overlay matching reference UI */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/95 via-[#080C14]/40 via-45% to-transparent pointer-events-none" />

        {/* Bottom content: title + subtitle on left, circular arrow button on right */}
        <div className="relative z-10 flex items-end justify-between gap-3 p-5 md:p-6 w-full">
          {/* Text Container */}
          <div className="flex-1 min-w-0 pr-1">
            <h3 className="text-white font-bold text-[18px] md:text-[20px] leading-snug tracking-tight font-helvetica drop-shadow-sm mb-1">
              {title}
            </h3>
            {displaySubtitle && (
              <p className="text-white/80 text-[12px] md:text-[13px] leading-snug font-normal drop-shadow-sm line-clamp-2">
                {displaySubtitle}
              </p>
            )}
          </div>

          {/* Gold circular arrow button */}
          <div className="shrink-0 w-10 h-10 rounded-full bg-[#E5A83B] flex items-center justify-center text-black shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F3BA35]">
            <ArrowUpRight size={19} strokeWidth={2.4} />
          </div>
        </div>
      </Link>
    </div>
  );
}
