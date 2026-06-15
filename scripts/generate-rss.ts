import fs from "fs";
import path from "path";
import { Feed } from "feed";

import { getAllPosts } from "../lib/posts";
import { siteConfig } from "../lib/site-config";

function main() {
  const outDir = path.join(process.cwd(), "out");
  const posts = getAllPosts().filter((post) => !post.draft);

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.author.summary,
    id: siteConfig.siteUrl,
    link: siteConfig.siteUrl,
    language: "ko",
    favicon: `${siteConfig.siteUrl}/icon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author.name}`,
    updated: posts[0] ? new Date(posts[0].date) : new Date(),
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.siteUrl}${post.slug}`,
      link: `${siteConfig.siteUrl}${post.slug}`,
      description: post.description || post.excerpt,
      date: new Date(post.date),
      category: [{ name: post.category }],
    });
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "rss.xml"), feed.rss2());
  console.log(`RSS feed written to ${path.join(outDir, "rss.xml")}`);
}

main();
