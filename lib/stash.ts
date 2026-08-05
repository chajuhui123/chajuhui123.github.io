import fs from "fs";
import path from "path";
import matter from "gray-matter";

const STASH_DIR = path.join(process.cwd(), "content/stash");

export type StashFrontmatter = {
  title: string;
  date: string;
  tags: string[];
  description?: string;
  image?: string;
};

export type StashSummary = StashFrontmatter & { slug: string };

export type Stash = {
  slug: string;
  frontmatter: StashFrontmatter;
  content: string;
};

function normalizeFrontmatter(data: Record<string, unknown>): StashFrontmatter {
  return {
    ...data,
    // gray-matter's YAML parser turns unquoted dates (e.g. 2026-07-30) into
    // Date objects, so normalize back to a plain string for rendering.
    date:
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date),
  } as StashFrontmatter;
}

function getSlugs(): string[] {
  return fs
    .readdirSync(STASH_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllSlugs(): string[] {
  return getSlugs();
}

export function getAllStashes(): StashSummary[] {
  return getSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(STASH_DIR, `${slug}.mdx`), "utf-8");
      const { data } = matter(raw);
      return { slug, ...normalizeFrontmatter(data) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getStashBySlug(slug: string): Stash {
  const raw = fs.readFileSync(path.join(STASH_DIR, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: normalizeFrontmatter(data), content };
}
