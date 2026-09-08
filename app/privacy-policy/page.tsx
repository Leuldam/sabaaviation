// app/privacy-policy/page.tsx — Privacy Policy Page
"use client";

import HeroSection from "@/components/ui/HeroSection";
import CTABanner from "@/components/ui/CTABanner";
import ScrollFloat from "@/components/ui/ScrollFloat";
import { Shield, Lock, Eye, Database, FileText, Bell, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 8, 2026";

  const keyPrinciples = [
    {
      icon: Shield,
      title: "Data Protection",
      description:
        "We implement strict technical and organizational safeguards to ensure flight, passenger, and corporate data remains confidential.",
    },
    {
      icon: Eye,
      title: "Operational Transparency",
      description:
        "We only collect information strictly required for flight permits, ground handling, crew logistics, and regulatory compliance in Ethiopia.",
    },
    {
      icon: Lock,
      title: "Strict Confidentiality",
      description:
        "Your flight schedules, passenger manifests, and VIP details are kept private and never commercialized or shared without authorization.",
    },
    {
      icon: Database,
      title: "Compliant Retention",
      description:
        "Data is retained only for periods required by the Ethiopian Civil Aviation Authority (ECAA) and international aviation protocols.",
    },
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        title="Privacy Policy"
        subtitle="How SABA Aviation Service & Flight Support PLC protects your data and operational privacy."
        backgroundImage="/images/hero_safety.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />

      {/* ── CONTENT ──────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#0A0A0A] via-midnight to-[#0A0A0A] py-16 sm:py-24">
        <div className="container-max px-5 sm:px-8 lg:px-12">
          
          {/* Key Principles Grid */}
          <ScrollFloat distance={40} scrub={1.2} className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyPrinciples.map((item) => (
                <div
                  key={item.title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-warm-gold/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-warm-gold/10 border border-warm-gold/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-warm-gold" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </ScrollFloat>

          {/* Detailed Legal Body */}
          <div className="max-w-4xl mx-auto bg-[#141414]/80 border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-2xl space-y-10 text-white/80">
            
            <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-warm-gold text-xs font-bold tracking-widest uppercase">Legal Information</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Privacy Notice</h2>
              </div>
              <span className="text-xs text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                Last Updated: {lastUpdated}
              </span>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warm-gold" />
                1. Information We Collect
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                SABA Aviation Service & Flight Support PLC collects personal and operational data necessary to deliver flight clearance, ground handling, fueling, crew support, and passenger services across Ethiopian airports.
              </p>
              <ul className="space-y-2 text-sm text-white/70 pl-4 border-l border-warm-gold/30">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-warm-gold shrink-0 mt-0.5" />
                  <span><strong>Flight Details:</strong> Tail numbers, flight plans, routes, ETA/ETD, slot requests, and permit applications.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-warm-gold shrink-0 mt-0.5" />
                  <span><strong>Crew & Passenger Data:</strong> Passport copies, visa requirements, GENDEC manifests, and security clearance documents required by authorities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-warm-gold shrink-0 mt-0.5" />
                  <span><strong>Corporate Contact Information:</strong> Name, email, telephone, company designation, and billing details provided during bookings.</span>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warm-gold" />
                2. How We Use Your Data
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                Your data is processed strictly for legitimate aviation operations, including:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/70">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="font-semibold text-white mb-1">Permit Approvals</p>
                  <p>Submitting overflight and landing permit applications to the Ethiopian Civil Aviation Authority (ECAA).</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="font-semibold text-white mb-1">Ground Logistics</p>
                  <p>Coordinating ramp handling, passenger transport, hotel arrangements, and aviation fuel dispatch.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="font-semibold text-white mb-1">Safety & Compliance</p>
                  <p>Ensuring full adherence to ICAO, IATA ISAGO, and local airport security standards.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="font-semibold text-white mb-1">Operational Support</p>
                  <p>Providing 24/7 dispatch notifications, flight tracking updates, and invoicing.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warm-gold" />
                3. Disclosure to Authorities & Third Parties
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                We do not sell, rent, or trade your information to commercial third parties. Information is disclosed solely to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-white/70">
                <li>Governmental & Civil Aviation Authorities (e.g. ECAA, Ethiopian Immigration, Customs).</li>
                <li>Airport Operators & Ground Service Providers essential for execution of requested services.</li>
                <li>Vetted vendor partners (e.g. luxury hotel accommodation, armored transport) under strict confidentiality agreements.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warm-gold" />
                4. Data Security & Storage
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                SABA Aviation employs high-grade encryption, secure server infrastructure, and restricted administrative access protocols. All physical and electronic records are monitored under strict aviation cybersecurity standards.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warm-gold" />
                5. Contacting Our Data Officer
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                For queries regarding your personal data, rights to access, rectification, or deletion of records:
              </p>
              <div className="p-5 rounded-2xl bg-warm-gold/10 border border-warm-gold/30 text-xs sm:text-sm space-y-1 text-white">
                <p className="font-bold text-warm-gold uppercase tracking-wider">SABA Aviation Privacy Office</p>
                <p>Bole International Airport, Addis Ababa, Ethiopia</p>
                <p>Email: <a href="mailto:info@sabaaviation.com" className="underline text-warm-gold">info@sabaaviation.com</a></p>
                <p>24/7 Operations Desk: +251-11-551-6897</p>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
