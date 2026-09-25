// app/safety-quality/page.tsx — Safety & Quality Page
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Fraunces } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  CheckCircle2,
  ClipboardCheck,
  FileCheck,
  Lock,
  Plus,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import ContactSection from "@/components/ui/ContactSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Same display serif, grain texture, and corner-mark motif as the other
// pages — keeps this reading as the same site, not a fourth design pass.
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

// "99.8%" → { number: 99.8, suffix: "%" }. "24/7" → { number: 24, suffix: "/7" }.
// "Zero" has no leading digit, so it returns null and just fades in as text —
// no dishonest animation on a value that isn't actually a number.
function parseStatValue(value: string): { number: number; suffix: string } | null {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return null;
  return { number: parseFloat(match[1]), suffix: match[2] };
}

const commitments = ["IATA-Aligned Ground Procedures", "24/7 Safety Monitoring", "Continuous Training"];

const safetyPillars = [
  {
    icon: Shield,
    title: "Safety Management System",
    description:
      "Comprehensive SMS framework with proactive risk identification, hazard reporting, and continuous safety monitoring across all operations.",
    features: ["Risk Assessment", "Safety Audits", "Incident Reporting", "Preventive Measures"],
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliance",
    description:
      "Full adherence to ICAO Annex 6, IATA Ground Operations Manual (IGOM), and Ethiopian Civil Aviation Authority regulations.",
    features: ["ICAO Standards", "IATA Compliance", "Local Regulations", "Documentation"],
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description:
      "ISO-aligned quality management with regular audits, performance metrics, and customer satisfaction tracking.",
    features: ["Quality Audits", "Performance KPIs", "Customer Feedback", "Process Improvement"],
  },
  {
    icon: Lock,
    title: "Security Protocols",
    description:
      "Multi-layered security with access control, CCTV monitoring, personnel vetting, and cargo screening compliance.",
    features: ["Access Control", "Personnel Screening", "Cargo Security", "Surveillance"],
  },
  {
    icon: Users,
    title: "Training & Competency",
    description:
      "Comprehensive training programs covering safety procedures, equipment operation, emergency response, and customer service.",
    features: ["Initial Training", "Recurrent Training", "Emergency Drills", "Competency Checks"],
  },
  {
    icon: ClipboardCheck,
    title: "Operational Excellence",
    description:
      "Standardized procedures, ground support equipment maintenance, and adherence to manufacturer specifications.",
    features: ["SOPs", "Equipment Maintenance", "Performance Standards", "Best Practices"],
  },
];

const stats = [
  { value: "99.8%", label: "Safety Compliance Rate", icon: Target },
  { value: "24/7", label: "Safety Monitoring", icon: Shield },
  { value: "500+", label: "Hours Annual Training", icon: Users },
  { value: "Zero", label: "Accident Target", icon: TrendingUp },
];

function PillarRow({
  pillar,
  index,
  isOpen,
  onToggle,
}: {
  pillar: (typeof safetyPillars)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = pillar.icon;

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div className="reveal relative border-b border-[#073f67]/12" onMouseMove={handleMouseMove}>
      <button
        onClick={onToggle}
        className="relative flex w-full items-start gap-5 bg-[radial-gradient(220px_circle_at_var(--x,50%)_var(--y,50%),rgba(7,63,103,0.06),transparent_70%)] py-7 text-left transition-colors sm:gap-8"
      >
        <span className="hidden font-[family-name:var(--font-display)] text-[2.2rem] font-medium text-[#073f67]/25 sm:block sm:text-[2.6rem]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Icon size={18} className="mt-1 shrink-0 text-[#073f67] sm:hidden" strokeWidth={1.5} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <h4 className="font-[family-name:var(--font-display)] text-[1.15rem] font-medium leading-snug text-[#0b1620] sm:text-[1.25rem]">
              {pillar.title}
            </h4>
            <span
              className={`mt-1 shrink-0 text-[#073f67] transition-transform duration-300 ${isOpen ? "rotate-45" : ""
                }`}
            >
              <Plus size={18} />
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-[0.92rem] leading-7 text-[#3d4a55]">{pillar.description}</p>
        </div>
      </button>

      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-[420ms] ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden pb-7 pl-0 sm:pl-[4.6rem]">
          <p className="flex flex-wrap gap-x-2 gap-y-1 text-[0.82rem] text-[#6b7684]">
            {pillar.features.map((f, i) => (
              <span key={f} className="inline-flex items-center">
                {f}
                {i < pillar.features.length - 1 && <span className="ml-2 text-[#073f67]/30">·</span>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SafetyQualityPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [openPillar, setOpenPillar] = useState<number | null>(0);

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

      // Proof-point numbers count up — skips anything that isn't a number
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const parsed = parseStatValue(stats[i].value);
        if (!parsed) return;
        gsap.to(el, {
          textContent: parsed.number,
          duration: 1.6,
          ease: "power1.out",
          snap: { textContent: stats[i].value.includes(".") ? 0.1 : 1 },
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        });
      });
    }, pageRef);

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
        title="Safety & Quality Excellence"
        subtitle="Your Safety is Our Priority - Every Flight, Every Day"
        backgroundImage="/images/hero_safety.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Safety & Quality", href: "/safety-quality" },
        ]}
      />

      <div
        ref={pageRef}
        className={`relative bg-[#FAF8F3] text-[#1c2733] ${display.variable}`}
        style={{ backgroundImage: GRAIN_BG }}
      >
        {/* ── INTRODUCTION ─────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
              <div className="reveal relative max-w-lg">
                <span className="pointer-events-none absolute -left-2 -top-10 select-none font-[family-name:var(--font-display)] text-[7rem] font-medium text-[#073f67]/[0.06] sm:-top-14 sm:text-[9rem]">
                  01
                </span>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#073f67]">
                  Our Commitment
                </p>
                <span className="rule-draw mt-3 block h-px w-16 bg-[#073f67]/40" />
                <h1 className="mt-7 font-[family-name:var(--font-display)] text-[2.4rem] font-medium leading-[1.08] text-[#0b1620] sm:text-[3rem]">
                  Safety is not a feature.
                  <br />
                  It&rsquo;s our foundation.
                </h1>
                <p className="mt-6 text-[1.02rem] leading-8 text-[#3d4a55]">
                  At SABA Aviation, safety and quality are embedded in every aspect of our
                  operations. We maintain the highest international standards through rigorous
                  training, continuous monitoring, and unwavering commitment to excellence.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
                  {commitments.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[0.9rem] text-[#1c2733]">
                      <CheckCircle2 size={16} className="text-[#073f67]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal relative">
                <div className="pointer-events-none absolute -left-3 -top-3 h-full w-full rounded-[0.25rem] border border-[#073f67]/20">
                  <CornerMarks />
                </div>
                <div className="frame-reveal relative h-[320px] w-full overflow-hidden rounded-[0.25rem] sm:h-[400px] lg:h-[460px]">
                  <Image src="/images/about_story.png" alt="Safety operations" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* proof points */}
            <div
              ref={statsRef}
              className="reveal mt-16 grid grid-cols-2 divide-x divide-[#073f67]/15 border-y border-[#073f67]/15 sm:grid-cols-4"
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                const parsed = parseStatValue(stat.value);
                return (
                  <div key={stat.label} className="px-4 py-8 text-center first:pl-0 sm:first:pl-4">
                    <Icon size={16} className="mx-auto mb-3 text-[#073f67]" strokeWidth={1.5} />
                    <p className="font-[family-name:var(--font-display)] text-[1.7rem] font-medium text-[#073f67] sm:text-[2rem]">
                      {parsed ? (
                        <>
                          <span ref={(el) => { numberRefs.current[i] = el; }}>0</span>
                          {parsed.suffix}
                        </>
                      ) : (
                        stat.value
                      )}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#6b7684]">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SAFETY FRAMEWORK ─────────────────────────────── */}
        <section className="section-padding pt-20 pb-24">
          <div className="container-max">
            <div className="reveal relative mx-auto max-w-xl text-center">
              <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 select-none font-[family-name:var(--font-display)] text-[7rem] font-medium text-[#073f67]/[0.06] sm:-top-14 sm:block sm:text-[9rem]">
                02
              </span>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#073f67]">
                Six Pillars of Excellence
              </p>
              <span className="rule-draw mx-auto mt-3 block h-px w-16 bg-[#073f67]/40" />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-[2rem] font-medium leading-tight text-[#0b1620]">
                Our Safety Framework
              </h3>
              <p className="mt-3 text-[1rem] text-[#3d4a55]">
                A comprehensive approach to safety and quality management across all
                operations. Tap a pillar to see how it&rsquo;s put into practice.
              </p>
            </div>

            <div className="mt-14 border-t border-[#073f67]/12">
              {safetyPillars.map((pillar, i) => (
                <PillarRow
                  key={pillar.title}
                  pillar={pillar}
                  index={i}
                  isOpen={openPillar === i}
                  onToggle={() => setOpenPillar(openPillar === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <ContactSection />
    </>
  );
}