"use client";

import { useEffect, useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { CheckCircle2, Download, LoaderCircle, Mail, Check, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { BookingField, BookingProfile } from "@/data/booking-profiles";

interface BookingFormProps {
  serviceTitle: string;
  serviceSlug: string;
  profile: BookingProfile;
}
type FormValues = Record<string, string>;
type BookingResult = {
  success?: boolean; reference?: string; requestDate?: string;
  ticketBase64?: string; ticketFilename?: string;
  error?: string; mailto?: string;
};

/* ═══ Field renderer ═══════════════════════════════════════════ */
function Field({
  field, value, serviceSlug, onChange, onCheckboxChange,
}: {
  field: BookingField; value: string; serviceSlug: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (name: string, option: string, checked: boolean) => void;
}) {
  const inputCls =
    "w-full rounded-xl border border-[#dde3e7] bg-white px-4 py-3 text-sm text-[#0b1220] " +
    "placeholder:text-[#b5c0c8] focus:outline-none focus:ring-2 focus:ring-[#073f67]/15 " +
    "focus:border-[#073f67]/40 transition-all duration-200 shadow-sm font-[var(--font-montserrat)]";

  if (field.control === "checkboxes") {
    return (
      <fieldset className="sm:col-span-2">
        <legend className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#6b7a84]">
          {field.label}
          {field.required && <span className="ml-1 text-[#073f67]">*</span>}
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {field.options?.map((opt) => {
            const id = `${serviceSlug}-${field.name}-${opt.replace(/\s+/g, "-").toLowerCase()}`;
            const checked = value.split(",").includes(opt);
            return (
              <label
                key={opt}
                htmlFor={id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 ${
                  checked
                    ? "border-[#073f67]/40 bg-[#073f67]/5 text-[#073f67] font-medium"
                    : "border-[#dde3e7] bg-white text-[#52606d] hover:border-[#073f67]/25 hover:bg-[#f5f8fb]"
                }`}
              >
                <span
                  className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    checked ? "border-[#073f67] bg-[#073f67]" : "border-[#c8d3da]"
                  }`}
                >
                  {checked && <Check size={9} className="text-white" />}
                </span>
                <input
                  id={id}
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => onCheckboxChange(field.name, opt, e.target.checked)}
                  className="sr-only"
                />
                {opt}
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  const isWide = ["company", "passengerNames"].includes(field.name);
  return (
    <div className={isWide ? "sm:col-span-2" : ""}>
      <label
        htmlFor={`${serviceSlug}-${field.name}`}
        className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#6b7a84]"
      >
        {field.label}
        {field.required && <span className="ml-1 text-[#073f67]">*</span>}
      </label>
      {field.options ? (
        <select
          id={`${serviceSlug}-${field.name}`}
          name={field.name}
          value={value}
          onChange={onChange}
          required={field.required}
          className={inputCls}
        >
          <option value="">{field.placeholder || "Select\u2026"}</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          id={`${serviceSlug}-${field.name}`}
          name={field.name}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          type={field.type || "text"}
          required={field.required}
          className={inputCls}
        />
      )}
    </div>
  );
}

const CONTACT_FIELDS = ["name", "email", "phone", "company"];

/* ═══ Main form component ══════════════════════════════════════ */
export default function BookingForm({ serviceTitle, serviceSlug, profile }: BookingFormProps) {
  const [form, setForm] = useState<FormValues>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(window.localStorage.getItem(`saba-booking-draft-${serviceSlug}`) || "{}");
    } catch { return {}; }
  });
  const [step, setStep] = useState<"form" | "done">("form");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const uid = useId();

  // Autosave
  useEffect(() => {
    window.localStorage.setItem(`saba-booking-draft-${serviceSlug}`, JSON.stringify(form));
  }, [form, serviceSlug]);

  // QR code
  useEffect(() => {
    let alive = true;
    const t = setTimeout(() => {
      QRCode.toDataURL(JSON.stringify({ serviceSlug, email: form.email, name: form.name }))
        .then((url: string) => { if (alive) setQr(url); })
        .catch(() => {});
    }, 300);
    return () => { alive = false; clearTimeout(t); };
  }, [form.email, form.name, serviceSlug]);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (result?.error) setResult(null);
  }
  function onCheckbox(name: string, opt: string, checked: boolean) {
    const cur = (form[name] || "").split(",").filter(Boolean);
    setForm((p) => ({ ...p, [name]: (checked ? [...cur, opt] : cur.filter((v) => v !== opt)).join(",") }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceSlug, serviceTitle, form }),
      });
      const data = await res.json();
      setResult(data);
      if (data.success) {
        window.localStorage.removeItem(`saba-booking-draft-${serviceSlug}`);
        window.localStorage.setItem("saba-recent-request", JSON.stringify({ reference: data.reference, service: serviceTitle }));
        setStep("done");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setResult({ error: "Could not submit. Please try again or contact operations." });
    } finally {
      setLoading(false);
    }
  }

  function downloadTicket() {
    if (!result?.ticketBase64) return;
    const bytes = atob(result.ticketBase64);
    const arr = Uint8Array.from(bytes, (c) => c.charCodeAt(0));
    const url = URL.createObjectURL(new Blob([arr], { type: "application/pdf" }));
    const a = document.createElement("a");
    a.href = url; a.download = result.ticketFilename || "saba-confirmation.pdf"; a.click();
    URL.revokeObjectURL(url);
  }

  const ref = result?.reference || `SABA-${new Date().getFullYear()}-${uid.replace(/:/g, "").slice(-6)}`;
  const contactFields = profile.fields.filter((f) => CONTACT_FIELDS.includes(f.name));
  const opFields = profile.fields.filter((f) => !CONTACT_FIELDS.includes(f.name));

  /* ── Confirmation ──────────────────────────────────────────── */
  if (step === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="px-6 py-14 sm:px-10 lg:px-16 xl:px-20"
      >
        {/* Success mark */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
          >
            <CheckCircle2 size={38} className="text-emerald-600" />
          </motion.div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium text-[#073f67] mb-2">
            Request Received
          </h2>
          <p className="text-sm text-[#6b7a84] max-w-sm mx-auto leading-relaxed">
            Our operations desk has your request and will be in touch shortly.
          </p>
        </div>

        {/* Reference */}
        <div className="mb-5 flex items-center gap-4 rounded-2xl border border-[#dde3e7] bg-white p-5 shadow-sm">
          {qr && (
            <Image src={qr} alt="QR" width={68} height={68} unoptimized className="rounded-xl flex-shrink-0 opacity-75" />
          )}
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#9aabb6]">Reference</p>
            <p className="truncate font-mono text-xl font-bold text-[#073f67]">{ref}</p>
            <p className="mt-1 text-[11px] text-[#9aabb6]">Keep this for your records</p>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8 grid grid-cols-2 gap-2.5">
          {[
            { label: "Service", value: serviceTitle },
            { label: "Status", value: "Pending Review" },
            { label: "Requested", value: result?.requestDate || new Date().toLocaleDateString() },
            { label: "Op. Date", value: form.date || form.shipmentDate || form.upliftDate || "TBC" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-[#e8ecef] bg-white px-4 py-3.5">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-[#9aabb6]">{label}</p>
              <p className="text-sm font-semibold text-[#263746] leading-snug">{value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <button
            onClick={downloadTicket}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#073f67] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#073f67]/15 transition-all hover:bg-[#052f4d] hover:-translate-y-0.5"
          >
            <Download size={15} /> Download Confirmation
          </button>
          {result?.mailto && (
            <a
              href={result.mailto}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#dde3e7] bg-white px-6 py-4 text-sm font-semibold text-[#073f67] transition-all hover:bg-[#f0f5fa] hover:-translate-y-0.5"
            >
              <Mail size={15} /> Contact Operations
            </a>
          )}
        </div>
      </motion.div>
    );
  }

  /* ── Form ──────────────────────────────────────────────────── */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={onSubmit}>
        <div className="px-5 pt-7 pb-4 sm:px-8 lg:px-10 sm:pt-8">

          {/* ── Page header ── */}
          <div className="mb-7 border-b border-[#073f67]/8 pb-6">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#073f67]/40">
              Service Request
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium text-[#0b1620] sm:text-3xl">
              Tell us what you need
            </h2>
            <p className="mt-2 text-sm text-[#6b7a84]">
              Fill in the details — our desk responds within the hour.
            </p>
          </div>

          {/* ── Contact ── */}
          <div className="mb-6">
            <GroupLabel n={1} title="Your contact details" hint="Who should we reach?" />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {contactFields.map((f) => (
                <Field
                  key={f.name}
                  field={f}
                  value={form[f.name] || ""}
                  serviceSlug={serviceSlug}
                  onChange={onChange}
                  onCheckboxChange={onCheckbox}
                />
              ))}
            </div>
          </div>

          {/* ── Operation ── */}
          {opFields.length > 0 && (
            <div className="mb-7">
            <div className="mb-5 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#073f67]/8" />
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#b0bcc5]">
                  Operation details
                </span>
                <div className="h-px flex-1 bg-[#073f67]/8" />
              </div>
              <GroupLabel n={2} title="Operation details" hint="Tell us about the service" />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {opFields.map((f) => (
                  <Field
                    key={f.name}
                    field={f}
                    value={form[f.name] || ""}
                    serviceSlug={serviceSlug}
                    onChange={onChange}
                    onCheckboxChange={onCheckbox}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Notes ── */}
          <div className="mb-6">
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#073f67]/8" />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#b0bcc5]">
                Additional notes
              </span>
              <div className="h-px flex-1 bg-[#073f67]/8" />
            </div>
            <GroupLabel
              n={opFields.length > 0 ? 3 : 2}
              title={profile.detailsLabel}
              hint="Optional — extra context helps us prepare faster"
              optional
            />
            <textarea
              id={`${serviceSlug}-details`}
              name="details"
              value={form.details || ""}
              onChange={onChange}
              placeholder={profile.detailsPlaceholder}
              rows={3}
              className="mt-5 w-full rounded-xl border border-[#dde3e7] bg-white px-4 py-3 text-sm text-[#0b1220] placeholder:text-[#b5c0c8] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#073f67]/15 focus:border-[#073f67]/40 resize-none transition-all duration-200 font-[var(--font-montserrat)]"
            />
          </div>

          {/* ── Error ── */}
          <AnimatePresence>
            {result?.error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
              >
                <span className="mt-0.5 flex-shrink-0 text-red-400">&#9888;</span>
                {result.error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Submit ── */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#073f67] px-10 py-4 text-sm font-bold text-white shadow-lg shadow-[#073f67]/20 transition-all duration-300 hover:bg-[#052f4d] hover:shadow-xl hover:shadow-[#073f67]/25 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading
                ? <><LoaderCircle size={17} className="animate-spin" /> Sending&hellip;</>
                : <><Send size={15} /> Send Request</>
              }
            </button>
            <p className="text-xs text-[#9aabb6]">
              Draft auto-saved &bull; Responds within the hour
            </p>
          </div>
        </div>

        {/* Footer bar */}
        <div className="mt-6 flex items-center gap-2.5 border-t border-[#073f67]/8 bg-white/60 px-5 py-3.5 text-[10px] text-[#9aabb6] sm:px-8 lg:px-10">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-[#a9c9de]">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Your details are used only to coordinate this request and kept strictly confidential.
        </div>
      </form>
    </motion.div>
  );
}

/* ── Group label sub-component ─────────────────────────────────── */
function GroupLabel({
  n, title, hint, optional,
}: { n: number; title: string; hint: string; optional?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#073f67] text-[11px] font-bold text-white">
        {n}
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#0b1620]">
          {title}
          {optional && (
            <span className="ml-2 text-[10px] font-normal text-[#9aabb6] tracking-normal normal-case">
              (optional)
            </span>
          )}
        </h3>
        <p className="text-[11px] text-[#9aabb6] mt-0.5">{hint}</p>
      </div>
    </div>
  );
}
