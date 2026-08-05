import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { cn } from "@/lib/cn";

type ListProps = ComponentPropsWithoutRef<"ul"> & {
  as?: "ul" | "ol";
};

export function List({ as = "ul", className, ...props }: ListProps) {
  const Tag = as as ElementType;
  return (
    <Tag
      className={cn(
        "flex flex-col gap-2 pl-5 text-sm text-text marker:text-gray-2",
        as === "ul" ? "list-disc" : "list-decimal",
        className,
      )}
      {...props}
    />
  );
}

export function ListItem({
  className,
  ...props
}: ComponentPropsWithoutRef<"li">) {
  return <li className={cn("pl-1 leading-relaxed", className)} {...props} />;
}
