"use client";

import { useEffect, useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Download, LoaderCircle, Check, Send, ArrowLeft, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { BookingField, BookingProfile } from "@/data/booking-profiles";
import { services } from "@/data/services";

interface BookingFormProps {
  serviceTitle: string;
  serviceSlug: string;
  profile: BookingProfile;
}
type FormValues = Record<string, string>;
type BookingResult = {
  success?: boolean; reference?: string; requestDate?: string;
  ticketBase64?: string; ticketFilename?: string;
  error?: string;
};

/* ═══ Country codes ════════════════════════════════════════════ */
const COUNTRY_CODES = [
  { code: "+251", country: "ET" },
  { code: "+1",   country: "US" },
  { code: "+44",  country: "GB" },
  { code: "+971", country: "AE" },
  { code: "+49",  country: "DE" },
  { code: "+33",  country: "FR" },
  { code: "+86",  country: "CN" },
  { code: "+91",  country: "IN" },
  { code: "+254", country: "KE" },
  { code: "+255", country: "TZ" },
  { code: "+256", country: "UG" },
  { code: "+20",  country: "EG" },
  { code: "+27",  country: "ZA" },
  { code: "+234", country: "NG" },
  { code: "+212", country: "MA" },
  { code: "+966", country: "SA" },
  { code: "+7",   country: "RU" },
  { code: "+81",  country: "JP" },
  { code: "+82",  country: "KR" },
  { code: "+61",  country: "AU" },
  { code: "+55",  country: "BR" },
  { code: "+52",  country: "MX" },
];

/* ═══ Field renderer ═══════════════════════════════════════════ */
function Field({
  field, value, countryCode, serviceSlug, onChange, onCheckboxChange, onCountryCodeChange, serviceSlug: slug, todayStr,
}: {
  field: BookingField; value: string; countryCode: string; serviceSlug: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (name: string, option: string, checked: boolean) => void;
  onCountryCodeChange: (code: string) => void;
  todayStr: string;
}) {
  const inputCls =
    "w-full rounded-xl border border-[#dde3e7] bg-[#FAF8F3] px-4 py-3 text-sm text-[#0b1220] " +
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
                    : "border-[#dde3e7] bg-[#FAF8F3] text-[#52606d] hover:border-[#073f67]/25 hover:bg-[#f5f8fb]"
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

  // Phone field: split into country-code selector + number-only input
  if (field.name === "phone") {
    return (
      <div>
        <label
          htmlFor={`${serviceSlug}-phone-number`}
          className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#6b7a84]"
        >
          {field.label}
          {field.required && <span className="ml-1 text-[#073f67]">*</span>}
        </label>
        <div className="flex gap-2">
          <select
            id={`${serviceSlug}-phone-code`}
            name="phoneCode"
            value={countryCode}
            onChange={(e) => onCountryCodeChange(e.target.value)}
            required={field.required}
            className="rounded-xl border border-[#dde3e7] bg-[#FAF8F3] px-2 py-3 text-sm text-[#0b1220] focus:outline-none focus:ring-2 focus:ring-[#073f67]/15 focus:border-[#073f67]/40 transition-all duration-200 shadow-sm font-[var(--font-montserrat)] flex-shrink-0 w-[110px]"
          >
            <option value="">Code*</option>
            {COUNTRY_CODES.map(({ code, country }) => (
              <option key={code} value={code}>{country} {code}</option>
            ))}
          </select>
          <input
            id={`${serviceSlug}-phone-number`}
            name="phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value}
            onChange={(e) => {
              // Only allow digits
              const digits = e.target.value.replace(/[^0-9]/g, "");
              onChange({ ...e, target: { ...e.target, name: "phone", value: digits } } as ChangeEvent<HTMLInputElement>);
            }}
            placeholder={field.placeholder || "Phone number"}
            required={field.required}
            className={`${inputCls} flex-1`}
          />
        </div>
      </div>
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
          onChange={(e) => {
            if (field.type === "number") {
              let digits = e.target.value.replace(/[^0-9]/g, "");
              // Enforce min="1" behavior when digits are entered
              if (digits === "0") digits = "1";
              onChange({ ...e, target: { ...e.target, name: field.name, value: digits } } as ChangeEvent<HTMLInputElement>);
            } else {
              onChange(e);
            }
          }}
          onKeyDown={(e) => {
            if (field.type === "number") {
              if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
              if (e.ctrlKey || e.metaKey) return; // allow copy/paste shortcuts
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }
          }}
          placeholder={field.placeholder}
          type={field.type === "number" ? "text" : field.type || "text"}
          inputMode={field.type === "number" ? "numeric" : undefined}
          pattern={field.type === "number" ? "[0-9]*" : undefined}
          required={field.required}
          min={field.type === "date" ? todayStr : undefined}
          className={inputCls}
        />
      )}
    </div>
  );
}

const CONTACT_FIELDS = ["name", "email", "phone", "company"];

export default function BookingForm({ serviceTitle, serviceSlug, profile }: BookingFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormValues>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(window.localStorage.getItem(`saba-booking-draft-${serviceSlug}`) || "{}");
    } catch { return {}; }
  });
  const [phoneCode, setPhoneCode] = useState<string>("+251");
  const [selectedService, setSelectedService] = useState(serviceSlug);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [step, setStep] = useState<"form" | "done">("form");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const uid = useId();

  // Autosave
  useEffect(() => {
    window.localStorage.setItem(`saba-booking-draft-${serviceSlug}`, JSON.stringify(form));
  }, [form, serviceSlug]);

  function handleServiceSwitch(newSlug: string) {
    if (newSlug !== serviceSlug) {
      router.push(`/booking/${newSlug}`);
    }
  }

  function handleGoBack() {
    router.back();
  }

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
        body: JSON.stringify({
          serviceSlug,
          serviceTitle,
          privacyConsent: privacyAccepted,
          form: { ...form, phone: `${phoneCode} ${form.phone || ""}`.trim() },
        }),
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
        <div className="mb-5 flex items-center gap-4 rounded-2xl border border-[#dde3e7] bg-[#FAF8F3] p-5 shadow-sm">
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
            { label: "Requested", value: result?.requestDate || new Date().toLocaleDateString() },
            { label: "Op. Date", value: form.date || form.shipmentDate || form.upliftDate || form.returnDate || "TBC" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-[#e8ecef] bg-[#FAF8F3] px-4 py-3.5">
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
          <Link
            href="/contact"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#dde3e7] bg-[#FAF8F3] px-6 py-4 text-sm font-semibold text-[#073f67] transition-all hover:bg-[#f0f5fa] hover:-translate-y-0.5"
          >
            <Phone size={15} /> Contact Operation Lead
          </Link>
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
            <div className="flex justify-between items-start gap-4 flex-wrap mb-4">
              <div>
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
              <div className="w-full sm:w-auto">
                <select
                  value={selectedService}
                  onChange={(e) => handleServiceSwitch(e.target.value)}
                  className="w-full sm:w-64 rounded-xl border border-[#dde3e7] bg-[#FAF8F3] px-4 py-3 text-sm text-[#0b1220] focus:outline-none focus:ring-2 focus:ring-[#073f67]/15 focus:border-[#073f67]/40 transition-all duration-200 shadow-sm font-[var(--font-montserrat)] cursor-pointer"
                >
                  <option disabled value="">Other Services...</option>
                  {services.map((srv) => (
                    <option key={srv.slug} value={srv.slug}>
                      {srv.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
                  countryCode={phoneCode}
                  serviceSlug={serviceSlug}
                  onChange={onChange}
                  onCheckboxChange={onCheckbox}
                  onCountryCodeChange={setPhoneCode}
                  todayStr={new Date().toISOString().split("T")[0]}
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
                    countryCode={phoneCode}
                    serviceSlug={serviceSlug}
                    onChange={onChange}
                    onCheckboxChange={onCheckbox}
                    onCountryCodeChange={setPhoneCode}
                    todayStr={new Date().toISOString().split("T")[0]}
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
              className="mt-5 w-full rounded-xl border border-[#dde3e7] bg-[#FAF8F3] px-4 py-3 text-sm text-[#0b1220] placeholder:text-[#b5c0c8] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#073f67]/15 focus:border-[#073f67]/40 resize-none transition-all duration-200 font-[var(--font-montserrat)]"
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

          {/* ── Privacy consent ── */}
          <div className="mb-5 rounded-xl border border-[#073f67]/20 bg-white/75 px-4 py-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#073f67]">
                Privacy consent
              </p>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#6b7a84]">
                Required
              </span>
            </div>
            <label
              htmlFor={`${serviceSlug}-privacy-consent`}
              className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#263746]"
            >
              <input
                id={`${serviceSlug}-privacy-consent`}
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                required
                className="mt-1 h-5 w-5 flex-shrink-0 accent-[#073f67]"
              />
              <span>
                I have read and agree to the{" "}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#073f67] underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

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
