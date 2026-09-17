"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import ServiceRequestForm from "@/components/ui/ServiceRequestForm";

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  serviceSlug: string;
}

export default function ServiceRequestModal({
  isOpen,
  onClose,
  serviceTitle,
  serviceSlug,
}: ServiceRequestModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-3">
      <div className="relative w-full max-w-md rounded-[20px] bg-[#F7F7F7] p-2.5 shadow-2xl sm:p-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close request form"
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white text-midnight transition hover:bg-gray-100"
        >
          <X size={14} />
        </button>

        <div className="pt-6">
          <ServiceRequestForm serviceTitle={serviceTitle} serviceSlug={serviceSlug} />
        </div>
      </div>
    </div>
  );
}
