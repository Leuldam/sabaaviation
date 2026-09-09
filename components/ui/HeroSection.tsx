"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  breadcrumbs?: { label: string; href: string }[];
  children?: React.ReactNode;
  fullHeight?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage = "/images/hero_home.png",
  backgroundVideo,
  breadcrumbs,
  children,
  fullHeight = false,
}: HeroSectionProps) {
  const isVideo = Boolean(backgroundVideo || backgroundImage?.endsWith(".mp4"));
  const videoSrc = backgroundVideo || (backgroundImage?.endsWith(".mp4") ? backgroundImage : undefined);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.6], [0.85, 0.3]);
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    if (!isVideo || !videoSrc) return;
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      return smoothProgress.on("change", (progress) => {
        if (!video.duration || isNaN(video.duration)) return;
        const clampedProgress = Math.max(0, Math.min(progress, 1));
        const targetTime = clampedProgress * video.duration * 0.8;
        if (Math.abs(video.currentTime - targetTime) > 0.08) {
          video.currentTime = targetTime;
        }
      });
    };

    let cleanup: (() => void) | undefined;
    if (video.readyState >= 1) {
      cleanup = onLoaded();
    } else {
      const handleMetadata = () => { cleanup = onLoaded(); };
      video.addEventListener("loadedmetadata", handleMetadata);
      return () => {
        cleanup?.();
        video.removeEventListener("loadedmetadata", handleMetadata);
      };
    }

    return () => { cleanup?.(); };
  }, [isVideo, videoSrc, smoothProgress]);

  return (
    <section
      ref={sectionRef}
      className={`relative ${fullHeight ? "min-h-screen" : "min-h-[50vh]"} flex items-end overflow-hidden`}
    >
      {isVideo && videoSrc ? (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: videoScale, opacity: videoOpacity }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster={backgroundImage && !backgroundImage.endsWith(".mp4") ? backgroundImage : undefined}
            className="w-full h-full object-cover object-center pointer-events-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>
      ) : (
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      )}

      <div className="hero-overlay" />

      {fullHeight && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-white/40 text-[10px] tracking-[0.25em hidden md:block uppercase font-light">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}

      <motion.div
        className="relative z-10 container-max w-full pb-12 pl-6 pr-3 sm:pb-16 pt-24 sm:pt-32"
        style={fullHeight ? { y: contentY, opacity: contentOpacity } : undefined}
      >
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

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-8xl font-helvetica font-bold uppercase tracking-wide text-white max-w-base md:max-w-5xl lg:max-w-5xl leading-tight lg:leading-tight pb-6 lg:pb-19"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 sm:mt-6 text-xs sm:text-lg md:text-lg lg:text-[15px]  pb-7 lg:pb-2 font-montserrat font-light tracking-wider uppercase text-white/50 max-w-0xl text-balance"
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
