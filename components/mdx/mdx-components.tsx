import { type ComponentPropsWithoutRef, type ReactElement } from "react";
import { Heading, Text } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";
import { List, ListItem } from "@/components/ui/list";
import { Blockquote } from "@/components/ui/blockquote";
import { Divider } from "@/components/ui/divider";
import { InlineCode, CodeBlock } from "@/components/ui/code";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/cn";

function Pre({
  children,
}: {
  children: ReactElement<{ className?: string; children: string }>;
}) {
  const lang =
    (children.props.className ?? "").replace("language-", "") || "text";
  return <CodeBlock code={children.props.children} lang={lang} />;
}

function MdxImage({
  className,
  alt,
  ...props
}: ComponentPropsWithoutRef<"img">) {
  return (
    // next/image requires known width/height, but markdown images only ever
    // give us src/alt, so fall back to a plain <img> for content images.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={cn("w-full rounded-md border border-gray-1", className)}
      {...props}
    />
  );
}

export const mdxComponents = {
  h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <Heading
      level={1}
      className={cn("mt-8 first:mt-0", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <Heading
      level={2}
      className={cn("mt-5 first:mt-0", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <Heading
      level={3}
      className={cn("mt-5 first:mt-0", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ComponentPropsWithoutRef<"h4">) => (
    <Heading
      level={4}
      className={cn("mt-5 first:mt-0", className)}
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <Text variant="body" {...props} />
  ),
  a: Link,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <List as="ul" {...props} />,
  ol: (props: ComponentPropsWithoutRef<"ol">) => <List as="ol" {...props} />,
  li: ListItem,
  blockquote: Blockquote,
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <Divider className={cn("my-6", className)} {...props} />
  ),
  img: MdxImage,
  code: InlineCode,
  pre: Pre,
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <Table className={cn("", className)} {...props} />
  ),
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
};
