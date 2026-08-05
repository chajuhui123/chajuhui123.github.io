import { type ElementType, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const headingStyles = {
  1: "text-3xl font-bold tracking-tight",
  2: "text-2xl font-semibold tracking-tight",
  3: "text-xl font-semibold",
  4: "text-lg font-semibold",
} as const;

type HeadingLevel = keyof typeof headingStyles;

type HeadingProps = ComponentPropsWithoutRef<"h1"> & {
  level?: HeadingLevel;
};

export function Heading({ level = 1, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag
      className={cn("text-text", headingStyles[level], className)}
      {...props}
    />
  );
}

const textStyles = {
  lead: "text-base leading-[1.9] text-text",
  body: "text-sm leading-[1.9] text-text",
  small: "text-xs leading-[1.8] text-text",
  caption: "text-xs leading-[1.6] text-gray-2",
  tiny: "text-xxs leading-[1.6] text-gray-2",
} as const;

type TextVariant = keyof typeof textStyles;

type TextProps = ComponentPropsWithoutRef<"p"> & {
  variant?: TextVariant;
  as?: ElementType;
};

export function Text({
  variant = "body",
  as: Tag = "p",
  className,
  ...props
}: TextProps) {
  return <Tag className={cn(textStyles[variant], className)} {...props} />;
}
