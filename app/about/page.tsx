// app/about/page.tsx — About Page
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Eye, Target } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ValueCard from "@/components/ui/ValueCard";
import CTABanner from "@/components/ui/CTABanner";
import { story, mission, vision, values } from "@/data/company";

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        title="About Saba"
        subtitle="Built for Modern Aviation Operations"
        backgroundImage="/images/hero_about.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      {/* ── UNIFIED LIGHT GRADIENT CONTENT ──────────────── */}
      <div className="bg-gradient-to-b from-white to-gray-200">
        {/* ── OUR STORY ────────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <SectionHeading label="Our Story" title={story.title} light />
                <p className="text-midnight/80 leading-relaxed text-lg">{story.content}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-[400px] rounded-xl overflow-hidden"
              >
                <Image
                  src="/images/about_story.png"
                  alt="Our story"
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 rounded-xl border border-warm-gold/20" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── MISSION & VISION ─────────────────────────────── */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card bg-white"
              >
                <div className="w-12 h-12 rounded-lg bg-warm-gold/10 flex items-center justify-center mb-5">
                  <Target size={22} className="text-warm-gold" />
                </div>
                <h3 className="text-midnight text-xl font-bold mb-3">{mission.title}</h3>
                <p className="text-midnight/70 leading-relaxed">{mission.content}</p>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="card bg-white"
              >
                <div className="w-12 h-12 rounded-lg bg-warm-gold/10 flex items-center justify-center mb-5">
                  <Eye size={22} className="text-warm-gold" />
                </div>
                <h3 className="text-midnight text-xl font-bold mb-3">{vision.title}</h3>
                <p className="text-midnight/70 leading-relaxed">{vision.content}</p>
              </motion.div>
            </div>
          </div>
        </section>
https://127.0.0.1:1201/static/artifacts/0509c5ef-cff8-4192-8c9f-72953b456500/.user_uploaded/media_1788876355732.png?csrf=37487b8e-3ab0-43c8-a3a1-9eade2f704c1
        {/* ── OUR VALUES ───────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-max">
            <SectionHeading
              label="Our Values"
              title="Our Values"
              centered
              light
            />
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {values.map((v, i) => (
                <ValueCard key={v.label} label={v.label} index={i} variant="pill" />
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR TEAM ─────────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-[400px] rounded-xl overflow-hidden"
              >
                <Image
                  src="/images/team_photo.png"
                  alt="Our team"
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 rounded-xl border border-warm-gold/20" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <SectionHeading label="Our Team" title="Our Team" light />
                <p className="text-midnight/80 leading-relaxed text-lg mb-8">
                  A dedicated team of aviation professionals, working around the clock to support your
                  operations. Our staff brings decades of combined experience in ground handling,
                  flight operations, and aviation logistics.
                </p>
                <Link href="/careers" className="btn-dark">
                  MEET OUR TEAM <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── COMPANY PROFILE ──────────────────────────────── */}
        <section className="section-padding">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card bg-white flex flex-col md:flex-row items-center gap-8 p-8 md:p-12"
            >
              <div className="flex-1">
                <SectionHeading label="Download" title="Company Profile" light />
                <p className="text-midnight/70 leading-relaxed">
                  Download our company profile for more information about Saba Aviation.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button className="btn-primary">
                  <Download size={18} /> DOWNLOAD PDF
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
