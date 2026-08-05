import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  date: string;
  tags: string[];
  description?: string;
  image?: string;
};

export type PostSummary = PostFrontmatter & { slug: string };

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

function normalizeFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  return {
    ...data,
    // gray-matter's YAML parser turns unquoted dates (e.g. 2026-07-30) into
    // Date objects, so normalize back to a plain string for rendering.
    date:
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date),
  } as PostFrontmatter;
}

function getSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllSlugs(): string[] {
  return getSlugs();
}

export function getAllPosts(): PostSummary[] {
  return getSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf-8");
      const { data } = matter(raw);
      return { slug, ...normalizeFrontmatter(data) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: normalizeFrontmatter(data), content };
}
