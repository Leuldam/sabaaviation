"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  breadcrumbs?: { label: string; href: string }[];
  children?: React.ReactNode;
  topBar?: React.ReactNode;
  fullHeight?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  backgroundVideo,
  breadcrumbs,
  children,
  topBar,
  fullHeight = false,
}: HeroSectionProps) {
  const isVideo = Boolean(backgroundVideo);
  const videoSrc = backgroundVideo;

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
    <section ref={sectionRef} className={`relative ${fullHeight ? "h-[100svh] min-h-[100svh]" : "min-h-[50vh]"} flex items-stretch overflow-hidden`}>
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
      ) : backgroundImage ? (
        <Image
          src={backgroundImage}
          alt={typeof title === "string" ? title : "Hero background"}
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      ) : null}

      <div className="hero-overlay" />

      {fullHeight && (
        <>
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            style={{ opacity: scrollIndicatorOpacity }}
          >


            <motion.div
              className="absolute bottom-5 left-5 z-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              style={{ opacity: scrollIndicatorOpacity }}
            >

            </motion.div>
          </motion.div></>
      )}

      <motion.div
        className={`relative z-10 container-max w-full h-full flex flex-col ${fullHeight ? "justify-end lg:justify-between" : "justify-end"} pb-10 sm:pb-12 lg:pb-10 px-8 sm:px-12 lg:px-16 xl:px-20 pt-32 lg:pt-28`}
        style={fullHeight ? { y: contentY, opacity: contentOpacity } : undefined}
      >
        {/* ── Top bar (optional) ── */}
        {topBar && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="w-full mb-6 lg:mb-8"
          >
            {topBar}
          </motion.div>
        )}

        {/* ── Title + subtitle group ── */}
        <div className="flex flex-col items-start text-left w-full">
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl lg:max-w-5xl mb-5 sm:mb-6 lg:mb-7 text-left"
          >
            {typeof title === "string" ? (
              <h1 className="text-4xl leading-[0.92] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-helvetica font-bold uppercase tracking-wide text-white">
                {title}
              </h1>
            ) : (
              title
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm lg:text-sm font-montserrat font-normal tracking-wide text-white/70 max-w-md lg:max-w-lg leading-relaxed text-left mb-8 sm:mb-10 lg:mb-10"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* ── Bottom group: CTA + trust badges ── */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
