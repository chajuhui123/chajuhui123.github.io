import { type ElementType, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const headingStyles = {
  1: "text-4xl font-bold tracking-tight",
  2: "text-3xl font-semibold tracking-tight",
  3: "text-2xl font-semibold",
  4: "text-xl font-semibold",
} as const;

type HeadingLevel = keyof typeof headingStyles;

type HeadingProps = ComponentPropsWithoutRef<"h1"> & {
  level?: HeadingLevel;
};

export function Heading({ level = 1, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag
      className={cn("text-foreground", headingStyles[level], className)}
      {...props}
    />
  );
}

const textStyles = {
  lead: "text-lg text-foreground",
  body: "text-base text-foreground",
  small: "text-sm text-foreground",
  caption: "text-sm text-muted-foreground",
  tiny: "text-xs text-muted-foreground",
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
