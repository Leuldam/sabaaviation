"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "saba_cookie_consent";
const ANALYTICS_PROVIDER = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "plausible") as
  | "plausible"
  | "google-analytics";
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (...args: unknown[]) => void;
  }
}

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: number;
};

export function getStoredCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      timestamp: parsed.timestamp ?? Date.now(),
      version: parsed.version ?? 1,
    };
  } catch {
    return null;
  }
}

export function setCookiePreferences(preferences: Partial<CookiePreferences>) {
  if (typeof window === "undefined") return;

  const nextPreferences: CookiePreferences = {
    necessary: true,
    analytics: Boolean(preferences.analytics),
    marketing: Boolean(preferences.marketing),
    timestamp: Date.now(),
    version: 1,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences));
  document.cookie = `${STORAGE_KEY}=${encodeURIComponent(JSON.stringify(nextPreferences))}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

  return nextPreferences;
}

export function hasAnalyticsConsent() {
  const prefs = getStoredCookiePreferences();
  return Boolean(prefs?.analytics);
}

function disableAnalytics() {
  if (typeof window === "undefined") return;

  if (ANALYTICS_PROVIDER === "plausible") {
    const script = document.querySelector('script[data-domain]');
    if (script) {
      script.remove();
    }
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
    });
  }
}

function loadAnalytics() {
  if (typeof window === "undefined") return;

  if (ANALYTICS_PROVIDER === "plausible") {
    if (!PLAUSIBLE_DOMAIN) {
      console.warn("Plausible domain is not configured. Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN to enable analytics.");
      return;
    }

    if (document.querySelector('script[data-domain="' + PLAUSIBLE_DOMAIN + '"]')) {
      return;
    }

    const script = document.createElement("script");
    script.defer = true;
    script.async = true;
    script.src = "https://plausible.io/js/script.js";
    script.setAttribute("data-domain", PLAUSIBLE_DOMAIN);
    document.head.appendChild(script);
    return;
  }

  if (!GA_MEASUREMENT_ID) {
    console.warn("Google Analytics measurement ID is not configured. Set NEXT_PUBLIC_GA_MEASUREMENT_ID to enable analytics.");
    return;
  }

  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  if (typeof window.gtag !== "function") {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }

  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);
  }

  window.gtag!("consent", "default", {
    ad_storage: "granted",
    analytics_storage: "granted",
  });
  window.gtag!("js", new Date());
  window.gtag!("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    cookie_flags: "SameSite=None;Secure",
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredCookiePreferences();

    if (stored?.analytics) {
      loadAnalytics();
      return;
    }

    if (!stored) {
      setVisible(true);
    }
  }, []);

  const savePreferences = (preferences: Partial<CookiePreferences>) => {
    const saved = setCookiePreferences(preferences);

    if (saved?.analytics) {
      loadAnalytics();
    } else {
      disableAnalytics();
    }

    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 260, delay: 0.4 }}
          className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 sm:justify-end sm:px-5 sm:pb-5 pointer-events-none"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="pointer-events-auto w-full max-w-[300px] rounded-xl border border-gray-200 bg-white/95 backdrop-blur-sm p-3.5 shadow-lg shadow-black/5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 flex-shrink-0">
                <svg width="12.5" height="12.5" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                  <path d="M8.5 8.5v.01"></path>
                  <path d="M16 12.5v.01"></path>
                  <path d="M12 16v.01"></path>
                  <path d="M11 11.5v.01"></path>
                </svg>
              </div>

              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => savePreferences({ necessary: true, analytics: false, marketing: false })}
                className="text-gray-300 hover:text-gray-500 transition-colors -mt-0.5 -mr-0.5 p-1"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="mt-2">
              <h3 className="text-[13px] font-semibold text-gray-900 tracking-tight leading-none">
                We use cookies
              </h3>
              <p className="mt-1.5 text-[11.5px] leading-snug text-gray-500">
                To improve your experience and understand site traffic.{" "}
                <a
                  href="/privacy-policy"
                  className="text-gray-700 underline underline-offset-2 hover:text-gray-900 transition-colors"
                >
                  Learn more
                </a>
              </p>
            </div>

            <div className="mt-3 flex gap-1.5">
              <button
                type="button"
                onClick={() => savePreferences({ necessary: true, analytics: false, marketing: false })}
                className="w-full rounded-lg border border-gray-200 py-2 text-[11.5px] font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => savePreferences({ necessary: true, analytics: true, marketing: true })}
                className="w-full rounded-lg bg-gray-900 py-2 text-[11.5px] font-medium text-white transition-colors hover:bg-black"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}