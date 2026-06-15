import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Bio } from "@/components/bio";
import { PostNavigation } from "@/components/post-navigation";
import { SiteLayout } from "@/components/site-layout";
import { Tag } from "@/components/tag";
import { markdownToHtml } from "@/lib/markdown";
import { getAdjacentPosts, getPostBySlug, getStaticPostParams } from "@/lib/posts";
import { formatKoreanDate } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return getStaticPostParams().map((post) => ({
    slug: post.slugSegments,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: post.title,
    description: post.description || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const html = await markdownToHtml(post.content);
  const { previous, next } = getAdjacentPosts(slug);

  return (
    <SiteLayout>
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 className="mb-4 mt-0 text-[2.074rem] text-pink" itemProp="headline">
            {post.title}
          </h1>
          <div className="blog-post-header-description flex">
            <p className="mb-6 mr-4 font-heading text-text-light">{formatKoreanDate(post.date)}</p>
            <Tag category={post.category} />
          </div>
        </header>
        <hr className="mb-20 mt-0 h-px border-0 bg-accent" />
        <section
          className="prose prose-neutral max-w-none prose-headings:font-heading prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: html }}
          itemProp="articleBody"
        />
        <footer className="text-left">
          <hr className="mb-20 mt-0 h-px border-0 bg-accent" />
          <Bio />
        </footer>
      </article>
      <PostNavigation previous={previous} next={next} />
    </SiteLayout>
  );
}
