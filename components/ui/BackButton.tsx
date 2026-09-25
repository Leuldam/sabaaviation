"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export default function BackButton({ children, className, iconSize = 11 }: { children: ReactNode; className?: string; iconSize?: number }) {
  const router = useRouter();
  
  return (
    <button onClick={() => router.back()} className={className}>
      <ArrowLeft size={iconSize} /> {children}
    </button>
  );
}
