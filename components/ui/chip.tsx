import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type ChipProps = ComponentPropsWithoutRef<"button"> & {
  selected?: boolean;
};

export function Chip({
  selected = false,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs leading-none transition-colors duration-300",
        selected
          ? "border-text bg-text text-white"
          : "border-text text-text hover:bg-text hover:text-white",
        className,
      )}
      {...props}
    >
      {children}
      {selected && (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      )}
    </button>
  );
}
