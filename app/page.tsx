// app/page.tsx — Home Page
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollFloat from "@/components/ui/ScrollFloat";
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
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Phone,
  Plane,
  Package,
  Luggage,
  Truck,
  Globe,
} from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import CTABanner from "@/components/ui/CTABanner";
import PartnerLogos from "@/components/ui/PartnerLogos";
import ContactSection from "@/components/ui/ContactSection";
import { services } from "@/data/services";

const safetyBadges = [
  { icon: Shield, label: "Safety First" },
  { icon: FileCheck, label: "Regulatory Compliance" },
  { icon: Award, label: "Operational Excellence" },
  { icon: Users, label: "Professional Team" },
];

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ── Interactive Map State ──────────────────────────────────────────────────
  const airports = [
    {
      id: "ADD",
      name: "Addis Ababa",
      fullName: "Bole International Airport",
      top: "51.5%", left: "39.7%",   // cx=396.5 / 1000, cy=398.5 / 774
      isMain: true,
      services: ["Ground Handling", "Flight Support", "Crew Services", "Cargo Handling"],
      description: "Ethiopia's main international hub, handling all key aviation support services.",
    },
    {
      id: "MQX",
      name: "Mekelle",
      fullName: "Alula Aba Nega Airport",
      top: "13.3%", left: "42.2%",   // cx=421.9 / 1000, cy=102.8 / 774 (Tigray centroid)
      isMain: false,
      services: ["Ground Handling", "Flight Support", "Cargo Handling"],
      description: "Northern gateway serving Tigray region with full ground handling operations.",
    },
    {
      id: "DIR",
      name: "Dire Dawa",
      fullName: "Aba Tenna D. Yilma Airport",
      top: "46.8%", left: "58.5%",   // cx=585.2 / 1000, cy=362 / 774
      isMain: false,
      services: ["Ground Handling", "Flight Support", "Crew Services"],
      description: "Eastern Ethiopia's key commercial and cargo hub near the Djibouti corridor.",
    },
    {
      id: "BJR",
      name: "Bahir Dar",
      fullName: "Bahir Dar Airport",
      top: "38.2%", left: "34.8%",   // Amhara west — approximate from region shape
      isMain: false,
      services: ["Ground Handling", "Flight Support"],
      description: "Serving the scenic Lake Tana region with growing domestic aviation demand.",
    },
    {
      id: "GDQ",
      name: "Gondar",
      fullName: "Atse Tewodros Airport",
      top: "25.7%", left: "34.9%",   // cx=349.4 / 1000, cy=229.6 / 774 (Amara centroid)
      isMain: false,
      services: ["Ground Handling", "Crew Services"],
      description: "Historic royal city airport, key tourism gateway in northern Ethiopia.",
    },
    {
      id: "AWA",
      name: "Awasa",
      fullName: "Awasa Airport",
      top: "69.4%", left: "37.1%",   // cx=370.8 / 1000, cy=536.5 / 774 (Sidama centroid)
      isMain: false,
      services: ["Ground Handling", "Flight Support"],
      description: "Southern Ethiopian hub at the heart of the Great Rift Valley corridor.",
    },
  ];
  const [selectedAirport, setSelectedAirport] = useState(airports[0]);
  const serviceIconMap: Record<string, typeof Truck> = {
    "Ground Handling": Truck,
    "Flight Support": Plane,
    "Crew Services": Luggage,
    "Cargo Handling": Package,
  };

  const scrollByOne = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.querySelector<HTMLElement>(".service-card-item");
    if (!card) return;
    const cardWidth = card.offsetWidth + 20; // 20px gap

    if (direction === "right") {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 25) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 25) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(1, Math.max(0, container.scrollLeft / maxScroll)));
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const container = carouselRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({ left: clickRatio * maxScroll, behavior: "smooth" });
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        topBar={
          <div className="flex items-center justify-between gap-6">
            {/* Left: categories with line */}
            <div className="flex items-center gap-4">
              <p className="text-[10px] sm:text-xs hidden md:block font-montserrat font-medium uppercase tracking-[0.25em] text-white/60">
                GROUND HANDLING <span className="text-white/30 mx-1">/</span> FLIGHT SUPPORT <span className="text-white/30 mx-1">/</span> AVIATION SERVICES
              </p>
            </div>
            {/* Right: location badge */}
            <div className="hidden md:flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md px-4 py-2.5">
              <Globe size={22} className="text-white/60" />
              <div>
                <p className="text-[11px] font-montserrat font-semibold text-white/90 tracking-wide">
                  Ethiopia <span className="inline-block mx-1 text-white/40">→</span> East Africa
                </p>
                <p className="text-[9px] font-montserrat font-medium uppercase tracking-[0.2em] text-[#d1b16a]/80">
                  AND KEY INTERNATIONAL GATEWAYS
                </p>
              </div>
            </div>
          </div>
        }
        title={
          <h1 className="text-left">
            <span className="block font-serif italic font-normal text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl leading-tight mb-1">
              Welcome to
            </span>
            <span className="block font-helvetica font-black uppercase text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tight">
              SABA AVIATION
            </span>
            <span className="block font-montserrat font-light uppercase text-white/85 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-[0.35em] mt-1">
              SERVICE PLC
            </span>
          </h1>
        }
        subtitle="Your trusted partner in comprehensive airport facilitation and aviation support across Ethiopia, East Africa, and key international gateways."
        backgroundVideo="/images/background22.mp4"
        fullHeight
      >

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto max-w-sm sm:max-w-none"
        >
          <Link
            href="/services"
            className="group flex-1 sm:flex-none flex justify-center items-center gap-2 sm:gap-3 border-2 border-white/30 text-white font-montserrat text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/50 whitespace-nowrap"
          >
            <span>SERVICES</span>
            <ArrowRight size={14} className="stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/booking"
            className="group flex-1 sm:flex-none flex justify-center items-center gap-2 sm:gap-3 border-2 border-white/30 text-white font-montserrat text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/50 whitespace-nowrap"
          >
            <span>BOOKING</span>
            <ArrowRight size={14} className="stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* ── Bottom service pillars bar ── */}


        {/* Scroll down indicator */}
      </HeroSection>



      {/* ── UNIFIED LIGHT GRADIENT CONTENT ──────────────── */}
      <div className="bg-gradient-to-b from-white to-gray-200">
        <section className="section-padding overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,_rgba(7,63,103,0.18),_transparent_25%),radial-gradient(circle_at_80%_75%,_rgba(209,177,106,0.18),_transparent_22%)]" />

          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
              <ScrollFloat
                distance={50}
                scrub={1.2}
                delay={0}
                className="relative order-2 lg:order-1"
              >
                <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#073f67]/15 bg-white/80 px-4 py-2 shadow-[0_14px_28px_rgba(7,63,103,0.08)] backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#073f67]">About SABA</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-[3.5rem] lg:text-[4.2rem] font-black leading-[0.92] tracking-[-0.04em] text-midnight mb-6">
                  Built for
                  <span className="block mt-2 bg-gradient-to-r from-[#073f67] via-[#0a5a8a] to-[#d1b16a] bg-clip-text text-transparent pb-2 drop-shadow-sm">
                    confident operations.
                  </span>
                </h2>

                <div className="mb-6 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#073f67] to-[#d1b16a]" />

                <p className="max-w-xl text-sm sm:text-base leading-[1.8] text-midnight/70 font-helvetica mb-10">
                  SABA Aviation Service is an emerging leader in airport support, facilitation, and aviation services. Headquartered in Ethiopia, we deliver innovative, technology-enabled, and world-class solutions across East Africa and strategic international gateway airports. Guided by a vision of sustainable economic value creation and aviation talent development, we are shaping the future of seamless air transport connectivity for global carriers, charter operators, and industry stakeholders.
                </p>

                <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 mb-10">
                  {[
                    { value: "24/7", label: "Operations" },
                    { value: "35+", label: "Years" },
                    { value: "98%", label: "Reliability" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="group/stat relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 p-4 sm:p-5 backdrop-blur-xl shadow-[0_8px_30px_rgba(7,63,103,0.06)] hover:shadow-[0_15px_40px_rgba(7,63,103,0.15)] transition-all duration-500 hover:-translate-y-1.5"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/40 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500" />
                      <p className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-black leading-none bg-gradient-to-br from-[#073f67] to-[#0a5a8a] bg-clip-text text-transparent mb-2 group-hover/stat:scale-105 origin-left transition-transform duration-500">{item.value}</p>
                      <p className="relative z-10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#073f67]/60 group-hover/stat:text-[#073f67]/90 transition-colors duration-300">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#073f67] px-7 py-3.5 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_18px_35px_rgba(7,63,103,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#052f4d] hover:shadow-[0_20px_40px_rgba(7,63,103,0.45)]"
                  >
                    More About Us
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={14} className="stroke-[2.5]" />
                    </span>
                  </Link>
                </div>
              </ScrollFloat>

              <ScrollFloat
                distance={90}
                scrub={1.5}
                delay={0.15}
                className="relative order-1 lg:order-2"
              >
                <div className="absolute -top-10 -left-8 h-28 w-28 rounded-full bg-[#073f67]/10 blur-3xl" />
                <div className="absolute -bottom-12 -right-3 h-28 w-28 rounded-full bg-[#d1b16a]/18 blur-3xl" />

                <div className="relative mx-auto max-w-[560px] rounded-[2rem] border border-white/90 bg-[#FAF8F3] p-2.5 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                  <div className="relative h-[340px] sm:h-[400px] lg:h-[480px] overflow-hidden rounded-[1.6rem]">
                    <Image
                      src="/images/backgroundimage2.png"
                      alt="SABA Aviation team"
                      fill
                      className="object-cover scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071c2f]/95 via-[#071c2f]/40 to-transparent" />

                    <div className="absolute   top-5 right-5 flex justify-between gap-3">

                      <span className="rounded-full border border-[#d1b16a]/40 bg-[#d1b16a]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4e4b3] backdrop-blur-md">
                        Corporate ready
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                      <div className="relative group">
                        {/* Ambient glow removed as requested */}

                        <Link
                          href="/booking"
                          className="relative block rounded-2xl border-2 border-sky-400/40 bg-gradient-to-br from-[#082038]/95 via-[#06182a]/95 to-[#04101e]/98 p-4 sm:p-5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_30px_rgba(14,165,233,0.25)] overflow-hidden transition-all duration-300 hover:border-sky-400/80 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(14,165,233,0.45)] hover:-translate-y-1"
                        >
                          {/* Animated shimmer sweep */}
                          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-sky-300/15 to-transparent pointer-events-none" />

                          {/* Content and bold CTA button */}
                          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                            <div>
                              <p className="text-base sm:text-lg font-black text-white tracking-tight group-hover:text-sky-200 transition-colors duration-300">
                                Book Flight Support
                              </p>
                              <p className="text-xs text-slate-300/90 font-medium mt-0.5">
                                Permits, ground handling &amp; fast facilitation
                              </p>
                            </div>

                            {/* BOLD Standout Action Button with blue glow */}
                            <div className="flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#073f67] border border-sky-400/40 px-5 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(7,63,103,0.6),0_0_15px_rgba(14,165,233,0.35)] group-hover:bg-[#0a4d7d] group-hover:border-sky-300 group-hover:scale-105 group-hover:shadow-[0_6px_25px_rgba(14,165,233,0.65)] transition-all duration-300">
                              <span>Book Now</span>
                              <ArrowRight size={16} className="stroke-[3] transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

              </ScrollFloat>
            </div>
          </div>
        </section>

        {/* ── SERVICES SECTION ─────────────────────────────── */}
        <section className="w-full py-16 sm:py-20 lg:py-24">
          <div className="w-full max-w-[1700px] mx-auto px-5 sm:px-8 lg:px-12">
            {/* Header matching reference UI */}
            <ScrollFloat distance={35} scrub={1.1} className="mb-12">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                {/* Left */}
                <div className="max-w-md">
                  <Link href="/services" className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#073f67]/15 bg-white/80 px-4 py-2 shadow-[0_14px_28px_rgba(7,63,103,0.08)] backdrop-blur-sm transition-all hover:bg-[#FAF8F3] hover:scale-105 hover:shadow-[0_14px_28px_rgba(7,63,103,0.15)] group">
                    <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase text-[#073f67]">Our Services</span>
                    <ArrowRight size={13} className="text-[#073f67] transition-transform group-hover:translate-x-1" />
                  </Link>

                  <p className="text-black font-helvetica text-sm leading-relaxed max-w-base">
                    From regulatory coordination and ground operations to VIP, cargo, crew, and fuel solutions, we keep every stakeholder aligned.
                    Choose reliability, choose SABA.
                  </p>
                </div>

                {/* Right */}
                <div className="flex flex-col justify-between border-l border-gray-300 pl-6 md:pl-16 mt-16 max-w-lg self-stretch py-2">

                  <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
                    {/* Call for Booking CTA Button */}
                    <Link
                      href="/contact"
                      className="group inline-flex items-center  gap-2.5 px-5 sm:px-6 py-2.5 rounded-full bg-[#073f67] hover:bg-[#052f4d] text-white font-montserrat font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-[0_4px_18px_rgba(7,63,103,0.35)]"
                    >
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone size={12} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                      </span>
                      <span>Call for Booking</span>
                      <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Navigation pill (< >) scrolling card by card */}
                    <div className="flex items-center bg-white/90 border border-gray-200/90 rounded-full shadow-sm p-1">
                      <button
                        onClick={() => scrollByOne("left")}
                        aria-label="Previous service"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-midnight/70 hover:text-midnight hover:bg-gray-100 active:scale-95 transition-all"
                      >
                        <ChevronLeft size={16} strokeWidth={2.4} />
                      </button>
                      <button
                        onClick={() => scrollByOne("right")}
                        aria-label="Next service"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-midnight/70 hover:text-midnight hover:bg-gray-100 active:scale-95 transition-all"
                      >
                        <ChevronRight size={16} strokeWidth={2.4} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollFloat>

            {/* Horizontal carousel showing 4 cards on desktop, sliding one by one */}
            <ScrollFloat distance={45} scrub={1.3} className="w-full">
              <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex gap-5 overflow-x-auto pb-4 pt-1 scrollbar-hide scroll-smooth snap-x snap-mandatory"
              >
                {services.map((service, i) => (
                  <div
                    key={service.slug}
                    className="service-card-item shrink-0 w-[85vw] sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] snap-start"
                  >
                    <ServiceCard
                      slug={service.slug}
                      icon={service.icon}
                      title={service.title}
                      subtitle={service.subtitle}
                      description={service.description}
                      image={service.image}
                      index={i}
                    />
                  </div>
                ))}
              </div>
            </ScrollFloat>

            {/* Single continuous progress line track matching reference UI */}
            <div className="flex items-center justify-center mt-10">
              <div
                onClick={handleTrackClick}
                className="relative w-64 sm:w-80 md:w-96 h-[3px] bg-gray-200/90 rounded-full cursor-pointer overflow-hidden group"
                role="progressbar"
                aria-valuenow={Math.round(scrollProgress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                title="Click or drag to navigate services"
              >
                {/* Active sliding indicator along the single line */}
                <div
                  className="absolute top-0 bottom-0 rounded-full bg-[#052f4d] transition-all duration-300 ease-out"
                  style={{
                    width: "32%",
                    left: `${scrollProgress * 68}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── OPERATIONS / ETHIOPIA ─────────────────────────── */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_300px] gap-8 items-center">

              {/* Left — Text & CTA (top), dynamic airport card (bottom) */}
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-midnight tracking-tight leading-tight mb-5">
                    Supporting Aviation <span className=" text-[#073f67]">Operations in Ethiopia</span>
                  </h2>
                  <p className="text-midnight font-helvetica leading-relaxed mb-8 max-w-xl">
                    With a strategic location in Addis Ababa, we coordinate ground handling and flight
                    support services across major airports in Ethiopia and beyond.
                  </p>
                  <div className="flex justify-center sm:justify-start">
                    <Link
                      href="/operations"
                      className="group inline-flex items-center uppercase gap-2.5 px-7 py-3.5 rounded-full bg-[#052f4d] border border-black/20 text-white font-bold text-sm tracking-wide transition-all duration-300 hover:bg-[#022742] hover:shadow-lg"
                    >
                      Our Operations
                      <ArrowRight size={15} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Center — Interactive Ethiopia Map */}
              <div className="flex items-center justify-center w-full overflow-hidden">
                <div className="relative w-full max-w-[440px] h-[280px] sm:h-[380px] md:max-w-[550px] md:h-[350px] shrink-0">
                  {/* Map SVG */}
                  <Image
                    src="/images/ethiopia-map.svg"
                    alt="Ethiopia map"
                    fill
                    className="object-contain opacity-85"
                  />

                  {/* Clickable City Pins */}
                  {airports.map((airport) => (
                    <button
                      key={airport.id}
                      onClick={() => setSelectedAirport(airport)}
                      className="absolute z-10 cursor-pointer group"
                      style={{ top: airport.top, left: airport.left, transform: "translate(-50%, -50%)" }}
                      title={airport.name}
                    >
                      {airport.isMain ? (
                        /* Addis Ababa — large location pin + label right */
                        <div className="flex items-center gap-2">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all group-hover:scale-110 ${selectedAirport.id === airport.id ? "bg-midnight" : "bg-midnight/80"}`}>
                            <MapPin size={15} className="text-white" fill="white" />
                          </div>
                          <span className={`text-[11px] font-bold whitespace-nowrap px-2 py-0.5 rounded-md shadow-sm ${selectedAirport.id === airport.id ? "bg-midnight text-white" : "bg-white/90 text-midnight"}`}>
                            {airport.name}
                          </span>
                        </div>
                      ) : (
                        /* Secondary cities — small dot + inline label */
                        <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                          <div className={`rounded-full flex-shrink-0 transition-all ${selectedAirport.id === airport.id ? "w-3 h-3 bg-midnight shadow-md" : "w-2 h-2 bg-midnight/55 group-hover:bg-midnight group-hover:w-2.5 group-hover:h-2.5"}`} />
                          <span className={`text-[11px] font-semibold whitespace-nowrap transition-colors ${selectedAirport.id === airport.id ? "text-midnight" : "text-midnight/70 group-hover:text-midnight"}`}>
                            {airport.name}
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right — Dynamic Airport Info Card */}
              <div className="bg-[#FAF8F3] rounded-2xl shadow-xl border border-gray-100 p-6 min-w-[240px] transition-all duration-300">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-3">Selected Airport</p>

                {/* IATA code + Name */}
                <div className="mb-4">
                  <p className="text-4xl font-black text-midnight tracking-tight leading-none mb-1 transition-all">
                    {selectedAirport.id}
                  </p>
                  <p className="text-xs font-semibold text-midnight/80 leading-snug">{selectedAirport.name}</p>
                  <p className="text-[11px] text-gray-400 leading-snug">{selectedAirport.fullName}</p>
                </div>

                {/* Description */}
                <p className="text-[12px] text-gray-500 leading-relaxed mb-4 italic">
                  {selectedAirport.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-4" />

                {/* Services list */}
                <ul className="space-y-2.5">
                  {selectedAirport.services.map((label) => {
                    const Icon = serviceIconMap[label];
                    return (
                      <li key={label} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                          {Icon && <Icon size={13} className="text-midnight/60" strokeWidth={2} />}
                        </div>
                        <span className="text-sm text-midnight/80 font-medium">{label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* ── SAFETY SECTION ────────────────────────────────── */}
      <section className="relative py-24 sm:py-22  overflow-hidden ">
        <Image src="/images/hero_safety.png" alt="Safety" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/40" />

        <div className="relative z-10 container-max px-5 sm:px-8 lg:px-12">
          <ScrollFloat distance={100} scrub={1.5} className="max-w-2xl mb-16 sm:mb-24">
            <p className="section-label font-helvetica text-[#f2f4f5] text-base ">Why SABA</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Built Around Safety.<br />
              Driven by Reliability.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              We uphold the highest standards in aviation safety, compliance and operational
              excellence, ensuring your operation runs smoothly, every time.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Link href="/safety-quality" className="group inline-flex items-center gap-2 border-2 border-white/30 text-white font-montserrat font-bold text-[11px] sm:text-xs tracking-[0.1em] uppercase px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/50">
                OUR SAFETY & QUALITY <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/booking"
                className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#073f67] to-[#0a5a8a] text-white font-montserrat font-bold text-[11px] sm:text-xs tracking-[0.1em] uppercase transition-all duration-500 shadow-[0_8px_25px_rgba(7,63,103,0.4)] hover:shadow-[0_12px_35px_rgba(7,63,103,0.6)] hover:-translate-y-1 overflow-hidden"
              >
                {/* Animated shimmer sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <span className="relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur-md group-hover:bg-white/25 transition-colors">
                  <Phone size={12} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                </span>

                <span className="relative z-10">Book Now</span>

                <ArrowRight size={14} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </ScrollFloat>

          {/* Safety badges inline row */}
          <ScrollFloat distance={70} scrub={1.2} delay={0.15} className="md:flex hidden items-center justify-center grid grid-cols-2 md:grid-cols-4 gap-40 -mt-2 md:-mt-24">
            {safetyBadges.map((badge) => (
              <div key={badge.label} className="flex flex-col text-right items-center text-center group">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8 group-hover:border-warm-gold/50 transition-colors">
                  <badge.icon size={20} className="text-white/60 group-hover:text-warm-gold transition-colors" />
                </div>
                <p className="text-white font-medium text-sm tracking-wide">{badge.label}</p>
              </div>
            ))}
          </ScrollFloat>
        </div>
      </section>

      {/* ── CONTACT SECTION ──────────────────────────────── */}
      <ContactSection />
    </>
  );
}
