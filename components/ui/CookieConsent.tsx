"use client";

import { useEffect, useState } from "react";

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

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-xl border border-white/10 bg-[#0b0b0b]/90 p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-gray-300">
            We use cookies to improve your experience.
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => savePreferences({ necessary: true, analytics: false, marketing: false })}
              className="rounded-full border border-white/15 bg-transparent px-3.5 py-2 text-sm font-medium text-gray-200 transition hover:border-white/30 hover:text-white"
            >
              Decline
            </button>

            <button
              type="button"
              onClick={() => savePreferences({ necessary: true, analytics: true, marketing: true })}
              className="rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
