"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Clock3, ShieldCheck, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Fraunces } from "next/font/google";
import { services } from "@/data/services";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});

export default function BookingServicesPage() {
  const [selectedSlug, setSelectedSlug] = useState(services[0].slug);
  const [open, setOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const selected = services.find((s) => s.slug === selectedSlug) || services[0];
  const Icon = selected.icon;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  function pick(slug: string) {
    setSelectedSlug(slug);
    setOpen(false);
  }

  return (
    <main
      className={`font-[var(--font-montserrat)] ${display.variable}`}
      style={{ height: "100vh", display: "flex", overflow: "hidden" }}
    >
      {/* ══ LEFT — hero VIDEO panel (desktop only) ══════════ */}
      <div className="relative hidden lg:flex lg:w-[48%] xl:w-[52%] flex-shrink-0 flex-col overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={selected.image}
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/images/backgroundvideo2.mp4" type="video/mp4" />
          <source src="/images/background22.mp4" type="video/mp4" />
          <source src="/images/baxkgroundvideo.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#031827]/85 via-[#073f67]/65 to-[#031827]/80" />

        <div className="relative z-10 flex h-full flex-col justify-between px-10 pb-8 pt-[calc(2rem+64px)] xl:px-14 xl:pb-10 xl:pt-[calc(2.5rem+64px)]">
          {/* Trust badges */}
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
              <Clock3 size={11} className="text-[#a9c9de]" /> 24/7 Operations Desk
            </span>
            <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
              <ShieldCheck size={11} className="text-[#a9c9de]" /> Secure Handling
            </span>
          </div>

          {/* Selected service info */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3.5 py-1.5">
              <Icon size={11} className="text-[#a9c9de]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/50">
                {selected.subtitle || "Selected"}
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl xl:text-[2.4rem] font-medium text-white leading-tight mb-3">
              {selected.title}
            </h2>
            <p className="mb-7 max-w-xs text-sm leading-6 text-white/50">
              {selected.description}
            </p>
            <Link
              href={`/booking/${selected.slug}`}
              className="group inline-flex items-center gap-3 rounded-full bg-[#FAF8F3] px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-[#073f67] shadow-xl shadow-black/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:bg-[#eef4f9]"
            >
              Book This Service
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#073f67] transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={11} className="text-white" />
              </span>
            </Link>
            <p className="mt-3 text-[10px] text-white/25">
              Takes ~2 minutes &bull; No commitment
            </p>
          </div>
        </div>
      </div>

      {/* ══ RIGHT — selector panel ════════════════════════════ */}
      <div className="flex flex-1 flex-col bg-[#FAF8F3] overflow-hidden pt-[64px]">

        {/* Header */}
        <div className="flex-shrink-0 border-b border-[#073f67]/8 px-5 py-5 sm:px-8 lg:px-10">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#073f67]/40">
            Service Request
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-xl font-medium text-[#0b1620] sm:text-2xl">
            What can we coordinate for you?
          </h1>
        </div>

        {/* Main content — flex-1 with centered content */}
        <div className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-8 lg:px-10 overflow-hidden">

          {/* ── MOBILE: native-style dropdown ─────────────────── */}
          <div className="lg:hidden">
            <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#073f67]/50">
              Select a service
            </label>
            <div ref={dropRef} className="relative">
              {/* Trigger */}
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`w-full flex items-center gap-3 rounded-2xl border bg-[#FAF8F3] px-4 py-3.5 text-left shadow-sm transition-all duration-200 ${
                  open ? "border-[#073f67]/40 ring-2 ring-[#073f67]/10" : "border-[#dde3e7] hover:border-[#073f67]/25"
                }`}
              >
                <div className="h-9 w-9 flex-shrink-0 rounded-xl bg-[#073f67]/8 flex items-center justify-center">
                  <Icon size={16} className="text-[#073f67]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0b1620] truncate">{selected.title}</p>
                  {selected.subtitle && (
                    <p className="text-[11px] text-[#8a969e] mt-0.5">{selected.subtitle}</p>
                  )}
                </div>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 text-[#073f67]/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown panel */}
              {open && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-[#dde3e7] bg-[#FAF8F3] shadow-xl shadow-black/10">
                  <div className="max-h-64 overflow-y-auto py-1.5 scrollbar-hide">
                    {services.map((s) => {
                      const SIcon = s.icon;
                      const active = s.slug === selectedSlug;
                      return (
                        <button
                          key={s.slug}
                          type="button"
                          onClick={() => pick(s.slug)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            active ? "bg-[#073f67]/6" : "hover:bg-[#f5f8fb]"
                          }`}
                        >
                          <div className={`h-8 w-8 flex-shrink-0 rounded-lg flex items-center justify-center ${active ? "bg-[#073f67]" : "bg-[#073f67]/8"}`}>
                            <SIcon size={14} className={active ? "text-white" : "text-[#073f67]"} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold truncate ${active ? "text-[#073f67]" : "text-[#0b1620]"}`}>{s.title}</p>
                            {s.subtitle && <p className="text-[11px] text-[#8a969e]">{s.subtitle}</p>}
                          </div>
                          {active && <Check size={14} className="flex-shrink-0 text-[#073f67]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile description */}
            <p className="mt-3 text-xs leading-6 text-[#6b7a84]">
              {selected.description}
            </p>
          </div>

          {/* ── DESKTOP: custom dropdown ───────────────────────── */}
          <div className="hidden lg:block">
            <label className="mb-2.5 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#073f67]/50">
              Select a service
            </label>
            <div ref={dropRef} className="relative">
              {/* Trigger button */}
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`w-full flex items-center gap-4 rounded-2xl border bg-[#FAF8F3] px-5 py-4 text-left shadow-sm transition-all duration-200 ${
                  open
                    ? "border-[#073f67]/40 ring-2 ring-[#073f67]/10 shadow-md"
                    : "border-[#dde3e7] hover:border-[#073f67]/30 hover:shadow-md"
                }`}
              >
                <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-[#073f67]/8 flex items-center justify-center">
                  <Icon size={18} className="text-[#073f67]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0b1620]">{selected.title}</p>
                  {selected.subtitle && (
                    <p className="text-[12px] text-[#8a969e] mt-0.5">{selected.subtitle}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#073f67]/30 hidden xl:block">
                    Change
                  </span>
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full border border-[#073f67]/15 bg-[#f0f5fa] transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                    <ChevronDown size={14} className="text-[#073f67]/50" />
                  </div>
                </div>
              </button>

              {/* Dropdown panel */}
              {open && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-[#dde3e7] bg-[#FAF8F3] shadow-2xl shadow-black/12">
                  {/* Panel header */}
                  <div className="border-b border-[#073f67]/6 px-4 py-2.5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#073f67]/35">
                      All Services
                    </p>
                  </div>
                  {/* List */}
                  <div className="max-h-72 overflow-y-auto py-1.5 scrollbar-hide">
                    {services.map((s) => {
                      const SIcon = s.icon;
                      const active = s.slug === selectedSlug;
                      return (
                        <button
                          key={s.slug}
                          type="button"
                          onClick={() => pick(s.slug)}
                          className={`w-full flex items-center gap-3.5 px-4 py-3 text-left transition-all duration-150 ${
                            active
                              ? "bg-[#073f67]/5"
                              : "hover:bg-[#f5f8fb]"
                          }`}
                        >
                          <div
                            className={`h-9 w-9 flex-shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                              active ? "bg-[#073f67]" : "bg-[#073f67]/8"
                            }`}
                          >
                            <SIcon size={15} className={active ? "text-white" : "text-[#073f67]"} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold leading-snug ${active ? "text-[#073f67]" : "text-[#0b1620]"}`}>
                              {s.title}
                            </p>
                            {s.subtitle && (
                              <p className="text-[11px] text-[#8a969e] mt-0.5">{s.subtitle}</p>
                            )}
                          </div>
                          {active ? (
                            <Check size={14} className="flex-shrink-0 text-[#073f67]" />
                          ) : (
                            <ArrowRight size={13} className="flex-shrink-0 text-[#073f67]/15" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Selected service description */}
            <div className="mt-4 rounded-2xl border border-[#073f67]/8 bg-white/60 px-5 py-4">
              <p className="text-xs leading-6 text-[#52606d]">{selected.description}</p>
            </div>
          </div>
        </div>

        {/* ── Mobile CTA bar ──────────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-[#073f67]/8 bg-white/80 p-4 backdrop-blur-sm lg:hidden">
          <div className="mb-3 flex items-center gap-3">
            <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg">
              <Image src={selected.image} alt={selected.title} fill sizes="64px" className="object-cover" />
              <div className="absolute inset-0 bg-[#073f67]/30" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#0b1620]">{selected.title}</p>
              <p className="text-[11px] text-[#8a969e]">Selected service</p>
            </div>
          </div>
          <Link
            href={`/booking/${selected.slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073f67] py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-[#073f67]/20 transition-all hover:bg-[#052f4d]"
          >
            Book This Service <ArrowRight size={14} />
          </Link>
          <p className="mt-2 text-center text-[10px] text-[#9aabb6]">
            Not sure?{" "}
            <a href="mailto:ops@sabaaviation.com" className="text-[#073f67] font-semibold">Email us</a>
          </p>
        </div>

        {/* ── Desktop footer bar ──────────────────────────────── */}
        <div className="hidden lg:flex flex-shrink-0 items-center justify-between border-t border-[#073f67]/8 bg-white/40 px-8 py-3 lg:px-10">
          <p className="text-[10px] text-[#9aabb6]">
            Not sure?{" "}
            <a href="mailto:ops@sabaaviation.com" className="text-[#073f67] font-semibold hover:underline">
              Email our ops desk
            </a>
          </p>
          <p className="text-[10px] text-[#9aabb6]">Takes ~2 minutes &bull; Responds within the hour</p>
        </div>
      </div>
    </main>
  );
}