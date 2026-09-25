"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, PlaneTakeoff } from "lucide-react";

interface ServiceRequestFormProps {
  serviceTitle: string;
  serviceSlug: string;
}

export default function ServiceRequestForm({
  serviceTitle,
  serviceSlug,
}: ServiceRequestFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    date: "",
    location: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipient = "info@sabaaviation.com";
    const subject = encodeURIComponent(`${serviceTitle} Request`);
    const body = encodeURIComponent(
      `Service requested: ${serviceTitle}\n` +
        `Service slug: ${serviceSlug}\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || "N/A"}\n` +
        `Company: ${formData.company || "N/A"}\n` +
        `Service type: ${formData.service || "N/A"}\n` +
        `Preferred date: ${formData.date || "N/A"}\n` +
        `Location: ${formData.location || "N/A"}\n\n` +
        `Request Details:\n${formData.message}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      date: "",
      location: "",
      message: "",
    });
    setStep(1);
  };

  return (
    <div className="mt-0 rounded-2xl border border-[#0A0A0A]/5 bg-[#FAF8F3] p-3 shadow-[0_18px_45px_rgba(15,23,42,0.1)] sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2.5 border-b border-black/5 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-warm-gold/10 text-warm-gold sm:h-9 sm:w-9">
            <PlaneTakeoff size={16} />
          </div>
          <div>
            <p className="text-[8px] uppercase tracking-[0.2em] text-midnight/40 font-semibold sm:text-[9px]">
              Service Request
            </p>
            <h3 className="text-base font-bold text-midnight sm:text-lg">{serviceTitle}</h3>
          </div>
        </div>
        <div className="w-20 sm:w-24">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#d2a34e] via-[#c99826] to-[#b67d0d] transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-700">
          <div className="flex items-start gap-2">
            <CheckCircle2 size={18} className="mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Your request has been sent.</p>
            </div>
          </div>
        </div>
      ) : step === 1 ? (
        <form onSubmit={handleNext} className="space-y-2.5 sm:space-y-3">
          <div>
            <label htmlFor="name" className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-midnight/60 sm:text-[9px]">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-2.5 py-2 text-xs text-midnight placeholder:text-gray-400 focus:border-warm-gold/50 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-midnight/60 sm:text-[9px]">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-2.5 py-2 text-xs text-midnight placeholder:text-gray-400 focus:border-warm-gold/50 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-midnight/60 sm:text-[9px]">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+251 911 000000"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-2.5 py-2 text-xs text-midnight placeholder:text-gray-400 focus:border-warm-gold/50 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="company" className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-midnight/60 sm:text-[9px]">
              Company / Operator
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="Operator name"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-2.5 py-2 text-xs text-midnight placeholder:text-gray-400 focus:border-warm-gold/50 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-warm-gold px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-midnight sm:text-[10px]"
          >
            Next <ArrowRight size={12} />
          </button>
        </form>
      ) : step === 2 ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          setStep(3);
        }} className="space-y-2.5 sm:space-y-3">
          <div>
            <label htmlFor="service" className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-midnight/60 sm:text-[9px]">
              Service Needed
            </label>
            <input
              id="service"
              name="service"
              type="text"
              required
              value={formData.service}
              onChange={handleChange}
              placeholder="e.g. Ground Handling"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-2.5 py-2 text-xs text-midnight placeholder:text-gray-400 focus:border-warm-gold/50 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="date" className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-midnight/60 sm:text-[9px]">
              Preferred Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-2.5 py-2 text-xs text-midnight focus:border-warm-gold/50 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="location" className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-midnight/60 sm:text-[9px]">
              Airport / Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Addis Ababa"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-2.5 py-2 text-xs text-midnight placeholder:text-gray-400 focus:border-warm-gold/50 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-black/10 bg-[#FAF8F3] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-midnight transition-colors hover:bg-gray-100 sm:text-[10px]"
            >
              Back
            </button>
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-warm-gold px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-midnight sm:text-[10px]"
            >
              Next <ArrowRight size={12} />
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
          <div>
            <label htmlFor="message" className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-midnight/60 sm:text-[9px]">
              Request Details
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you need."
              className="w-full resize-none rounded-md border border-gray-200 bg-gray-50 px-2.5 py-2 text-xs text-midnight placeholder:text-gray-400 focus:border-warm-gold/50 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-black/10 bg-[#FAF8F3] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-midnight transition-colors hover:bg-gray-100 sm:text-[10px]"
            >
              Back
            </button>
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-warm-gold px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-midnight sm:text-[10px]"
            >
              Send <ArrowRight size={12} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
