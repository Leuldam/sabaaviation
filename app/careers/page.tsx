// app/careers/page.tsx — Careers Page (placeholder)
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Users, Heart, Rocket } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/ui/CTABanner";

const benefits = [
  {
    icon: Briefcase,
    title: "Professional Growth",
    description: "Continuous training and development opportunities in the aviation industry.",
  },
  {
    icon: Users,
    title: "Collaborative Team",
    description: "Work alongside experienced aviation professionals in a supportive environment.",
  },
  {
    icon: Heart,
    title: "Competitive Benefits",
    description: "Comprehensive benefits package including health, transport, and more.",
  },
  {
    icon: Rocket,
    title: "Career Advancement",
    description: "Clear pathways for career progression within a growing organization.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        title="Careers"
        subtitle="Join Our Growing Aviation Team"
        backgroundImage="/images/team_photo.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ]}
      />

      {/* ── WHY JOIN SABA ────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-200">
        <div className="container-max">
          <SectionHeading
            label="Why Join Us"
            title="Build Your Career in Aviation"
            subtitle="At SABA Aviation, we believe our people are our greatest asset. Join a team that values professionalism, safety, and excellence."
            centered
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card bg-white text-center shadow-md border-black/5"
              >
                <div className="w-14 h-14 rounded-xl bg-warm-gold/10 flex items-center justify-center mx-auto mb-5">
                  <benefit.icon size={26} className="text-warm-gold" />
                </div>
                <h3 className="text-midnight text-base font-semibold mb-2">{benefit.title}</h3>
                <p className="text-midnight/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ───────────────────────────────── */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-200">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <SectionHeading
              label="Open Positions"
              title="Current Opportunities"
              centered
              light
            />
            <div className="card bg-white py-16 mt-8 shadow-md border-black/5">
              <div className="w-20 h-20 rounded-full bg-warm-gold/10 flex items-center justify-center mx-auto mb-6">
                <Briefcase size={32} className="text-warm-gold" />
              </div>
              <h3 className="text-midnight text-xl font-bold mb-3">Coming Soon</h3>
              <p className="text-midnight/70 text-base mb-8 max-w-md mx-auto">
                We are currently updating our career listings. Please check back soon for new
                opportunities, or send us your CV directly.
              </p>
              <Link href="/contact" className="btn-primary">
                SEND YOUR CV <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTABanner
        title="Interested in joining SABA Aviation?"
        subtitle="Send your CV and cover letter to our HR team and we'll be in touch."
        buttonText="CONTACT US"
        buttonHref="/contact"
      />
    </>
  );
}
