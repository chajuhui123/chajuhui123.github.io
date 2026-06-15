export type PostFrontmatter = {
  title: string;
  date: string;
  category: string;
  description?: string;
  draft?: boolean;
  archived?: boolean;
};

export type Post = {
  slug: string;
  slugSegments: string[];
  title: string;
  date: string;
  category: string;
  description?: string;
  draft: boolean;
  archived: boolean;
  content: string;
  excerpt: string;
};

export type AdjacentPosts = {
  previous: Post | null;
  next: Post | null;
};
