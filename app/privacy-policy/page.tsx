// app/privacy-policy/page.tsx — Privacy Policy Page
"use client";

import HeroSection from "@/components/ui/HeroSection";
import CTABanner from "@/components/ui/CTABanner";
import ScrollFloat from "@/components/ui/ScrollFloat";
import { Shield, Lock, Eye, Database, CheckCircle2 } from "lucide-react";
import { Fraunces } from "next/font/google";

// Same display serif as the rest of the site — reserved for the one main
// headline here. Everything else stays plain, legible sans: a legal notice
// should read like a document, not a marketing page.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});

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
      <div className={`bg-[#FAF8F3] py-16 sm:py-24 ${display.variable}`}>
        <div className="container-max px-5 sm:px-8 lg:px-12">
          {/* Key Principles */}
          <ScrollFloat distance={40} scrub={1.2} className="mb-16">
            <div className="grid grid-cols-1 gap-8 border-y border-[#073f67]/12 py-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
              {keyPrinciples.map((item) => (
                <div key={item.title}>
                  <item.icon size={22} className="text-[#073f67]" strokeWidth={1.5} />
                  <h3 className="mt-4 text-[1.02rem] font-semibold text-[#0b1620]">{item.title}</h3>
                  <p className="mt-2 text-[0.85rem] leading-6 text-[#3d4a55]">{item.description}</p>
                </div>
              ))}
            </div>
          </ScrollFloat>

          {/* Detailed Legal Body */}
          <div className="mx-auto max-w-4xl space-y-10 rounded-[0.3rem] border border-[#073f67]/12 bg-white p-8 text-[#1c2733] shadow-[0_20px_50px_rgba(7,63,103,0.06)] sm:p-12">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-[#073f67]/12 pb-6 sm:flex-row sm:items-center">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#073f67]">
                  Legal Information
                </span>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-medium text-[#0b1620] sm:text-3xl">
                  Privacy Notice
                </h2>
              </div>
              <span className="rounded-full border border-[#073f67]/15 bg-[#073f67]/5 px-4 py-2 text-xs text-[#3d4a55]">
                Last Updated: {lastUpdated}
              </span>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <h3 className="flex items-center gap-3 text-xl font-bold text-[#0b1620]">
                <span className="h-2 w-2 rounded-full bg-[#073f67]" />
                1. Information We Collect
              </h3>
              <p className="text-sm leading-relaxed text-[#3d4a55]">
                SABA Aviation Service & Flight Support PLC collects personal and operational data
                necessary to deliver flight clearance, ground handling, fueling, crew support, and
                passenger services across Ethiopian airports.
              </p>
              <ul className="space-y-2 border-l border-[#073f67]/20 pl-4 text-sm text-[#3d4a55]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#073f67]" />
                  <span>
                    <strong className="text-[#0b1620]">Flight Details:</strong> Tail numbers, flight
                    plans, routes, ETA/ETD, slot requests, and permit applications.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#073f67]" />
                  <span>
                    <strong className="text-[#0b1620]">Crew & Passenger Data:</strong> Passport
                    copies, visa requirements, GENDEC manifests, and security clearance documents
                    required by authorities.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#073f67]" />
                  <span>
                    <strong className="text-[#0b1620]">Corporate Contact Information:</strong> Name,
                    email, telephone, company designation, and billing details provided during
                    bookings.
                  </span>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h3 className="flex items-center gap-3 text-xl font-bold text-[#0b1620]">
                <span className="h-2 w-2 rounded-full bg-[#073f67]" />
                2. How We Use Your Data
              </h3>
              <p className="text-sm leading-relaxed text-[#3d4a55]">
                Your data is processed strictly for legitimate aviation operations, including:
              </p>
              <div className="grid grid-cols-1 gap-4 text-xs text-[#3d4a55] sm:grid-cols-2">
                <div className="rounded-[0.2rem] border border-[#073f67]/10 bg-[#FAF8F3] p-4">
                  <p className="mb-1 font-semibold text-[#0b1620]">Permit Approvals</p>
                  <p>
                    Submitting overflight and landing permit applications to the Ethiopian Civil
                    Aviation Authority (ECAA).
                  </p>
                </div>
                <div className="rounded-[0.2rem] border border-[#073f67]/10 bg-[#FAF8F3] p-4">
                  <p className="mb-1 font-semibold text-[#0b1620]">Ground Logistics</p>
                  <p>
                    Coordinating ramp handling, passenger transport, hotel arrangements, and
                    aviation fuel dispatch.
                  </p>
                </div>
                <div className="rounded-[0.2rem] border border-[#073f67]/10 bg-[#FAF8F3] p-4">
                  <p className="mb-1 font-semibold text-[#0b1620]">Safety & Compliance</p>
                  <p>Ensuring full adherence to ICAO and local airport security standards.</p>
                </div>
                <div className="rounded-[0.2rem] border border-[#073f67]/10 bg-[#FAF8F3] p-4">
                  <p className="mb-1 font-semibold text-[#0b1620]">Operational Support</p>
                  <p>Providing 24/7 dispatch notifications, flight tracking updates, and invoicing.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h3 className="flex items-center gap-3 text-xl font-bold text-[#0b1620]">
                <span className="h-2 w-2 rounded-full bg-[#073f67]" />
                3. Disclosure to Authorities & Third Parties
              </h3>
              <p className="text-sm leading-relaxed text-[#3d4a55]">
                We do not sell, rent, or trade your information to commercial third parties.
                Information is disclosed solely to:
              </p>
              <ul className="list-inside list-disc space-y-1.5 text-sm text-[#3d4a55]">
                <li>
                  Governmental & Civil Aviation Authorities (e.g. ECAA, Ethiopian Immigration,
                  Customs).
                </li>
                <li>
                  Airport Operators & Ground Service Providers essential for execution of
                  requested services.
                </li>
                <li>
                  Vetted vendor partners (e.g. luxury hotel accommodation, armored transport)
                  under strict confidentiality agreements.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h3 className="flex items-center gap-3 text-xl font-bold text-[#0b1620]">
                <span className="h-2 w-2 rounded-full bg-[#073f67]" />
                4. Data Security & Storage
              </h3>
              <p className="text-sm leading-relaxed text-[#3d4a55]">
                SABA Aviation employs high-grade encryption, secure server infrastructure, and
                restricted administrative access protocols. All physical and electronic records
                are monitored under strict aviation cybersecurity standards.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h3 className="flex items-center gap-3 text-xl font-bold text-[#0b1620]">
                <span className="h-2 w-2 rounded-full bg-[#073f67]" />
                5. Contacting Our Data Officer
              </h3>
              <p className="text-sm leading-relaxed text-[#3d4a55]">
                For queries regarding your personal data, rights to access, rectification, or
                deletion of records:
              </p>
              <div className="space-y-1 rounded-[0.2rem] border border-[#073f67]/15 bg-[#073f67]/5 p-5 text-xs text-[#1c2733] sm:text-sm">
                <p className="font-bold uppercase tracking-wider text-[#073f67]">
                  SABA Aviation Privacy Office
                </p>
                <p>Bole International Airport, Addis Ababa, Ethiopia</p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@sabaaviation.com" className="text-[#073f67] underline">
                    info@sabaaviation.com
                  </a>
                </p>
                <p>24/7 Operations Desk: +251-11-551-6897</p>
              </div>
            </section>
          </div>
        </div>
      </div>

    </>
  );
}