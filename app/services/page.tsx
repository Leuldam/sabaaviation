// app/services/page.tsx — Services Page
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Eye, Target } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import ValueCard from "@/components/ui/ValueCard";
import CTABanner from "@/components/ui/CTABanner";
import { services } from "@/data/services";
import { story, mission, vision, values } from "@/data/company";

export default function ServicesPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        title="Our Services"
        subtitle="Tailored Aviation Support Solutions"
        backgroundImage="/images/hero_services.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      {/* ── OUR STORY BRIEF ──────────────────────────────── */}
      <section className="section-padding bg-midnight">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading label="About" title="Our Story" />
              <p className="text-muted leading-relaxed text-lg">{story.content}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[350px] rounded-xl overflow-hidden"
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
      <section className="section-padding bg-dark-navy">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <div className="w-12 h-12 rounded-lg bg-warm-gold/10 flex items-center justify-center mb-5">
                <Target size={22} className="text-warm-gold" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3">{mission.title}</h3>
              <p className="text-muted leading-relaxed">{mission.content}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card"
            >
              <div className="w-12 h-12 rounded-lg bg-warm-gold/10 flex items-center justify-center mb-5">
                <Eye size={22} className="text-warm-gold" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3">{vision.title}</h3>
              <p className="text-muted leading-relaxed">{vision.content}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────── */}
      <section className="section-padding bg-midnight">
        <div className="container-max">
          <SectionHeading label="Our Values" title="Our Values" centered />
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {values.map((v, i) => (
              <ValueCard key={v.label} label={v.label} index={i} variant="pill" />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE GRID ─────────────────────────────────── */}
      <section className="section-padding bg-dark-navy">
        <div className="container-max">
          <SectionHeading
            label="Our Services"
            title="Seamless Aviation Support Solutions"
            subtitle="From flight support to VIP services, we provide end-to-end solutions for your aviation operation."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
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

      {/* ── TEAM ─────────────────────────────────────────── */}
      <section className="section-padding bg-midnight">
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
              <SectionHeading label="Our Team" title="Our Team" />
              <p className="text-muted leading-relaxed text-lg mb-8">
                A dedicated team of aviation professionals, working around the clock to support your
                operations.
              </p>
              <Link href="/careers" className="btn-outline-gold">
                MEET OUR TEAM <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMPANY PROFILE ──────────────────────────────── */}
      <section className="section-padding bg-dark-navy">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card flex flex-col md:flex-row items-center gap-8 p-8 md:p-12"
          >
            <div className="flex-1">
              <SectionHeading label="Download" title="Company Profile" />
              <p className="text-muted leading-relaxed">
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

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
