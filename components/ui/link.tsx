import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Link({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "inline-flex items-baseline gap-0.5 font-bold text-text transition-colors duration-200 hover:text-accent",
        className,
      )}
      {...props}
    >
      {children}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-3 w-3 shrink-0 -translate-y-1"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17L17 7M17 7H8M17 7V16" />
      </svg>
    </a>
  );
}
