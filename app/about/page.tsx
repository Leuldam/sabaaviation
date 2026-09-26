// app/about/page.tsx — About Page
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Fraunces } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Eye, Linkedin, Mail, Target } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import { story, mission, vision, values, team, stats } from "@/data/company";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Display serif — carries the "premium/elegant" register on every headline.
// Body copy stays on the site's existing sans throughout.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const BLUE = "#073f67";

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Signature move, repeated everywhere: a hairline rule drawing left→right.
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

      // Quiet fade + rise for text blocks and rows.
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

      // A single curtain-style reveal for framed photography.
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

      // The four proof-point numbers count up once, together.
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i]?.value ?? 0;
        gsap.to(el, {
          textContent: target,
          duration: 1.6,
          ease: "power1.out",
          snap: { textContent: 1 },
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        });
      });
    }, pageRef);

    // Trigger positions are calculated as soon as this effect runs — but the
    // Fraunces display font swapping in, and images finishing their load,
    // both reflow the page afterward and can leave every ScrollTrigger start
    // point pointing at the wrong place. Recalculate once things settle.
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
        title="About Saba"
        subtitle="Built for Modern Aviation Operations"
        backgroundImage="/images/abouthome.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      <div ref={pageRef} className={`bg-[#FAF8F3] text-[#1c2733] ${display.variable}`}>
        {/* ── STORY ────────────────────────────────────────── */}
        <section className="section-padding pb-10">
          <div className="container-max">
            <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-14 xl:gap-20 items-center">
              <div className="reveal max-w-lg">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#073f67]">
                  Our Story
                </p>
                <span className="rule-draw mt-3 block h-px w-16 bg-[#073f67]/40" />

                <h1
                  className="mt-7 font-[family-name:var(--font-display)] text-[2.6rem] font-medium leading-[1.05] text-[#0b1620] sm:text-[3.2rem]"
                >
                  Built for confident aviation operations.
                </h1>

                <p className="mt-6 text-[1.05rem] leading-8 text-[#3d4a55]">
                  {story.content}
                </p>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute -left-4 -top-4 h-full w-full rounded-[0.25rem] border border-[#073f67]/25" />
                <div className="frame-reveal relative h-[440px] overflow-hidden rounded-[0.25rem]">
                  <Image
                    src="/images/aboutstory.png"
                    alt="SABA Aviation team"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* proof points — a quiet masthead strip, no boxes */}
            <div
              ref={statsRef}
              className="reveal mt-16 grid grid-cols-2 divide-x divide-[#073f67]/15 border-y border-[#073f67]/15 sm:grid-cols-4"
            >
              {stats.map((s, i) => (
                <div key={s.label} className="px-4 py-6 text-center first:pl-0 sm:first:pl-4">
                  <p className="font-[family-name:var(--font-display)] text-[2rem] font-medium text-[#073f67] sm:text-[2.3rem]">
                    <span ref={(el) => { numberRefs.current[i] = el; }}>0</span>
                    {s.suffix}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#6b7684]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION & VISION ─────────────────────────────── */}
        <section className="section-padding pt-16">
          <div className="container-max">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:divide-x md:divide-[#073f67]/15">
              <div className="reveal md:pr-12">
                <div className="flex items-center gap-2">
                  <Target size={14} className="text-[#073f67]" />
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#073f67]">
                    Our Mission
                  </p>
                </div>
                <span className="rule-draw mt-3 block h-px w-16 bg-[#073f67]/40" />
                <h3 className="mt-6 font-[family-name:var(--font-display)] text-[1.9rem] font-medium leading-tight text-[#0b1620]">
                  {mission.title}
                </h3>
                <p className="mt-4 max-w-md text-[1rem] leading-8 text-[#3d4a55]">
                  {mission.content}
                </p>
              </div>

              <div className="reveal md:pl-12">
                <div className="flex items-center gap-2">
                  <Eye size={14} className="text-[#073f67]" />
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#073f67]">
                    Our Vision
                  </p>
                </div>
                <span className="rule-draw mt-3 block h-px w-16 bg-[#073f67]/40" />
                <h3 className="mt-6 font-[family-name:var(--font-display)] text-[1.9rem] font-medium leading-tight text-[#0b1620]">
                  {vision.title}
                </h3>
                <p className="mt-4 max-w-md text-[1rem] leading-8 text-[#3d4a55]">
                  {vision.content}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ───────────────────────────────────────── */}
        <section className="section-padding pt-20">
          <div className="container-max">
            <div className="reveal max-w-lg">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#073f67]">
                Our Values
              </p>
              <span className="rule-draw mt-3 block h-px w-16 bg-[#073f67]/40" />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-[2rem] font-medium leading-tight text-[#0b1620]">
                The values behind every safe, precise turn.
              </h3>
            </div>

            <div className="mt-12 divide-y divide-[#073f67]/12 border-t border-[#073f67]/12">
              {values.map((v, i) => (
                <div
                  key={v.label}
                  className="reveal grid grid-cols-[3.5rem_1fr] items-baseline gap-6 py-7 sm:grid-cols-[5rem_1fr]"
                >
                  <span className="font-[family-name:var(--font-display)] text-[2.2rem] font-medium text-[#073f67]/25 sm:text-[2.6rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-[14rem_1fr] sm:gap-6">
                    <h4 className="font-[family-name:var(--font-display)] text-[1.2rem] font-medium text-[#0b1620]">
                      {v.label}
                    </h4>
                    <p className="text-[0.98rem] leading-7 text-[#3d4a55]">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEADERSHIP ───────────────────────────────────── */}
        <section className="section-padding pt-20 pb-24">
          <div className="container-max">
            <div className="reveal max-w-lg">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#073f67]">
                Our Team
              </p>
              <span className="rule-draw mt-3 block h-px w-16 bg-[#073f67]/40" />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-[2rem] font-medium leading-tight text-[#0b1620]">
                Leadership shaped by decades in the skies.
              </h3>
            </div>

            <div className="mt-14 divide-y divide-[#073f67]/12 border-t border-[#073f67]/12">
              {team.map((member, i) => (
                <div
                  key={member.name}
                  className="reveal grid grid-cols-1 gap-8 py-12 sm:grid-cols-[15rem_1fr] sm:gap-12"
                  style={{ direction: i % 2 === 1 ? "rtl" : "ltr" }}
                >
                  <div className="relative" style={{ direction: "ltr" }}>
                    <div className="pointer-events-none absolute -left-3 -top-3 h-full w-full rounded-[0.2rem] border border-[#073f67]/20" />
                    <div className="frame-reveal relative aspect-[4/5] w-full max-w-[15rem] overflow-hidden rounded-[0.2rem]">
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    </div>
                  </div>

                  <div style={{ direction: "ltr" }}>
                    <h4 className="font-[family-name:var(--font-display)] text-[1.5rem] font-medium text-[#0b1620]">
                      {member.name}
                    </h4>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#073f67]">
                      {member.role}
                    </p>
                    <p className="mt-4 max-w-xl text-[0.98rem] leading-7 text-[#3d4a55]">
                      {member.bio}
                    </p>

                    <div className="mt-5 flex items-center gap-5">
                      <span className="inline-flex items-center gap-1.5 text-[0.85rem] text-[#6b7684]">
                        <Briefcase size={13} className="text-[#073f67]" />
                        {member.experience} experience
                      </span>
                      {member.linkedin && (
                        <Link
                          href={member.linkedin}
                          aria-label={`${member.name} on LinkedIn`}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#073f67]/25 text-[#073f67] transition-colors hover:bg-[#073f67] hover:text-white"
                        >
                          <Linkedin size={13} />
                        </Link>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          aria-label={`Email ${member.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#073f67]/25 text-[#073f67] transition-colors hover:bg-[#073f67] hover:text-white"
                        >
                          <Mail size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}