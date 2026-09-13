// app/services/page.tsx — Services Page
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import ServiceCard from "@/components/ui/ServiceCard";
import CTABanner from "@/components/ui/CTABanner";
import ScrollFloat from "@/components/ui/ScrollFloat";
import { services } from "@/data/services";

const highlights = [
  "24/7 Operational Support",
  "IATA & ISAGO Compliant",
  "Multilingual Ground Teams",
  "Trusted by Global Airlines",
  "Covering All Major Ethiopian Airports",
  "End-to-End Coordination",
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

      {/* ── INTRO ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-white to-gray-200">
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollFloat distance={100} scrub={1.5}>
                <p className="section-label font-helvetica text-[#073f67]">What We Offer</p>
                <h2 className="text-3xl md:text-4xl font-bold text-midnight tracking-tight mb-6">
                  Seamless Aviation Support,{" "}
                  <span className="text-[#073f67]">Every Step of the Way.</span>
                </h2>
                <p className="text-midnight/70 leading-relaxed text-base mb-8">
                  SABA Aviation Service & Flight Support PLC delivers a full spectrum of aviation
                  ground support and flight operations services in Ethiopia. From the moment your
                  aircraft touches down to the moment it takes off, we handle every detail with
                  precision and professionalism.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-[#073f67] shrink-0" />
                      <span className="text-midnight/80 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollFloat>

              <ScrollFloat distance={80} scrub={1.8} delay={0.1}>
                <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero_services.png"
                    alt="SABA Aviation Services"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Stats overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 grid grid-cols-3 gap-4">
                    {[
                      { num: "8+", label: "Core Services" },
                      { num: "24/7", label: "Operations" },
                      { num: "100%", label: "Compliance" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-[#073f67] font-bold text-2xl">{stat.num}</p>
                        <p className="text-white/70 text-xs uppercase tracking-wider">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollFloat>
            </div>
          </div>
        </section>

        {/* ── SERVICE GRID ──────────────────────────────────── */}
        <section className="section-padding pt-0">
          <div className="container-max">
            <ScrollFloat distance={80} scrub={1.5}>
              <div className="text-center mb-14">
                <p className="section-label font-helvetica text-[#073f67]">All Services</p>
                <h2 className="text-3xl md:text-4xl font-bold text-midnight tracking-tight">
                  Everything You Need, In One Place
                </h2>
                <p className="mt-3 text-muted text-base max-w-2xl mx-auto">
                  From flight permits and ramp operations to VIP concierge and cargo logistics — we
                  cover the full aviation support spectrum.
                </p>
              </div>
            </ScrollFloat>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/hero_safety.png"
                alt="Safety"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
              <div className="relative z-10 p-10 md:p-16 lg:p-20">
                <div className="max-w-2xl">
                  <p className="section-label text-[#073f67]">Why SABA</p>
                  <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
                    The Aviation Partner You Can Trust.
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-8 text-base">
                    With deep local knowledge, world-class standards, and a dedicated team on the
                    ground 24/7, SABA Aviation is your single point of contact for all aviation
                    support needs in Ethiopia.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/contact" className="btn-primary">
                      Contact Us <ArrowRight size={16} />
                    </Link>
                    <Link href="/safety-quality" className="btn-outline text-white">
                      Our Safety Standards
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

     
    </>
  );
}
