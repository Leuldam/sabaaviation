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
  Phone,
  Plane,
  Package,
  Luggage,
  Truck,
} from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import CTABanner from "@/components/ui/CTABanner";
import PartnerLogos from "@/components/ui/PartnerLogos";
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
        title="SABA AVIATION SERVICE & FLIGHT SUPPORT "
        subtitle="Professional aviation ground handling and flight support services in Ethiopia."
        backgroundImage="/images/hero_home.png"
        backgroundVideo="/images/backgroundvideo2.mp4"
        fullHeight
      >

        {/* ── CONTACT US CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          {/* Glowing pill button */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 bg-warm-gold text-midnight font-black text-xs sm:text-sm uppercase tracking-widest px-7 py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(218,164,40,0.5)]"
          >
            {/* Animated shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative">Contact Us</span>
            <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-midnight/20 group-hover:bg-midnight/30 transition-colors">
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>

          {/* Pulsing ring + divider + availability text */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-3 h-3">
              <span className="absolute w-3 h-3 rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <span className="text-white/60 text-[11px] uppercase tracking-[0.2em] font-light">
              Available 24 / 7
            </span>
          </div>
        </motion.div>

        {/* Trust badges */}
        <div className="flex flex-row items-center font-montserrat font-medium uppercase tracking-widest justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10 w-full">
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12  rounded-full border border-warm-gold flex items-center justify-center">
              <Clock size={16} className="text-gold sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-white  text-sm font-montserrat font-semibold sm:text-lg font-semibold">24/7</p>
              <p className="text-white  font-normal text-[10px] sm:text-sm leading-tight">Operational<br className="sm:hidden" /> Support</p>
            </div>
          </div>

          <div className="w-px h-8 sm:h-12 bg-white/10 shrink-0" />

          <div className="text-right">
            <p className="text-white text-xs sm:text-base leading-tight sm:leading-relaxed">
              Your Trusted Aviation Partner<br className="hidden sm:block" /> in Ethiopia
            </p>
          </div>
        </div>
      </HeroSection>

      {/* ── PARTNER LOGOS ────────────────────────────────── */}
      <PartnerLogos />

      {/* ── UNIFIED LIGHT GRADIENT CONTENT ──────────────── */}
      <div className="bg-gradient-to-b from-white to-gray-200">
        {/* ── ABOUT SECTION ────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollFloat distance={100} scrub={1.5}>
                <p className="section-label text-xs md:text-base font-helvetica text-[#DAA428]">About SABA</p>
                <h2 className="text-3xl md:text-4xl font-bold text-midnight  mb-6 tracking-tight">
                  Aviation Support,{" "}
                  <span className="text-[#DAA428]">Professionally Delivered.</span>
                </h2>
                <p className="text-midnight font-helvetica text-justify text-sm sm:text-base leading-relaxed mb-8">
                  SABA Aviation Service & Flight Support PLC provides reliable, responsive and
                  professionally coordinated aviation support services designed to keep aircraft, crew
                  and passengers moving efficiently through Ethiopia.
                </p>
                <div className="flex justify-center sm:justify-start">
                  <Link href="/about" className="btn-dark mt-4 cursor-pointer">
                    MORE ABOUT US <ArrowRight size={16} />
                  </Link>
                </div>
              </ScrollFloat>

              <ScrollFloat distance={80} scrub={1.8} delay={0.1}>
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src="/images/backgroundimage2.png"
                    alt="SABA Aviation team"
                    fill
                    className="object-cover"
                  />
                  {/* Subtle gold border accent */}
                  <div className="absolute inset-0 rounded-xl border border-warm-gold/20" />
                </div>
              </ScrollFloat>
            </div>
          </div>
        </section>

        {/* ── SERVICES SECTION ─────────────────────────────── */}
        <section className="section-padding">
          <div className="container-max">
            {/* Header matching reference UI */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
              {/* Left */}
              <div className="max-w-md">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-1 h-4 bg-[#DAA428] rounded-full inline-block" />
                  <p className=" text-xs md:text-base font-semibold font-helvetica text-[#DAA428] tracking-wider uppercase">
                    Services We Offer
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-midnight tracking-tight leading-[1.08] mb-4">
                  Certified Excellence
                </h2>
                <p className="text-black font-helvetica text-base leading-relaxed max-w-base">
                  From flight permits and ground handling to VIP concierge, we've got you covered.
                  Choose reliability, choose SABA.
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col justify-between border-l border-gray-300 pl-6 md:pl-8 max-w-lg self-stretch py-2">
                <p className="text-midnight uppercase text-base  font-helvetica tracking-wider leading-relaxed mb-6 hidden md:block">
                  Comprehensive end-to-end aviation solutions tailored for seamless operations
                  across Ethiopia.
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
                  {/* Call for Booking CTA Button */}
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full bg-[#DAA428] hover:bg-[#F3BA35] text-midnight font-montserrat font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-[0_4px_18px_rgba(218,164,40,0.35)]"
                  >
                    <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone size={12} className="text-midnight group-hover:rotate-12 transition-transform duration-300" />
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

            {/* Horizontal carousel showing 4 cards on desktop, sliding one by one */}
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
                  className="absolute top-0 bottom-0 rounded-full bg-[#5A121C] transition-all duration-300 ease-out"
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
                    Supporting Aviation <span className=" text-[#DAA428]">Operations in Ethiopia</span>
                  </h2>
                  <p className="text-midnight font-helvetica leading-relaxed mb-8 max-w-xl">
                    With a strategic location in Addis Ababa, we coordinate ground handling and flight
                    support services across major airports in Ethiopia and beyond.
                  </p>
                  <div className="flex justify-center sm:justify-start">
                    <Link
                      href="/operations"
                      className="group inline-flex items-center uppercase gap-2.5 px-7 py-3.5 rounded-full bg-[#141414] border border-black/20 text-white font-bold text-sm tracking-wide transition-all duration-300 hover:bg-[#252525] hover:shadow-lg"
                    >
                      Our Operations
                      <ArrowRight size={15} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Center — Interactive Ethiopia Map */}
              <div className="flex items-center justify-center w-full overflow-hidden">
                <div className="relative w-full max-w-[440px] h-[350px] sm:h-[380px] md:max-w-[550px] md:h-[450px] shrink-0">
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
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 min-w-[240px] transition-all duration-300">
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
      <section className="relative py-24 sm:py-32  overflow-hidden mt-12">
        <Image src="/images/hero_safety.png" alt="Safety" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/40" />

        <div className="relative z-10 container-max px-5 sm:px-8 lg:px-12">
          <ScrollFloat distance={100} scrub={1.5} className="max-w-2xl mb-16 sm:mb-24">
            <p className="section-label font-helvetica text-[#DAA428] text-base ">Why SABA</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Built Around Safety.<br />
              Driven by Reliability.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              We uphold the highest standards in aviation safety, compliance and operational
              excellence, ensuring your operation runs smoothly, every time.
            </p>
            <Link href="/safety-quality" className="btn-outline">
              OUR SAFETY & QUALITY <ArrowRight size={16} />
            </Link>
          </ScrollFloat>

          {/* Safety badges inline row */}
          <ScrollFloat distance={70} scrub={1.2} delay={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {safetyBadges.map((badge) => (
              <div key={badge.label} className="flex flex-col items-center sm:items-start text-center sm:text-left group">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:border-warm-gold/50 transition-colors">
                  <badge.icon size={20} className="text-white/60 group-hover:text-warm-gold transition-colors" />
                </div>
                <p className="text-white font-medium text-sm tracking-wide">{badge.label}</p>
              </div>
            ))}
          </ScrollFloat>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
