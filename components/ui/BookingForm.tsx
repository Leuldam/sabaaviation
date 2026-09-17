"use client";

import { useEffect, useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, LoaderCircle, Mail, Pencil, PlaneTakeoff } from "lucide-react";
import type { BookingField, BookingProfile } from "@/data/booking-profiles";

interface BookingFormProps {
  serviceTitle: string;
  serviceSlug: string;
  profile: BookingProfile;
}

type FormValues = Record<string, string>;
type BookingResult = { success?: boolean; reference?: string; requestDate?: string; emailSent?: boolean; ticketBase64?: string; ticketFilename?: string; error?: string; mailto?: string };

const sectionNames: Record<string, string> = {
  cargoType: "Cargo Information", cargoDescription: "Cargo Information", packages: "Cargo Information", weight: "Cargo Information", dimensions: "Cargo Information", volume: "Cargo Information", dangerousGoods: "Cargo Information", temperatureControlled: "Cargo Information", fragile: "Cargo Information", valuableCargo: "Cargo Information",
  origin: "Shipment", destination: "Shipment", arrivalAirport: "Shipment", departureAirport: "Shipment", shipmentDate: "Shipment", deliveryDate: "Shipment", handling: "Handling", documents: "Documents",
  aircraftRegistration: "Aircraft", aircraftType: "Aircraft", operator: "Aircraft", flightNumber: "Aircraft", fuelType: "Fuel Requirement", quantity: "Fuel Requirement", unit: "Fuel Requirement", upliftDate: "Fuel Requirement", upliftTime: "Fuel Requirement", airport: "Location", stand: "Location", arrivalTime: "Location", departureTime: "Location", supplier: "Location", requirements: "Additional Requirements",
  pickup: "Transportation Details", dropoff: "Transportation Details", date: "Transportation Details", pickupTime: "Transportation Details", passengerCount: "Passenger Information", passengerNames: "Passenger Information", bags: "Passenger Information", vehicle: "Vehicle", returnRequired: "Requirements", returnDate: "Requirements", returnTime: "Requirements",
};

const serviceSectionOverrides: Record<string, Record<string, string>> = {
  "flight-support": { origin: "Route", destination: "Route", aircraftType: "Aircraft", flightNumber: "Aircraft", date: "Schedule", arrivalTime: "Schedule" },
  "ground-handling": { airport: "Station", aircraftType: "Aircraft", date: "Schedule", arrivalTime: "Schedule", departureTime: "Schedule", passengerCount: "People" },
  "passenger-services": { airport: "Journey", serviceDirection: "Journey", flightNumber: "Flight", date: "Schedule", passengerCount: "Passengers" },
  "vip-business-aviation": { airport: "Airport", aircraftType: "Aircraft", date: "Schedule", arrivalTime: "Schedule", passengerCount: "Passengers", vehicle: "Ground service" },
  "crew-services": { airport: "Station", crewCount: "Crew", date: "Layover", arrivalTime: "Schedule", hotelNights: "Accommodation", flightNumber: "Flight" },
};

const sectionDescriptions: Record<string, string> = {
  Customer: "Who should our operations desk coordinate with?",
  Route: "Tell us where the operation begins and ends.",
  Aircraft: "Identify the aircraft and flight operating the request.",
  Schedule: "Give us the timing needed to coordinate the operation.",
  Cargo: "Describe the shipment so the right handling plan can be prepared.",
  "Cargo Information": "Describe the shipment so the right handling plan can be prepared.",
  Shipment: "Provide the movement and delivery routing.",
  Handling: "Select the cargo services your operation requires.",
  Documents: "Tell us which shipment documents are available.",
  "Fuel Requirement": "Specify the fuel product, quantity, and uplift timing.",
  Location: "Tell us exactly where and when the uplift will happen.",
  "Transportation Details": "Set the pickup, drop-off, date, and timing.",
  "Passenger Information": "Give us the passenger and baggage count.",
  Vehicle: "Choose the vehicle category for this transfer.",
  Requirements: "Select any additional transport services.",
  Notes: "Add anything our operations team should know before responding.",
};

function formatValue(value: string) {
  return value.includes(",") ? value.split(",").map((item) => item.trim()).join(" · ") : value;
}

function getFieldSection(field: BookingField, serviceSlug: string) {
  return serviceSectionOverrides[serviceSlug]?.[field.name] || sectionNames[field.name] || (field.name === "name" || field.name === "email" || field.name === "phone" || field.name === "company" ? "Customer" : "Operation");
}

export default function BookingForm({ serviceTitle, serviceSlug, profile }: BookingFormProps) {
  const [form, setForm] = useState<FormValues>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(window.localStorage.getItem(`saba-booking-draft-${serviceSlug}`) || "{}");
    } catch {
      return {};
    }
  });
  const [step, setStep] = useState<"form" | "review" | "confirmation">("form");
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const uid = useId();

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (result) setResult(null);
  }

  function onCheckboxChange(name: string, option: string, checked: boolean) {
    const current = (form[name] || "").split(",").filter(Boolean);
    const next = checked ? [...current, option] : current.filter((value) => value !== option);
    setForm((values) => ({ ...values, [name]: next.join(",") }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ serviceSlug, serviceTitle, form }) });
      const data = await response.json();
      setResult(data);
      if (data.success) {
        window.localStorage.removeItem(`saba-booking-draft-${serviceSlug}`);
        window.localStorage.setItem("saba-recent-request", JSON.stringify({ reference: data.reference, service: serviceTitle }));
        setStep("confirmation");
      }
    } catch {
      setResult({ error: "We could not submit the request. Please try again or contact operations directly." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => {
      QRCode.toDataURL(JSON.stringify({ serviceSlug, email: form.email, name: form.name }))
        .then((url: string) => { if (mounted) setQrPreview(url); })
        .catch(() => { if (mounted) setQrPreview(null); });
    }, 180);
    return () => { mounted = false; clearTimeout(timer); };
  }, [form.email, form.name, serviceSlug]);

  useEffect(() => {
    window.localStorage.setItem(`saba-booking-draft-${serviceSlug}`, JSON.stringify(form));
  }, [form, serviceSlug]);

  function downloadTicket() {
    if (!result?.ticketBase64) return;
    const bytes = atob(result.ticketBase64);
    const byteArray = Uint8Array.from(bytes, (character) => character.charCodeAt(0));
    const url = URL.createObjectURL(new Blob([byteArray], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = result.ticketFilename || "saba-service-confirmation.pdf";
    link.click();
    URL.revokeObjectURL(url);
  }

  const requiredFields = profile.fields.filter((field) => field.required);
  const completedFields = requiredFields.filter((field) => form[field.name]?.trim()).length;
  const progress = requiredFields.length ? Math.round((completedFields / requiredFields.length) * 100) : 0;
  const confirmationReference = result?.reference || `SABA-${new Date().getFullYear()}-${uid.replace(/:/g, "").slice(-6)}`;
  const reviewGroups = profile.fields.reduce<Record<string, BookingField[]>>((groups, field) => {
    if (form[field.name]) {
      const group = getFieldSection(field, serviceSlug);
      groups[group] = [...(groups[group] || []), field];
    }
    return groups;
  }, {});
  const formSections = Array.from(new Set(profile.fields.map((field) => getFieldSection(field, serviceSlug))));
  const sectionLabels = [...formSections, "Notes"];
  const activeSection = sectionLabels[activeSectionIndex];
  const activeFields = profile.fields.filter((field) => getFieldSection(field, serviceSlug) === activeSection);
  const isNotesSection = activeSection === "Notes";
  const isLastSection = activeSectionIndex === sectionLabels.length - 1;
  const handleFormAdvance = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLastSection) {
      const missingField = requiredFields.find((field) => !form[field.name]?.trim());
      if (missingField) {
        const missingSection = getFieldSection(missingField, serviceSlug);
        setActiveSectionIndex(sectionLabels.indexOf(missingSection));
        setResult({ error: `Please complete ${missingField.label} before reviewing your request.` });
        return;
      }
      setStep("review");
    } else {
      setActiveSectionIndex((current) => current + 1);
    }
  };

  return (
    <section className="overflow-hidden rounded-[4px] border border-[#d7e0e3] bg-white shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-5 bg-[#073f67]/95 px-5 py-5 text-white shadow-[0_8px_20px_rgba(3,24,39,0.12)] backdrop-blur-md sm:px-8">
        <div className="flex min-w-0 items-center gap-3"><div className="flex h-10 w-10 flex-none items-center justify-center bg-white/10 text-[#d6aa59]"><PlaneTakeoff size={19} /></div><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">{step === "form" ? "Service request" : step === "review" ? "Review request" : "Request received"}</p><p className="truncate font-semibold">{serviceTitle}</p></div></div>
        {step === "form" && <div className="min-w-[170px] flex-1 sm:max-w-[220px]"><div className="mb-2 flex justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/55"><span className="truncate">{activeSection} · {activeSectionIndex + 1}/{sectionLabels.length}</span><span className="text-[#d6aa59]">{progress}%</span></div><div className="h-1.5 bg-white/15"><div className="h-full bg-[#d6aa59] transition-all duration-300" style={{ width: `${progress}%` }} /></div></div>}
      </div>

      {step === "form" && <form onSubmit={handleFormAdvance} className="p-5 sm:p-8">
        <nav aria-label="Request sections" className="mb-8 grid grid-cols-2 gap-2 border-b border-[#e8ecef] pb-6 sm:grid-cols-3 lg:grid-cols-5">
          {sectionLabels.map((section, index) => <button key={section} type="button" onClick={() => setActiveSectionIndex(index)} className={`group flex min-w-0 items-center gap-2 text-left ${index === activeSectionIndex ? "text-[#073f67]" : "text-[#9aa5aa] hover:text-[#52606d]"}`}><span className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border font-mono text-[10px] font-bold ${index === activeSectionIndex ? "border-[#b67d0d] bg-[#b67d0d] text-white" : index < activeSectionIndex ? "border-[#073f67] bg-[#edf3f6] text-[#073f67]" : "border-[#dbe1e5] bg-white"}`}>{index < activeSectionIndex ? "✓" : String(index + 1).padStart(2, "0")}</span><span className="truncate text-[10px] font-bold uppercase tracking-[0.08em]">{section}</span></button>)}
        </nav>
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b67d0d]">Section {String(activeSectionIndex + 1).padStart(2, "0")} of {String(sectionLabels.length).padStart(2, "0")}</p><h2 className="mt-2 font-helvetica text-2xl font-semibold text-[#073f67] sm:text-3xl">{activeSection}</h2><p className="mt-2 text-sm text-[#71808a]">{sectionDescriptions[activeSection] || "Complete the details for this part of your request."}</p></div></div>
        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
          {activeFields.map((field) => <FieldControl key={field.name} field={field} value={form[field.name] || ""} serviceSlug={serviceSlug} onChange={onChange} onCheckboxChange={onCheckboxChange} />)}
          {isNotesSection && <div className="sm:col-span-2"><label htmlFor={`${serviceSlug}-details`} className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#52606d]">{profile.detailsLabel}</label><textarea id={`${serviceSlug}-details`} name="details" value={form.details || ""} onChange={onChange} placeholder={profile.detailsPlaceholder} className="input min-h-40 resize-y" /></div>}
        </div>
        {result?.error && <p className="mt-5 border border-red-200 bg-red-50 p-3 text-sm text-red-700">{result.error}</p>}
        <div className="sticky bottom-0 z-10 -mx-5 mt-10 flex flex-col-reverse gap-3 border-t border-[#e8ecef] bg-white/95 px-5 py-4 pt-6 backdrop-blur sm:static sm:mx-0 sm:flex-row sm:items-center sm:justify-between sm:bg-transparent sm:px-0 sm:py-0"><button type="button" className="btn-outline justify-center" onClick={() => setActiveSectionIndex((current) => Math.max(0, current - 1))} disabled={activeSectionIndex === 0}><ArrowLeft size={16} /> Previous</button><div className="flex flex-col gap-3 sm:flex-row sm:items-center"><p className="hidden text-xs text-[#8a969e] sm:block">Draft saved on this device.</p><button type="submit" className="btn-primary justify-center">{isLastSection ? "Review request" : "Continue"} <ArrowRight size={16} /></button></div></div>
      </form>}

      {step === "review" && <div className="p-5 sm:p-8"><div className="mb-8 flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b67d0d]">Review your request</p><h2 className="mt-2 text-2xl font-bold text-[#073f67]">Check the details before submission</h2></div><Pencil size={20} className="text-[#b67d0d]" /></div><div className="space-y-7">{Object.entries(reviewGroups).map(([group, fields]) => <div key={group} className="border-t border-[#dbe1e5] pt-4"><h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#073f67]">{group}</h3><div className="mt-4 grid gap-4 sm:grid-cols-2">{fields.map((field) => <div key={field.name}><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a969e]">{field.label}</p><p className="mt-1 text-sm font-semibold text-[#263746]">{formatValue(form[field.name])}</p></div>)}</div></div>)}{form.details && <div className="border-t border-[#dbe1e5] pt-4"><h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#073f67]">Additional requirements</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#52606d]">{form.details}</p></div>}</div><div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#e8ecef] pt-6 sm:flex-row sm:justify-end"><button type="button" className="btn-outline justify-center" onClick={() => setStep("form")} disabled={loading}><ArrowLeft size={16} /> Edit request</button><button type="button" className="btn-primary justify-center" onClick={() => { const formElement = document.getElementById(`${serviceSlug}-submission`) as HTMLFormElement | null; formElement?.requestSubmit(); }} disabled={loading}>{loading ? <><LoaderCircle size={16} className="animate-spin" /> Submitting request</> : <>Submit request <ArrowRight size={16} /></>}</button></div><form id={`${serviceSlug}-submission`} onSubmit={handleSubmit} className="hidden" /></div>}

      {step === "confirmation" && <div className="p-5 sm:p-10"><div className="border border-emerald-200 bg-emerald-50 p-6 sm:p-8"><CheckCircle2 className="text-emerald-700" size={27} /><p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Request received</p><h2 className="mt-2 text-2xl font-bold text-[#073f67]">Your operation request has been successfully received.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-emerald-900/75">A SABA operations representative will review the requirements and contact you.</p><p className="mt-4 border-l-2 border-[#b67d0d] pl-3 text-sm font-semibold text-[#073f67]">{result?.emailSent ? "The confirmation PDF was emailed to you and SABA operations." : "Your confirmation PDF is ready to download below."}</p><div className="mt-7 grid gap-4 border-t border-emerald-200 pt-6 sm:grid-cols-2"><Summary label="Request ID" value={confirmationReference} /><Summary label="Status" value="Pending Review" /><Summary label="Service" value={serviceTitle} /><Summary label="Operation date" value={form.date || form.shipmentDate || form.upliftDate || form.returnDate || "To be confirmed"} /></div><div className="mt-7 flex flex-wrap gap-3"><button type="button" onClick={downloadTicket} className="btn-primary"><Download size={16} /> Download confirmation</button>{result?.mailto && <a className="btn-outline" href={result.mailto}><Mail size={16} /> Contact operations</a>}</div></div><div className="mt-6 flex items-center gap-4 border-t border-[#e8ecef] pt-5 text-xs text-[#52606d]">{qrPreview && <Image src={qrPreview} alt="Request confirmation QR code" width={64} height={64} unoptimized />}<div><p className="font-bold uppercase tracking-[0.14em] text-[#073f67]">Reference</p><p className="mt-1 font-mono">{confirmationReference}</p></div></div></div>}
      {step !== "confirmation" && <div className="flex items-center gap-2 border-t border-[#e8ecef] bg-[#fafbfb] px-5 py-4 text-xs text-[#8a969e] sm:px-8"><FileText size={14} /> Your details are used only to coordinate this service request.</div>}
    </section>
  );
}

function FieldControl({ field, value, serviceSlug, onChange, onCheckboxChange }: { field: BookingField; value: string; serviceSlug: string; onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; onCheckboxChange: (name: string, option: string, checked: boolean) => void }) {
  if (field.control === "checkboxes") return <fieldset className="sm:col-span-2"><legend className="mb-3 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#52606d]">{field.label}</legend><div className="grid gap-3 sm:grid-cols-2">{field.options?.map((option) => { const id = `${serviceSlug}-${field.name}-${option.replace(/\s+/g, "-").toLowerCase()}`; return <label key={option} htmlFor={id} className="flex cursor-pointer items-center gap-3 rounded-[3px] border border-[#dbe1e5] bg-[#f8fafb] px-3 py-3 text-sm text-[#52606d] transition hover:border-[#b67d0d] hover:bg-[#fffdf8]"><input id={id} type="checkbox" checked={value.split(",").includes(option)} onChange={(event) => onCheckboxChange(field.name, option, event.target.checked)} className="h-4 w-4 accent-[#073f67]" />{option}</label>; })}</div></fieldset>;
  return <div className={field.name === "company" ? "sm:col-span-2" : ""}><label htmlFor={`${serviceSlug}-${field.name}`} className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#52606d]">{field.label}{field.required && <span className="ml-1 text-[#b67d0d]">*</span>}</label>{field.options ? <select id={`${serviceSlug}-${field.name}`} name={field.name} value={value} onChange={onChange} required={field.required} className="input border-[#d7e0e3] bg-[#f8fafb] shadow-none"><option value="">{field.placeholder}</option>{field.options.map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input id={`${serviceSlug}-${field.name}`} name={field.name} value={value} onChange={onChange} placeholder={field.placeholder} className="input border-[#d7e0e3] bg-[#f8fafb] shadow-none" type={field.type || "text"} required={field.required} />}</div>;
}

function Summary({ label, value }: { label: string; value: string }) { return <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700/70">{label}</p><p className="mt-1 text-sm font-bold text-[#073f67]">{value}</p></div>; }
