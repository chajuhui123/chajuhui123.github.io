"use client";

import { cn } from "@/lib/cn";

export function PageBackdrop() {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 transition-colors duration-300 bg-background",
      )}
    />
  );
}
