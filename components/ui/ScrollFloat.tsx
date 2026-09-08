// components/ui/ScrollFloat.tsx
// Reusable GSAP scroll-driven float-up animation for any content
"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ScrollFloatProps {
  children: React.ReactNode;
  /** How far up the element floats (px). Default 60 */  
  distance?: number;
  /** Scrub lag in seconds. Higher = heavier. Default 1.2 */
  scrub?: number;
  /** Fade out while floating? Default false */
  fadeOut?: boolean;
  /** Initial entry animation? Default true */
  animateIn?: boolean;
  /** Delay for entry animation in seconds */
  delay?: number;
  /** className for the wrapper div */
  className?: string;
  /** Element tag. Default "div" */
  as?: keyof JSX.IntrinsicElements;
}

export default function ScrollFloat({
  children,
  distance = 60,
  scrub = 1.2,
  fadeOut = false,
  animateIn = true,
  delay = 0,
  className = "",
  as: Tag = "div",
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let ctx: { revert: () => void } | undefined;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = ref.current;
      if (!el) return;

      ctx = gsap.context(() => {
        // Entry animation — slide up + fade in when scrolled into view
        if (animateIn) {
          gsap.fromTo(
            el,
            { y: distance * 0.8, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              ease: "power3.out",
              delay,
              scrollTrigger: {
                trigger: el,
                start: "top 95%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Continuous scroll float — element rises as user scrolls through it
        gsap.to(el, {
          y: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        });

        // Optional fade out at end
        if (fadeOut) {
          gsap.to(el, {
            opacity: 0,
            ease: "power1.in",
            scrollTrigger: {
              trigger: el,
              start: "center 20%",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }, el);
    };

    init();
    return () => { ctx?.revert(); };
  }, [distance, scrub, fadeOut, animateIn, delay]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
