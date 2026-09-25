// app/operations/page.tsx — Operations Page
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Fraunces } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Globe, MapPin } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import ProcessStep from "@/components/ui/ProcessStep";
import { airports, processSteps } from "@/data/company";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Same display serif and grain texture as the About page — keeps the two
// pages reading as one site rather than two different design passes.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.045 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function CornerMarks() {
  return (
    <>
      <span className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-[#073f67]/60" />
      <span className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-[#073f67]/60" />
      <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-[#073f67]/60" />
      <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-[#073f67]/60" />
    </>
  );
}

export default function OperationsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rule-draw").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".frame-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 0 100%)" },
          {
            clipPath: "inset(0 0 0 0%)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });

      // Process steps stagger in together rather than one at a time
      gsap.fromTo(
        ".process-step",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".process-grid", start: "top 82%" },
        }
      );
    }, pageRef);

    // Recalculate trigger positions once the display font and images
    // finish loading — both reflow the page after this effect first runs.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready?.then(refresh);
    window.addEventListener("load", refresh);
    const safetyNet = setTimeout(refresh, 500);

    return () => {
      ctx.revert();
      window.removeEventListener("load", refresh);
      clearTimeout(safetyNet);
    };
  }, []);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        title="Operations"
        subtitle="Seamless Coordination. Every Step of the Way."
        backgroundImage="/images/hero_operations.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Operations", href: "/operations" },
        ]}
      />

      <div
        ref={pageRef}
        className={`relative bg-[#FAF8F3] text-[#1c2733] ${display.variable}`}
        style={{ backgroundImage: GRAIN_BG }}
      >
        {/* ── OPERATIONAL NETWORK ──────────────────────────── */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
              <div className="reveal">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#073f67]">
                  Our Operational Network
                </p>
                <span className="rule-draw mt-3 block h-px w-16 bg-[#073f67]/40" />
                <h2 className="mt-6 font-[family-name:var(--font-display)] text-[2rem] font-medium leading-tight text-[#0b1620] sm:text-[2.4rem]">
                  Based in Ethiopia. Connected to Africa.
                </h2>
                <p className="mt-5 max-w-md text-[1rem] leading-8 text-[#3d4a55]">
                  We provide integrated airport facilitation and operational coordination
                  at Addis Ababa and key airports across Ethiopia, with a vision for
                  broader regional expansion.
                </p>

                <div className="mt-10">
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-[#073f67]" />
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#073f67]">
                      Ethiopia
                    </p>
                  </div>

                  <div className="mt-4 divide-y divide-[#073f67]/12 border-t border-[#073f67]/12">
                    {airports.map((airport) => (
                      <div key={airport.code} className="flex items-center gap-3 py-3">
                        <MapPin size={14} className="shrink-0 text-[#073f67]" />
                        <p className="text-[0.95rem] text-[#1c2733]">
                          {airport.name}{" "}
                          <span className="text-[#6b7684]">({airport.code})</span>
                          {airport.isPrimary && (
                            <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#073f67]">
                              Primary hub
                            </span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-[0.8rem] italic text-[#6b7684]">
                    Additional airports may be available upon request.
                  </p>
                </div>
              </div>

              {/* Map panel */}
              <div className="reveal relative">
                <div className="pointer-events-none absolute -left-3 -top-3 h-full w-full rounded-[0.3rem] border border-[#073f67]/20">
                  <CornerMarks />
                </div>
                <div className="relative flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[0.3rem] border border-[#073f67]/15 bg-white p-6 sm:h-[400px] sm:p-8 lg:h-[480px]">
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-10 opacity-70 sm:p-12">
                    <Image
                      src="/images/ethiopia-map.svg"
                      alt="Ethiopia Map"
                      fill
                      className="object-contain"
                      style={{ filter: "grayscale(1) contrast(0.9)" }}
                    />
                  </div>

                  <div className="absolute left-[48%] top-[52%] z-10 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex flex-col items-center">
                      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-[#073f67]/30 bg-white shadow-[0_4px_20px_rgba(7,63,103,0.15)]">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#073f67]/50" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#073f67]" />
                        </span>
                      </div>
                      <div className="rounded-md border border-[#073f67]/15 bg-white px-3 py-1.5 text-center shadow-sm">
                        <p className="font-[family-name:var(--font-display)] text-sm font-medium leading-none text-[#0b1620]">
                          ADD
                        </p>
                        <p className="mt-1 text-[10px] leading-none text-[#6b7684]">
                          Addis Ababa Bole Intl
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ───────────────────────────────────────── */}
        <section className="section-padding pt-4">
          <div className="container-max">
            <div className="reveal mx-auto max-w-xl text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#073f67]">
                Process
              </p>
              <span className="rule-draw mx-auto mt-3 block h-px w-16 bg-[#073f67]/40" />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-[2rem] font-medium leading-tight text-[#0b1620]">
                From request to departure.
              </h3>
              <p className="mt-3 text-[1rem] text-[#3d4a55]">
                A coordinated process for smooth operations.
              </p>
            </div>

            <div className="process-grid mt-14 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {processSteps.map((step, i) => (
                <div key={step.step} className="process-step">
                  <ProcessStep
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    index={i}
                    isLast={i === processSteps.length - 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROFESSIONAL COORDINATION ─────────────────────── */}
        <section className="section-padding pt-4 pb-24">
          <div className="container-max">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
              <div className="reveal relative">
                <div className="pointer-events-none absolute -left-3 -top-3 h-full w-full rounded-[0.25rem] border border-[#073f67]/20">
                  <CornerMarks />
                </div>
                <div className="frame-reveal relative h-[280px] w-full overflow-hidden rounded-[0.25rem] sm:h-[340px] lg:h-[400px]">
                  <Image
                    src="/images/about_story.png"
                    alt="Ground crew marshaller"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="reveal">
                <h2 className="font-[family-name:var(--font-display)] text-[1.9rem] font-medium leading-tight text-[#0b1620] sm:text-[2.3rem]">
                  Professional coordination.
                  <br />
                  Seamless operations.
                </h2>
                <p className="mt-5 max-w-md text-[1rem] leading-8 text-[#3d4a55]">
                  From the moment you request support to the moment you depart, we ensure
                  everything is in place.
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 border-b border-[#073f67] pb-1 text-[0.95rem] font-medium text-[#073f67] transition-opacity hover:opacity-70"
                >
                  Contact Flight Support <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}