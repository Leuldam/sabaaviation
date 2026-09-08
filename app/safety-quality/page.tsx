// app/safety-quality/page.tsx — Safety & Quality Page
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  FileCheck,
  Award,
  Lock,
  ClipboardCheck,
  CheckCircle2,
  Users,
} from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/ui/CTABanner";
import { safetyPillars } from "@/data/company";

const pillarIcons = [Shield, FileCheck, ClipboardCheck, Lock, Award];

export default function SafetyQualityPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
        <Image 
          src="/images/hero_safety.png" 
          alt="Safety is our foundation" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/80 to-transparent" />
        
        <div className="relative z-10 container-max pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="section-label">Safety & Quality</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight text-balance">
              Safety is not a feature of our service. It is the foundation of our operation.
            </h1>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl">
              We are committed to the highest standards of safety, compliance and quality in every aspect of our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PILLARS GRID & IMAGE ──────────────────────────── */}
      <section className="bg-gradient-to-b from-white to-gray-200">
        <div className="flex flex-col lg:flex-row">
          {/* Grid Area */}
          <div className="flex-1 px-5 sm:px-12 py-16 lg:py-24 max-w-5xl mx-auto lg:mx-0 lg:ml-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
              {[
                { icon: Shield, title: "Safety Management", desc: "Structured risk management and continuous improvement." },
                { icon: FileCheck, title: "Regulatory Compliance", desc: "Adherence to international and local regulations." },
                { icon: Award, title: "Quality Assurance", desc: "Consistent service quality and performance." },
                { icon: Lock, title: "Security", desc: "Strict security protocols and personnel screening." },
                { icon: Users, title: "Training & Development", desc: "Skilled and professional team members." },
                { icon: ClipboardCheck, title: "Operational Standards", desc: "Global best practices and industry standards." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center sm:items-start text-center sm:text-left"
                >
                  <div className="w-12 h-12 mb-4">
                    <item.icon size={28} className="text-[#0A0A0A] font-light" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[#0A0A0A] font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-[#0A0A0A]/60 text-xs leading-relaxed max-w-[200px]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right Image Area */}
          <div className="w-full lg:w-[35%] relative min-h-[400px]">
            <Image 
              src="/images/about_story.png" 
              alt="Professional safety check" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTABanner
        title="Need to verify our compliance?"
        subtitle="Contact our operations center for safety documentation and compliance inquiries."
        buttonText="CONTACT OPERATIONS"
        buttonHref="/contact"
      />
    </>
  );
}
