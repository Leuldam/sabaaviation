// app/services/page.tsx — Services Page
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Fraunces } from "next/font/google";
import HeroSection from "@/components/ui/HeroSection";
import ServiceCard from "@/components/ui/ServiceCard";
import ScrollFloat from "@/components/ui/ScrollFloat";
import { services } from "@/data/services";

// Same display serif as the rest of the site. This page already had its own
// scroll-animation component (ScrollFloat) wired up and working, so — unlike
// the other pages — it keeps that instead of a duplicated GSAP setup.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.045 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const highlights = [
  "24/7 Operational Support",
  "IATA-Aligned Ground Handling",
  "Multilingual Ground Teams",
  "Trusted by Global Airlines",
  "Covering All Major Ethiopian Airports",
  "End-to-End Coordination",
];

const bookingSteps = [
  { step: "01", label: "Choose a service" },
  { step: "02", label: "Share your details" },
  { step: "03", label: "Confirmed in minutes" },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        title="Our Services"
        subtitle="End-to-End Aviation Support, Professionally Delivered."
        backgroundImage="/images/hero_services.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      <div
        className={`relative bg-[#FAF8F3] ${display.variable}`}
        style={{ backgroundImage: GRAIN_BG }}
      >
        {/* ── INTRO ─────────────────────────────────────────── */}
        <section className="section-padding pb-10">
          <div className="container-max">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <ScrollFloat distance={100} scrub={1.5}>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#073f67]">
                  What We Offer
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[1.9rem] font-medium leading-tight text-[#0b1620] sm:text-[2.4rem]">
                  Seamless aviation support, every step of the way.
                </h2>
                <p className="mt-5 max-w-md text-[0.98rem] leading-7 text-[#3d4a55]">
                  Integrated airport support and facilitation across Ethiopia — from touchdown
                  to takeoff, coordinated with safety and professionalism.
                </p>

                <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="shrink-0 text-[#073f67]" />
                      <span className="text-[0.88rem] font-medium text-[#1c2733]">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/booking" className="btn-primary mt-8 w-full justify-center sm:w-fit">
                  Book a Service <ArrowRight size={16} />
                </Link>
              </ScrollFloat>

              <ScrollFloat distance={80} scrub={1.8} delay={0.1}>
                <div className="relative h-[320px] w-full overflow-hidden rounded-[0.3rem] sm:h-[400px] lg:h-[450px]">
                  <Image
                    src="/images/hero_services.png"
                    alt="SABA Aviation Services"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031827]/85 via-[#031827]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-4 p-6">
                    {[
                      { num: "8+", label: "Core Services" },
                      { num: "24/7", label: "Operations" },
                      { num: "100%", label: "Compliance" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="font-[family-name:var(--font-display)] text-xl font-medium text-white sm:text-2xl">
                          {stat.num}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-wider text-white/70">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollFloat>
            </div>
          </div>
        </section>

        {/* ── HOW BOOKING WORKS ─────────────────────────────── */}
        <section className="section-padding pt-0 pb-10">
          <div className="container-max">
            <ScrollFloat distance={60} scrub={1.4}>
              <div className="flex flex-col items-start justify-between gap-6 border-y border-[#073f67]/12 py-8 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                  {bookingSteps.map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <span className="font-[family-name:var(--font-display)] text-[1.3rem] font-medium text-[#073f67]/40">
                        {s.step}
                      </span>
                      <span className="text-[0.88rem] font-medium text-[#1c2733]">{s.label}</span>
                    </div>
                  ))}
                </div>
                <Link href="/booking" className="btn-primary w-full justify-center sm:w-fit">
                  Start Booking <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollFloat>
          </div>
        </section>

        {/* ── SERVICE GRID ──────────────────────────────────── */}
        <section className="section-padding pt-0">
          <div className="container-max">
            <ScrollFloat distance={80} scrub={1.5}>
              <div className="mb-14 text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#073f67]">
                  All Services
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[1.9rem] font-medium leading-tight text-[#0b1620] sm:text-[2.4rem]">
                  Everything you need, in one place.
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-[0.95rem] text-[#3d4a55]">
                  Tap any service below to see details and book in under 2 minutes.
                </p>
              </div>
            </ScrollFloat>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.slug}
                  slug={service.slug}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  index={i}
                  tall={i % 2 === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ─────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-max">
            <div className="relative overflow-hidden rounded-[0.3rem]">
              <Image src="/images/hero_safety.png" alt="Safety" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#031827]/95 via-[#031827]/80 to-[#031827]/50" />
              <ScrollFloat distance={60} scrub={1.5}>
                <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20">
                  <div className="max-w-2xl">
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#a9c9de]">
                      Why SABA
                    </p>
                    <h2 className="mt-4 font-[family-name:var(--font-display)] text-[2rem] font-medium leading-tight text-white sm:text-[2.6rem]">
                      The aviation partner you can trust.
                    </h2>
                    <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-white/70">
                      Deep local knowledge, world-class standards, and a dedicated team on the
                      ground 24/7 — your single point of contact for aviation support in
                      Ethiopia.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-5">
                      <Link href="/booking" className="btn-primary w-full justify-center sm:w-fit">
                        Book a Service <ArrowRight size={16} />
                      </Link>
                      <Link
                        href="/safety-quality"
                        className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        Read about our safety standards →
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollFloat>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}