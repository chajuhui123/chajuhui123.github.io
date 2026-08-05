import NextImage, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

export function Image({ className, alt, ...props }: ImageProps) {
  return (
    <NextImage
      alt={alt}
      className={cn("rounded-md border border-gray-1", className)}
      {...props}
    />
  );
}
