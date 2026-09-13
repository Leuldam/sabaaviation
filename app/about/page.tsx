// app/about/page.tsx — About Page
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Eye,
  Gauge,
  Plane,
  ShieldCheck,
  Target,
  TimerReset,
} from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/ui/CTABanner";
import { story, mission, vision, values } from "@/data/company";

export default function AboutPage() {
  const valueIcons = [ShieldCheck, Gauge, TimerReset, Compass];

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

      <div className="bg-[#f4f5f3] text-midnight">
        {/* ── STORY FEATURE ─────────────────────────────────── */}
        <section className="section-padding pb-8">
          <div className="container-max">
            <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-10 xl:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-[#073f67]/15 bg-white/80 px-4 py-2 shadow-[0_10px_30px_rgba(7,63,103,0.06)] backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-[#073f67]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#073f67]">About SABA</span>
                </div>

                <div className="space-y-5">
                  <SectionHeading label="Our Story" title={story.title} light />
                  <h2 className="max-w-xl text-[2.6rem] font-black leading-[0.9] tracking-[-0.07em] text-[#0b1620] sm:text-[3.2rem] lg:text-[4.4rem]">
                    Built for confident aviation operations.
                  </h2>
                </div>

                <p className="max-w-xl text-[1.03rem] leading-8 text-slate-700 md:text-lg">
                  {story.content}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {[
                    { value: "Regional", label: "Presence" },
                    { value: "Fast", label: "Execution" },
                    { value: "Trusted", label: "Support" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_35px_rgba(15,23,42,0.04)]">
                      <div className="text-2xl font-black tracking-[-0.06em] text-[#073f67]">{stat.value}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute -left-10 top-4 h-28 w-28 rounded-full bg-[#073f67]/10 blur-3xl" />
                <div className="absolute -right-5 bottom-8 h-28 w-28 rounded-full bg-[#d1b16a]/15 blur-3xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-[0_35px_80px_rgba(15,23,42,0.12)]">
                  <div className="relative h-[430px] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src="/images/about_story.png"
                      alt="SABA Aviation team"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061a2c] via-[#061a2c]/10 to-transparent" />

                    <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      Precision-led
                    </div>

                    <div className="absolute left-5 right-5 bottom-5 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">Operational focus</p>
                          <p className="mt-2 text-lg font-bold text-white">Ground handling & flight support</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d1b16a]/15 text-[#f7d392]">
                          <Plane className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── MISSION & VISION ─────────────────────────────── */}
        <section className="section-padding pt-6">
          <div className="container-max">
            <div className="mb-10 text-center">
              <p className="section-label text-[#073f67]">Mission & Vision</p>
              <h3 className="text-[2.2rem] font-black leading-[1.02] tracking-[-0.06em] text-[#0b1620] sm:text-[2.8rem]">
                The standards that guide every operation.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(7,63,103,0.08)]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#073f67]/8 ring-1 ring-[#073f67]/10">
                  <Target size={24} className="text-[#073f67]" />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#073f67]">Our Mission</p>
                <h4 className="mt-4 text-[1.75rem] font-black leading-tight tracking-[-0.05em] text-[#0b1620]">{mission.title}</h4>
                <p className="mt-4 text-[1.02rem] leading-8 text-slate-700">{mission.content}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(7,63,103,0.08)]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1b16a]/12 ring-1 ring-[#d1b16a]/20">
                  <Eye size={24} className="text-[#073f67]" />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#073f67]">Our Vision</p>
                <h4 className="mt-4 text-[1.75rem] font-black leading-tight tracking-[-0.05em] text-[#0b1620]">{vision.title}</h4>
                <p className="mt-4 text-[1.02rem] leading-8 text-slate-700">{vision.content}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── OUR VALUES ───────────────────────────────────── */}
        <section className="section-padding pt-8">
          <div className="container-max">
            <SectionHeading
              label="Our Values"
              title="The values behind every safe, precise turn."
              centered
              light
            />

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {values.map((v, i) => {
                const Icon = valueIcons[i] ?? ShieldCheck;

                return (
                  <motion.div
                    key={v.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-[0_16px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#073f67]/20 hover:shadow-[0_20px_45px_rgba(7,63,103,0.08)] sm:p-5"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#073f67]/8 ring-1 ring-[#073f67]/10">
                      <Icon size={18} className="text-[#073f67]" />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">0{i + 1}</p>
                    </div>
                    <h4 className="mt-2 text-[1.08rem] font-black leading-tight tracking-[-0.04em] text-[#0b1620]">{v.label}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{v.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        
      </div>
    </>
  );
}
