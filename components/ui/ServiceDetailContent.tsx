"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  Mail,
  CalendarCheck,
  Plane,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceDetailContentProps {
  service: {
    title: string;
    description: string;
    slug: string;
    image: string;
    details: {
      longDescription: string;
      features: string[];
      benefits: string[];
    };
    icon: React.ReactNode;
  };
}

// Two-colour system only — navy and white. Every value on the page
// derives from these three tokens.
const NAVY = "#073f67";
const NAVY_DEEP = "#04263f";
const BLUE = "#1d6fa5";

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const routeLineRef = useRef<HTMLDivElement>(null);
  const routePlaneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero — plays once on load, in order ──
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".hero-badge", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(".hero-title", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.35")
        .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.45")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.45");

      // ── Flight-path divider — draws in as it enters the viewport ──
      gsap.fromTo(
        routeLineRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: routeLineRef.current, start: "top 85%" },
        }
      );
      gsap.fromTo(
        routePlaneRef.current,
        { left: "0%" },
        {
          left: "calc(100% - 18px)",
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: routeLineRef.current, start: "top 85%" },
        }
      );

      // ── Generic scroll-triggered reveal for standalone elements ──
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // ── Scroll-triggered stagger for list/grid groups ──
      gsap.utils.toArray<HTMLElement>(".reveal-list").forEach((list) => {
        const items = list.querySelectorAll(".reveal-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: list, start: "top 85%" },
          }
        );
      });

      // ── Breathing glow behind every "Book This Service" CTA ──
      gsap.fromTo(
        ".cta-glow",
        { opacity: 0.32, scale: 1 },
        { opacity: 0, scale: 1.35, duration: 1.3, repeat: -1, yoyo: true, ease: "sine.inOut" }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bg-white">
      {/* ── Top bar ────────────────────────────────────────── */}


      {/* ── Hero — text only: what the service is, and how to book it ── */}
      <section className="container-max px-5 sm:px-10 pt-8 sm:pt-16 pb-16 sm:pb-20">
        <p className="hero-desc text-[#04263f]/60 text-base sm:text-lg leading-[1.8] max-w-2xl mt-4">
          {service.details.longDescription}
        </p>

        <div className="hero-cta flex flex-wrap items-center gap-x-6 gap-y-3 mt-9">
          <span className="relative inline-flex">
            <span className="cta-glow absolute inset-0 rounded-full" style={{ backgroundColor: NAVY }} />
            <Link
              href={`/booking/${service.slug}`}
              className="group relative inline-flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-lg hover:shadow-[#073f67]/25"
              style={{ backgroundColor: NAVY }}
            >
              <CalendarCheck size={14} />
              Book This Service
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </span>
          <a
            href="tel:+251000000000"
            className="inline-flex items-center gap-2 text-[#073f67]/70 text-xs font-semibold uppercase tracking-widest hover:text-[#073f67] transition-colors"
          >
            <Phone size={13} /> Speak with Operations
          </a>
        </div>
      </section>

      {/* ── Flight-path divider — signature GSAP moment ─────────── */}
      <div className="container-max px-5 sm:px-10">
        <div className="relative h-14 sm:h-16 flex items-center">
          <div className="absolute left-0 right-0 border-t border-dashed border-[#073f67]/15" />
          <div ref={routeLineRef} className="absolute left-0 top-1/2 h-px bg-[#073f67]/60" style={{ width: 0 }} />
          <div ref={routePlaneRef} className="absolute top-1/2 -translate-y-1/2" style={{ left: 0 }}>
            <Plane size={18} className="text-[#073f67] rotate-90" />
          </div>
        </div>
      </div>

      {/* ── Features — manifest list, not a card grid ──────────── */}
      <section className="bg-[#073f67]/[0.03]">
        <div className="container-max px-5 sm:px-10 py-20 sm:py-24">
          <h2 className="reveal text-2xl sm:text-3xl font-bold text-[#04263f] tracking-tight mb-8 sm:mb-10">
            Key service features
          </h2>

          <div className="reveal-list">
            {service.details.features.map((feature, i) => (
              <div
                key={i}
                className="reveal-item group grid grid-cols-[2.25rem_1fr_1.25rem] sm:grid-cols-[3rem_1fr_1.5rem] items-center gap-2 sm:gap-4 py-4 sm:py-5 border-b border-[#073f67]/10 hover:bg-white transition-colors px-3 -mx-3 rounded-lg"
              >
                <span className="tabular-nums text-xs sm:text-sm font-semibold text-[#073f67]/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm sm:text-base text-[#04263f]/85 font-medium leading-relaxed">
                  {feature}
                </p>
                <Check
                  size={16}
                  className="text-[#073f67] justify-self-end opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits + flight-status stats panel ───────────────── */}
      <section className="container-max px-5 sm:px-10 py-20 sm:py-24">
        <div
          className="rounded-2xl sm:rounded-[28px] overflow-hidden"
          style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)` }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — benefits */}
            <div className="p-7 sm:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <h2 className="reveal text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-7 sm:mb-8">
                  Why choose SABA
                </h2>

                <div className="reveal-list">
                  {service.details.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="reveal-item flex items-start gap-3 py-3 border-b border-white/10 last:border-b-0"
                    >
                      <div className="w-5 h-5 rounded-full border border-white/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold text-white/85">{i + 1}</span>
                      </div>
                      <p className="text-white/85 text-sm leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal mt-9 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="relative inline-flex">
                  <span className="cta-glow absolute inset-0 rounded-full bg-white" />
                  <Link
                    href={`/booking/${service.slug}`}
                    className="group relative inline-flex items-center gap-2 bg-white text-[#073f67] text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/20"
                  >
                    <CalendarCheck size={14} />
                    Book This Service
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </span>

              </div>
            </div>

            {/* Right — flight-status style stats board */}
            <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-7 sm:p-12 lg:p-14 flex flex-col justify-center">


              <div className="reveal-list grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8">
                {[
                  { num: "24/7", label: "Desk availability" },
                  { num: "ICAO", label: "Compliant procedures" },
                  { num: "100%", label: "Single point of contact" },
                  { num: "HAAB", label: "Bole International hub" },
                ].map(({ num, label }, i) => (
                  <div key={i} className="reveal-item border-t border-white/15 pt-3 sm:pt-4">
                    <div className="tabular-nums text-2xl sm:text-3xl font-bold text-white">{num}</div>
                    <p className="text-white/55 text-xs sm:text-sm leading-snug mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related services — minimal list, not boxed cards ───── */}
      <section className="container-max px-5 sm:px-10 pb-28 sm:pb-24">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#04263f] tracking-tight">Other services</h3>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-[#073f67] text-xs font-semibold uppercase tracking-widest hover:opacity-60 transition-opacity"
          >
            View all <ArrowRight size={13} />
          </Link>
        </div>

        <div className="reveal-list">
          {[
            { label: "Ground Operations", href: "/services/ground-handling", desc: "Turnaround oversight & ramp handling" },
            { label: "VIP & Crew Logistics", href: "/services/vip-business-aviation", desc: "Premium crew & executive support" },
            { label: "Cargo Facilitation", href: "/services/cargo-logistics", desc: "Secure, compliant freight movements" },
          ].map((item, i) => (
            <div key={i} className="reveal-item border-b border-[#073f67]/10 first:border-t">
              <Link
                href={item.href}
                className="group flex items-center justify-between py-5 px-3 -mx-3 rounded-lg hover:bg-[#073f67]/[0.03] transition-colors"
              >
                <div>
                  <p className="text-sm sm:text-base font-semibold text-[#04263f] group-hover:text-[#073f67] transition-colors mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-xs sm:text-sm text-[#04263f]/45">{item.desc}</p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-[#073f67] flex-shrink-0 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sticky mobile booking bar ───────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-[#073f67]/10 px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-[#04263f]/40 truncate">{service.title}</p>
          <p className="text-xs font-semibold text-[#073f67]">Reserve your slot</p>
        </div>
        <span className="relative inline-flex flex-shrink-0">
          <span className="cta-glow absolute inset-0 rounded-full" style={{ backgroundColor: NAVY }} />
          <Link
            href={`/booking/${service.slug}`}
            className="relative inline-flex items-center gap-1.5 text-white text-xs font-semibold uppercase tracking-widest px-5 py-3 rounded-full shadow-md"
            style={{ backgroundColor: NAVY }}
          >
            <CalendarCheck size={13} /> Book Now
          </Link>
        </span>
      </div>
    </div>
  );
}