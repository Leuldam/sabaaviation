// app/page.tsx — Home Page
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Shield,
  Award,
  CheckCircle2,
  MapPin,
  Star,
  Users,
  FileCheck,
} from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import CTABanner from "@/components/ui/CTABanner";
import PartnerLogos from "@/components/ui/PartnerLogos";
import { services } from "@/data/services";

const safetyBadges = [
  { icon: Shield, label: "Safety First" },
  { icon: FileCheck, label: "Regulatory Compliance" },
  { icon: Award, label: "Operational Excellence" },
  { icon: Users, label: "Professional Team" },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        title="Precision on the Ground. Confidence in the Air."
        subtitle="Professional aviation ground handling and flight support services in Ethiopia."
        backgroundImage="/images/hero_home.png"
        fullHeight
      >
        <div className="flex flex-row flex-wrap sm:flex-nowrap gap-3 sm:gap-4 mb-8">
          <Link href="/services" className="btn-primary text-[10px] sm:text-xs px-4 sm:px-6">
            EXPLORE OUR SERVICES <ArrowRight size={14} className="sm:w-4 sm:h-4" />
          </Link>
          <Link href="/contact" className="btn-outline text-[10px] sm:text-xs px-4 sm:px-6">
            CONTACT US <ArrowRight size={14} className="sm:w-4 sm:h-4" />
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-row items-center justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10 w-full">
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center">
              <Clock size={16} className="text-warm-gold sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-white text-sm sm:text-lg font-semibold">24/7</p>
              <p className="text-white/50 text-[10px] sm:text-sm leading-tight">Operational<br className="sm:hidden" /> Support</p>
            </div>
          </div>
          
          <div className="w-px h-8 sm:h-12 bg-white/10 shrink-0" />

          <div className="text-right">
            <p className="text-white/70 text-xs sm:text-base leading-tight sm:leading-relaxed">
              Your Trusted Aviation Partner<br className="hidden sm:block" /> in Ethiopia
            </p>
          </div>
        </div>
      </HeroSection>

      {/* ── PARTNER LOGOS ────────────────────────────────── */}
      <PartnerLogos />

      {/* ── ABOUT SECTION ────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-label">About SABA</p>
              <h2 className="text-3xl md:text-4xl font-bold text-midnight  mb-6 tracking-tight">
                Aviation Support,{" "}
                <span className="text-gradient-gold">Professionally Delivered.</span>
              </h2>
              <p className="text-midnight leading-relaxed mb-8">
                SABA Aviation Service & Flight Support PLC provides reliable, responsive and
                professionally coordinated aviation support services designed to keep aircraft, crew
                and passengers moving efficiently through Ethiopia.
              </p>
              <Link href="/about" className="btn-dark mt-4">
                LEARN MORE <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-sm overflow-hidden"
            >
              <Image
                src="/images/aboutim.png"
                alt="SABA Aviation team"
                fill
                className="object-cover"
              />
              {/* Subtle gold border accent */}
              <div className="absolute inset-0 rounded-xl border border-warm-gold/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ─────────────────────────────── */}
      <section className="section-padding bg-dark-navy">
        <div className="container-max">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="section-label">Our Services</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Comprehensive Aviation Services
              </h2>
              <p className="mt-3 text-muted text-lg max-w-xl">
                From flight support to VIP services, we provide end-to-end solutions for your
                aviation operation.
              </p>
            </div>
            <Link 
              href="/services" 
              className="group flex items-center gap-2 text-xs font-semibold tracking-widest pb-20 uppercase text-white/60 hover:text-white transition-colors"
            >
              VIEW ALL SERVICES <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.slice(0, 6).map((service, i) => (
              <ServiceCard
                key={service.slug}
                slug={service.slug}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── OPERATIONS / ETHIOPIA ─────────────────────────── */}
      <section className="section-padding bg-midnight">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-label">Operations</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                Supporting Aviation Operations in Ethiopia
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                We provide ground handling and flight support at Addis Ababa and other key airports
                across Ethiopia.
              </p>
              <Link 
                href="/operations" 
                className="group flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/60 hover:text-white transition-colors"
              >
                VIEW OUR OPERATIONS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-8 items-center bg-[#0D1B2A]/60 p-8 rounded-2xl border border-white/5"
            >
              {/* Map Graphic */}
              <div className="flex-1 relative aspect-square max-w-[280px] w-full mx-auto">
                <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none">
                  <Image 
                    src="/images/ethiopia-map.svg" 
                    alt="Ethiopia Map" 
                    fill
                    className="object-contain drop-shadow-[0_0_20px_rgba(217,164,65,0.15)]"
                  />
                </div>
                {/* Pin for ADD */}
                <div className="absolute top-[52%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-warm-gold shadow-[0_0_15px_rgba(217,164,65,0.8)] animate-pulse" />
                    <div className="text-left">
                      <p className="text-xs font-bold text-white leading-none">ADD</p>
                      <p className="text-[10px] text-white/60 leading-tight">Addis Ababa<br/>Bole Intl</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Airport List */}
              <div className="flex-1 space-y-8 w-full border-t sm:border-t-0 sm:border-l border-white/10 pt-8 sm:pt-0 sm:pl-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-2">Key Airport</p>
                  <p className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="text-warm-gold">ADD</span> Addis Ababa
                  </p>
                </div>
                
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-4">Additional Airports</p>
                  <ul className="space-y-2.5">
                    {[
                      { code: "BJR", name: "Bahir Dar" },
                      { code: "DIR", name: "Dire Dawa" },
                      { code: "HWA", name: "Hawassa" },
                      { code: "MQX", name: "Mekelle" },
                    ].map(apt => (
                      <li key={apt.code} className="flex items-center gap-4 text-sm">
                        <span className="text-white/40 font-bold text-xs w-8">{apt.code}</span>
                        <span className="text-white/80 font-medium text-xs sm:text-sm">{apt.name}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-white/30 mt-6 italic">More airports available upon request.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SAFETY SECTION ────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 overflow-hidden mt-12">
        <Image src="/images/hero_safety.png" alt="Safety" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/90 to-[#0A1628]/40" />
        
        <div className="relative z-10 container-max">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-16 sm:mb-24"
          >
            <p className="section-label">Why SABA</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Built Around Safety.<br/>
              Driven by Reliability.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              We uphold the highest standards in aviation safety, compliance and operational
              excellence, ensuring your operation runs smoothly, every time.
            </p>
            <Link href="/safety-quality" className="btn-outline">
              OUR SAFETY & QUALITY <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Safety badges inline row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {safetyBadges.map((badge) => (
              <div key={badge.label} className="flex flex-col items-center sm:items-start text-center sm:text-left group">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:border-warm-gold/50 transition-colors">
                  <badge.icon size={20} className="text-white/60 group-hover:text-warm-gold transition-colors" />
                </div>
                <p className="text-white font-medium text-sm tracking-wide">{badge.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
