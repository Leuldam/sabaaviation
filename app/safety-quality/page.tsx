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
  Target,
  TrendingUp,
} from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import ContactSection from "@/components/ui/ContactSection";

const safetyPillars = [
  {
    icon: Shield,
    title: "Safety Management System",
    description: "Comprehensive SMS framework with proactive risk identification, hazard reporting, and continuous safety monitoring across all operations.",
    features: ["Risk Assessment", "Safety Audits", "Incident Reporting", "Preventive Measures"]
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliance",
    description: "Full adherence to ICAO Annex 6, IATA Ground Operations Manual (IGOM), and Ethiopian Civil Aviation Authority regulations.",
    features: ["ICAO Standards", "IATA Compliance", "Local Regulations", "Documentation"]
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "ISO-aligned quality management with regular audits, performance metrics, and customer satisfaction tracking.",
    features: ["Quality Audits", "Performance KPIs", "Customer Feedback", "Process Improvement"]
  },
  {
    icon: Lock,
    title: "Security Protocols",
    description: "Multi-layered security with access control, CCTV monitoring, personnel vetting, and cargo screening compliance.",
    features: ["Access Control", "Personnel Screening", "Cargo Security", "Surveillance"]
  },
  {
    icon: Users,
    title: "Training & Competency",
    description: "Comprehensive training programs covering safety procedures, equipment operation, emergency response, and customer service.",
    features: ["Initial Training", "Recurrent Training", "Emergency Drills", "Competency Checks"]
  },
  {
    icon: ClipboardCheck,
    title: "Operational Excellence",
    description: "Standardized procedures, ground support equipment maintenance, and adherence to manufacturer specifications.",
    features: ["SOPs", "Equipment Maintenance", "Performance Standards", "Best Practices"]
  }
];

const certifications = [
  { name: "IATA Safety Audit for Ground Operations (ISAGO)", status: "Certified" },
  { name: "ISO 9001:2015 Quality Management", status: "In Progress" },
  { name: "Ethiopian CAA Ground Handling License", status: "Active" },
  { name: "Dangerous Goods Handling Certification", status: "Certified" }
];

const stats = [
  { value: "99.8%", label: "Safety Compliance Rate", icon: Target },
  { value: "24/7", label: "Safety Monitoring", icon: Shield },
  { value: "500+", label: "Hours Annual Training", icon: Users },
  { value: "Zero", label: "Accident Target", icon: TrendingUp }
];

export default function SafetyQualityPage() {
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

      {/* ── INTRODUCTION ──────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] mb-4 font-medium">
                OUR COMMITMENT
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A0A0A] mb-6 leading-tight">
                Safety is not a feature.<br />
                It's our foundation.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At SABA Aviation, safety and quality are embedded in every aspect of our operations. We maintain the highest international standards through rigorous training, continuous monitoring, and unwavering commitment to excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>IATA Certified Operations</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>24/7 Safety Monitoring</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Continuous Training</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/about_story.png"
                alt="Safety Operations"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ──────────────────────────────────── */}
      <section className="py-12 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-[#FF6B35] mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY PILLARS ────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] mb-4 font-medium">
              SIX PILLARS OF EXCELLENCE
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A0A0A] mb-4">
              Our Safety Framework
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              A comprehensive approach to safety and quality management across all operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center mb-6">
                  <pillar.icon className="w-7 h-7 text-[#FF6B35]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">{pillar.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {pillar.description}
                </p>
                <ul className="space-y-2">
                  {pillar.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] mb-4 font-medium">
              CERTIFICATIONS & COMPLIANCE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              Recognized Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <Award className="w-10 h-10 text-[#FF6B35]" />
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A]">{cert.name}</h3>
                    <p className="text-sm text-gray-600">Status: {cert.status}</p>
                  </div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ──────────────────────────────── */}
      <ContactSection />
    </>
  );
}
