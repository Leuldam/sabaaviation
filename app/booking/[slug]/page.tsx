import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Clock3, ShieldCheck } from "lucide-react";
import BookingForm from "@/components/ui/BookingForm";
import { getBookingProfile } from "@/data/booking-profiles";
import { services } from "@/data/services";

interface Props {
  params?: Promise<{ slug?: string | string[] }>;
}

export default async function BookingPage({ params }: Props) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug ?? "service";
  const serviceSlug = Array.isArray(rawSlug) ? rawSlug.join("-") : rawSlug;
  const service = services.find((item) => item.slug === serviceSlug);
  const serviceTitle = service?.title ?? (serviceSlug || "service").replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  const profile = getBookingProfile(serviceSlug);
  const Icon = service?.icon;
  const heroImage = service?.image ?? "/images/service_flight_support.jpg";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f6f7] pb-20 font-[var(--font-montserrat)] text-[#0b1220]">
      <section className="relative isolate min-h-[350px] overflow-hidden bg-[#073f67] text-white">
        <Image src={heroImage} alt={`${serviceTitle} operations`} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,24,39,0.92)_0%,rgba(3,24,39,0.72)_48%,rgba(3,24,39,0.35)_100%)]" />
        <div className="relative mx-auto flex min-h-[350px] w-full max-w-7xl flex-col justify-between px-5 pb-9 pt-24 sm:px-8 sm:pb-10 sm:pt-28 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href={`/services/${serviceSlug}`} className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-[#d6aa59]"><ArrowLeft size={15} /> Back to {serviceTitle}</Link>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/75"><ShieldCheck size={15} className="text-[#d6aa59]" /> Secure request</div>
          </div>
          <div className="max-w-2xl pb-1">
            <div className="mb-3 flex items-center gap-2 text-[#d6aa59]">{Icon && <Icon size={18} />}<span className="text-[11px] font-bold uppercase tracking-[0.18em]">{profile.eyebrow}</span></div>
            <h1 className="font-helvetica text-4xl font-semibold leading-tight sm:text-5xl">Request {serviceTitle}</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/78 sm:text-base">{profile.description}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-5 pt-7 sm:px-8 sm:pt-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.7fr)] lg:items-start">
          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="border border-[#d7e0e3] bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.04)] sm:p-6">
              <div className="mb-5 flex items-center justify-between"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#073f67]">Before you start</p><Clock3 size={17} className="text-[#b67d0d]" /></div>
              <ul className="space-y-4">{profile.preparation.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[#52606d]"><span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#edf3f6] text-[#073f67]"><Check size={12} /></span>{item}</li>)}</ul>
            </div>
            <div className="border-l-2 border-[#b67d0d] bg-[#073f67] p-5 text-white sm:p-6"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d6aa59]">Response target</p><p className="mt-2 text-sm leading-6 text-white/75">{profile.responseTime}</p></div>
          </aside>

          <BookingForm serviceTitle={serviceTitle} serviceSlug={serviceSlug} profile={profile} />
        </div>
      </div>
    </main>
  );
}
