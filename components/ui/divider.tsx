import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Divider({
  className,
  ...props
}: ComponentPropsWithoutRef<"hr">) {
  return <hr className={cn("border-gray-1", className)} {...props} />;
}
