import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getStashBySlug } from "@/lib/stash";
import { Heading, Text } from "@/components/ui/typography";
import { Image } from "@/components/ui/image";
import { Chip } from "@/components/ui/chip";
import { mdxComponents } from "@/components/mdx/mdx-components";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  if (!getAllSlugs().includes(decodedSlug)) return {};
  const { frontmatter } = getStashBySlug(decodedSlug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export default async function StashDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  if (!getAllSlugs().includes(decodedSlug)) notFound();

  const { frontmatter, content } = getStashBySlug(decodedSlug);

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
            className="max-h-[300px] w-full rounded-none object-cover border-none sm:rounded-md"
            quality={85}
            src={frontmatter.image}
            alt={frontmatter.title}
            width={800}
            height={300}
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
