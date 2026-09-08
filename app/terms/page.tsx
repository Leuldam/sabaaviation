// app/terms/page.tsx — Terms & Conditions Page
"use client";

import HeroSection from "@/components/ui/HeroSection";
import CTABanner from "@/components/ui/CTABanner";
import ScrollFloat from "@/components/ui/ScrollFloat";
import { FileText, ShieldAlert, Scale, CheckCircle2, AlertCircle, Clock, Plane } from "lucide-react";

export default function TermsAndConditionsPage() {
  const lastUpdated = "September 8, 2026";

  const keyTerms = [
    {
      icon: Scale,
      title: "Governing Law",
      description:
        "All services, agreements, and flight handling requests are governed by the laws of the Federal Democratic Republic of Ethiopia and ECAA regulations.",
    },
    {
      icon: Plane,
      title: "Permit Authorization",
      description:
        "Overflight and landing permits are subject to regulatory clearance. Lead times must comply with official Civil Aviation Authority guidelines.",
    },
    {
      icon: ShieldAlert,
      title: "Liability & Indemnity",
      description:
        "Operators retain primary responsibility for aircraft airworthiness, passenger insurance, and compliance with international flight safety standards.",
    },
    {
      icon: Clock,
      title: "24/7 Operations",
      description:
        "Handling requests, slot changes, and emergency diversions are monitored continuously by our 24/7 Addis Ababa operational dispatch team.",
    },
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        title="Terms & Conditions"
        subtitle="Operational terms and service conditions for SABA Aviation flight support in Ethiopia."
        backgroundImage="/images/hero_home.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions", href: "/terms" },
        ]}
      />

      {/* ── CONTENT ──────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#0A0A0A] via-midnight to-[#0A0A0A] py-16 sm:py-24">
        <div className="container-max px-5 sm:px-8 lg:px-12">

          {/* Highlights Grid */}
          <ScrollFloat distance={40} scrub={1.2} className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyTerms.map((item) => (
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
                <span className="text-warm-gold text-xs font-bold tracking-widest uppercase">Service Agreement</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">General Terms of Business</h2>
              </div>
              <span className="text-xs text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                Effective Date: {lastUpdated}
              </span>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warm-gold" />
                1. Scope of Services
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                SABA Aviation Service & Flight Support PLC (“SABA Aviation”) provides aviation ground handling, flight permits (overflight & landing), fuel supervision, VIP concierge, charter assistance, and crew logistics within Ethiopia. Requesting services constitutes acceptance of these terms.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warm-gold" />
                2. Flight Permits & Regulatory Clearances
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                SABA Aviation acts as an authorized liaison between the aircraft operator and the Ethiopian Civil Aviation Authority (ECAA).
              </p>
              <ul className="space-y-2 text-sm text-white/70 pl-4 border-l border-warm-gold/30">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-warm-gold shrink-0 mt-0.5" />
                  <span><strong>Lead Times:</strong> Permit requests must be submitted within recommended ECAA timeframes (minimum 72 hours for diplomatic/special permits; 24-48 hours for standard commercial/general aviation).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-warm-gold shrink-0 mt-0.5" />
                  <span><strong>Accuracy:</strong> Operators are responsible for submitting accurate registration, airworthiness certificates, noise certificates, and insurance documents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Authority Decisions:</strong> SABA Aviation is not liable for delays, rejections, or route alterations mandated by civil aviation or military security authorities.</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warm-gold" />
                3. Payment & Invoicing Terms
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                Standard payment terms require credit approval or pre-funding via bank transfer prior to flight departure, unless a corporate credit facility is established.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/70">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="font-semibold text-white mb-1">Disbursements</p>
                  <p>Third-party fees (navigation charges, landing fees, airport taxes, fuel costs) paid on behalf of the customer are subject to handling fees.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="font-semibold text-white mb-1">Cancellations</p>
                  <p>Services cancelled less than 12 hours prior to scheduled arrival may be subject to cancellation charges and disbursed airport fees.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warm-gold" />
                4. Liability & Insurance
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                SABA Aviation maintains comprehensive ground handling liability insurance in accordance with international aviation standards (IATA Standard Ground Handling Agreement Guidelines).
              </p>
              <p className="text-sm leading-relaxed text-white/70">
                The operator remains responsible for aircraft hull and passenger liability coverage. SABA Aviation shall not be liable for indirect, consequential, or force majeure events including weather delays, military airspace closures, or government directives.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warm-gold" />
                5. Applicable Law & Dispute Resolution
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                These terms shall be governed by and construed in accordance with the laws of Ethiopia. Any dispute arising out of or in connection with these terms shall be submitted to the exclusive jurisdiction of the courts of Addis Ababa, Ethiopia.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warm-gold" />
                6. Contact Information
              </h3>
              <div className="p-5 rounded-2xl bg-warm-gold/10 border border-warm-gold/30 text-xs sm:text-sm space-y-1 text-white">
                <p className="font-bold text-warm-gold uppercase tracking-wider">SABA Aviation Legal & Operations Desk</p>
                <p>Bole International Airport, Addis Ababa, Ethiopia</p>
                <p>Email: <a href="mailto:info@sabaaviation.com" className="underline text-warm-gold">info@sabaaviation.com</a></p>
                <p>Telephone: +251-11-551-6897</p>
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
