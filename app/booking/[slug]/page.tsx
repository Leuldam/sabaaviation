import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Clock, Zap } from "lucide-react";
import { Fraunces } from "next/font/google";
import BookingForm from "@/components/ui/BookingForm";
import BackButton from "@/components/ui/BackButton";
import { getBookingProfile } from "@/data/booking-profiles";
import { services } from "@/data/services";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});

interface Props {
  params?: Promise<{ slug?: string | string[] }>;
}

export default async function BookingPage({ params }: Props) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug ?? "service";
  const serviceSlug = Array.isArray(rawSlug) ? rawSlug.join("-") : rawSlug;
  const service = services.find((item) => item.slug === serviceSlug);
  const serviceTitle =
    service?.title ??
    (serviceSlug || "service")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  const profile = getBookingProfile(serviceSlug);
  const Icon = service?.icon;
  const heroImage = service?.image ?? "/images/service_flight_support.jpg";

  return (
    <main className={`font-[var(--font-montserrat)] ${display.variable}`}>
      {/* ── Mobile: stacked layout ───────────────────────────── */}
      <div className="lg:hidden">
        {/* Compact image header strip */}
        <div className="relative h-[calc(10rem+64px)] overflow-hidden">
          <Image src={heroImage} alt={serviceTitle} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031827]/85 to-[#031827]/20" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
            <div>
              <BackButton
                iconSize={9}
                className="mb-1.5 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-white/45"
              >
                All Services
              </BackButton>
              <h1 className="font-[family-name:var(--font-display)] text-xl font-medium text-white leading-tight">
                {serviceTitle}
              </h1>
            </div>
            {Icon && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/12 border border-white/15">
                <Icon size={15} className="text-[#a9c9de]" />
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="bg-[#FAF8F3]">
          <BookingForm serviceTitle={serviceTitle} serviceSlug={serviceSlug} profile={profile} />
        </div>
      </div>

      {/* ── Desktop: two-column full-height layout ───────────── */}
      <div
        className="hidden lg:flex"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        {/* LEFT — sticky info sidebar */}
        <aside className="relative flex w-[340px] xl:w-[380px] flex-shrink-0 flex-col overflow-hidden">
          {/* Background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroImage}
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src="/images/backgroundvideo2.mp4" type="video/mp4" />
            <source src="/images/background22.mp4" type="video/mp4" />
            <source src="/images/baxkgroundvideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#031827]/80 via-[#073f67]/80 to-[#031827]/90" />

          <div className="relative z-10 flex h-full flex-col px-8 pb-8 pt-[calc(2rem+64px)] xl:px-10">
            {/* Back nav */}
            <BackButton
              iconSize={11}
              className="mb-auto inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white/30 transition-colors hover:text-white/70"
            >
              All Services
            </BackButton>

            {/* Service identity — centered in panel */}
            <div className="py-6">
              <div className="mb-4 flex items-center gap-2">
                {Icon && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10">
                    <Icon size={14} className="text-[#a9c9de]" />
                  </div>
                )}
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#a9c9de]">
                  {profile.eyebrow}
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-2xl xl:text-3xl font-medium text-white leading-tight mb-3">
                {serviceTitle}
              </h1>
              <p className="text-xs leading-6 text-white/50 mb-6">
                {profile.description}
              </p>

              <div className="space-y-2.5">
                {[
                  { I: ShieldCheck, t: "Secure & confidential" },
                  { I: Clock, t: profile.responseTime },
                  { I: Zap, t: "Takes about 2 minutes" },
                ].map(({ I, t }) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <I size={12} className="text-[#a9c9de] flex-shrink-0" />
                    <span className="text-[11px] text-white/40 leading-snug">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What happens next */}
            <div className="border-t border-white/8 pt-5">
              <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.22em] text-white/20">
                What happens next
              </p>
              <ol className="space-y-2">
                {profile.preparation.map((item, i) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-white/8 text-[8px] font-bold text-white/30">
                      {i + 1}
                    </span>
                    <p className="text-[10px] leading-relaxed text-white/28">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </aside>

        {/* RIGHT — scrollable form panel */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[#FAF8F3] pt-[64px]">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <BookingForm key={serviceSlug} serviceTitle={serviceTitle} serviceSlug={serviceSlug} profile={profile} />
          </div>
        </div>
      </div>
    </main>
  );
}