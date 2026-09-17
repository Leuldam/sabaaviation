"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { services } from "@/data/services";

export default function BookingServicesPage() {
  const [selectedSlug, setSelectedSlug] = useState(services[0].slug);
  const [recentRequest] = useState<{ reference: string; service: string } | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(window.localStorage.getItem("saba-recent-request") || "null");
    } catch {
      return null;
    }
  });
  const selectedService = services.find((service) => service.slug === selectedSlug) || services[0];

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f5f7f7] pb-20 pt-24 font-[var(--font-montserrat)] text-[#0b1220] sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] overflow-hidden bg-[#073f67]">
        <Image src={selectedService.image} alt="" fill sizes="100vw" className="object-cover object-center opacity-80 transition-opacity duration-500" priority />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,39,0.88)_0%,rgba(3,24,39,0.72)_48%,rgba(245,247,247,0.98)_100%)]" />
      </div>
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-center gap-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/75">
          <span className="inline-flex items-center gap-2"><Clock3 size={15} className="text-[#d6aa59]" /> 24/7 operations desk</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#d6aa59]" /> Secure request handling</span>
        </div>

        <section className="overflow-hidden rounded-[4px] border border-white/70 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative h-[300px] bg-[#073f67] lg:h-[590px]">
              <Image src={selectedService.image} alt={selectedService.title} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover transition-opacity duration-300" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031827]/90 via-[#031827]/20 to-transparent" />
              <div className="absolute bottom-7 left-6 right-6 text-white sm:bottom-9 sm:left-9 sm:right-9"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d6aa59]">Selected service</p><h2 className="mt-2 font-helvetica text-3xl font-semibold leading-tight sm:text-4xl">{selectedService.title}</h2><p className="mt-3 max-w-sm text-sm leading-6 text-white/75">{selectedService.description}</p></div>
            </div>

            <div className="flex flex-col justify-center bg-white p-6 sm:p-10 lg:p-14">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b67d0d]">Start a service request</p>
              <h1 className="mt-3 max-w-md font-helvetica text-4xl font-semibold leading-[1.05] text-[#073f67] sm:text-5xl">What can we coordinate for you?</h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#52606d]">Choose a service and we&apos;ll show you only the details needed for that operation.</p>

              <div className="mt-9">
                <label htmlFor="booking-service" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#52606d]">Service required</label>
                <select id="booking-service" value={selectedSlug} onChange={(event) => setSelectedSlug(event.target.value)} className="input border-[#cfdadd] bg-[#f8fafb] text-[#073f67] shadow-none">
                  {services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}
                </select>
              </div>

              <div className="mt-7 border-t border-[#e5eaec] pt-6"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a969e]">You&apos;ll provide</p><ul className="mt-3 space-y-2 text-sm text-[#52606d]"><li>• Contact and company details</li><li>• Service-specific operational requirements</li><li>• Preferred date, location, and notes</li></ul></div>

              <Link href={`/booking/${selectedService.slug}`} className="btn-primary mt-9 justify-center sm:w-fit">Continue to booking <ArrowRight size={16} /></Link>
              <p className="mt-4 text-xs leading-5 text-[#8a969e]">Takes about 2 minutes. You can review everything before submitting.</p>
            </div>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-[#52606d]">
          <span className="mr-1 font-bold uppercase tracking-[0.14em] text-[#8a969e]">Quick start</span>
          {services.slice(0, 4).map((service) => <button key={service.slug} type="button" onClick={() => setSelectedSlug(service.slug)} className={`border px-3 py-2 transition ${selectedSlug === service.slug ? "border-[#073f67] bg-[#073f67] text-white" : "border-[#d7e0e3] bg-white hover:border-[#b67d0d]"}`}>{service.title}</button>)}
        </div>

        {recentRequest && <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-l-2 border-[#b67d0d] bg-white px-4 py-3 text-sm text-[#52606d] shadow-sm"><span>Last request: <strong className="text-[#073f67]">{recentRequest.service}</strong> <span className="font-mono text-xs">{recentRequest.reference}</span></span><span className="text-xs text-[#8a969e]">Your confirmation is in your email or downloads.</span></div>}
      </div>
    </main>
  );
}
