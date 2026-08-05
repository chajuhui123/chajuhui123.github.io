import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { Heading, Text } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";
import { List, ListItem } from "@/components/ui/list";
import { Blockquote } from "@/components/ui/blockquote";
import { Divider } from "@/components/ui/divider";
import { Image } from "@/components/ui/image";
import { Chip } from "@/components/ui/chip";
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
import { type ComponentPropsWithoutRef, type ReactElement } from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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

const mdxComponents = {
  h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <Heading
      level={1}
      className={cn("mt-12 first:mt-0", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <Heading
      level={2}
      className={cn("mt-12 first:mt-0", className)}
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

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) return {};
  const { frontmatter } = getPostBySlug(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) notFound();

  const { frontmatter, content } = getPostBySlug(slug);

  return (
    <article className="relative mx-auto flex w-full max-w-[50rem] flex-col gap-14 rounded-xl bg-surface pb-20 pt-10">
      <header className="flex flex-col gap-2 px-6 text-center">
        <Heading className="font-bold" level={4}>
          {frontmatter.title}
        </Heading>
        <Text variant="caption" className="text-gray-4">
          {frontmatter.date}
        </Text>
        <Text variant="caption">{frontmatter.description}</Text>
        {frontmatter.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {frontmatter.tags.map((tag) => (
              <Chip
                key={tag}
                className="cursor-default hover:bg-transparent hover:text-text"
              >
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </header>

      {/* 이미지 넣는 영역 */}
      {frontmatter.image && (
        <div className="mb-12">
          <Image
            className="max-h-[300px] w-full rounded-md object-cover border-none"
            src={frontmatter.image}
            alt={frontmatter.title}
            width={1000}
            height={1000}
          />
        </div>
      )}

      <div className="flex flex-col gap-12 px-12">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
