import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Blockquote({
  className,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "border-l-3 border-accent-2 pl-4 text-base italic text-gray-2",
        className,
      )}
      {...props}
    />
  );
}
