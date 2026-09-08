// app/operations/page.tsx — Operations Page
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Globe, Plane } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessStep from "@/components/ui/ProcessStep";
import CTABanner from "@/components/ui/CTABanner";
import { airports, processSteps } from "@/data/company";
import { services } from "@/data/services";
import ServiceCard from "@/components/ui/ServiceCard";

export default function OperationsPage() {
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

      {/* ── OPERATIONAL NETWORK ──────────────────────────── */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-200">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left column — text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                label="Our Operational Network"
                title="Based in Ethiopia. Connected to Africa."
                light
              />
              <p className="text-midnight/80 leading-relaxed text-lg mb-8">
                We provide ground handling and flight support services at Addis Ababa and key
                airports across Ethiopia, with a vision for broader regional expansion.
              </p>

              {/* Ethiopia section */}
              <div className="card bg-white p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-warm-gold/10 flex items-center justify-center">
                    <Globe size={20} className="text-warm-gold" />
                  </div>
                  <h3 className="text-midnight font-bold text-lg">Ethiopia</h3>
                </div>

                {/* Airport list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {airports.map((airport) => (
                    <div
                      key={airport.code}
                      className={`flex items-center gap-3 py-2.5 px-3 rounded-lg ${
                        airport.isPrimary
                          ? "bg-warm-gold/10 border border-warm-gold/20"
                          : "bg-gray-100"
                      }`}
                    >
                      <MapPin
                        size={16}
                        className={airport.isPrimary ? "text-warm-gold" : "text-muted"}
                      />
                      <div>
                        <p className="text-midnight text-sm font-medium">
                          {airport.name}{" "}
                          <span className="text-muted text-xs">({airport.code})</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-muted text-xs mt-4 italic">
                  Additional airports may be available upon request.
                </p>
              </div>
            </motion.div>

            {/* Right column — Map */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-2xl overflow-hidden bg-[#141414]/60 border border-white/5 flex items-center justify-center p-8"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none p-12">
                <Image 
                  src="/images/ethiopia-map.svg" 
                  alt="Ethiopia Map" 
                  fill
                  className="object-contain drop-shadow-[0_0_20px_rgba(217,164,65,0.15)]"
                />
              </div>

              {/* Addis Ababa Pin */}
              <div className="absolute top-[52%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-midnight/80 border border-warm-gold/30 backdrop-blur-sm mb-2 shadow-[0_0_20px_rgba(217,164,65,0.3)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-warm-gold shadow-[0_0_10px_rgba(217,164,65,1)] animate-pulse" />
                  </div>
                  <div className="text-center bg-midnight/80 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                    <p className="text-sm font-bold text-white leading-none mb-1">ADD</p>
                    <p className="text-[10px] text-white/60 leading-none">Addis Ababa Bole Intl</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FROM REQUEST TO DEPARTURE ────────────────────── */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-200">
        <div className="container-max">
          <SectionHeading
            label="Process"
            title="From Request to Departure"
            subtitle="A coordinated process for smooth operations."
            centered
            light
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
            {processSteps.map((step, i) => (
              <ProcessStep
                key={step.step}
                step={step.step}
                title={step.title}
                description={step.description}
                index={i}
                isLast={i === processSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSIONAL COORDINATION ────────────────────── */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-200">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#141414] rounded-2xl overflow-hidden border border-white/5">
            <div className="relative h-[300px] lg:h-auto w-full">
              <Image 
                src="/images/about_story.png" 
                alt="Marshaller" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-10 sm:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                Professional Coordination.<br/>Seamless Operations.
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                From the moment you request support to the moment you depart, we ensure everything is in place.
              </p>
              <div>
                <Link href="/contact" className="btn-outline">
                  REQUEST FLIGHT SUPPORT <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTABanner
        title="Our team is ready 24/7 to support your operation."
        subtitle="Contact our operations center for immediate assistance."
        buttonText="CONTACT OPERATIONS"
        buttonHref="/contact"
      />
    </>
  );
}
