import {
  getAllCategories,
  getAllPosts,
  getArchivedPosts,
  getPublishedPosts,
  getStaticPostParams,
} from "../lib/posts";
import { getContentDir } from "../lib/paths";

function main() {
  const contentDir = getContentDir();
  const allPosts = getAllPosts();
  const publishedPosts = getPublishedPosts();
  const archivedPosts = getArchivedPosts();
  const staticPosts = getStaticPostParams();
  const categories = getAllCategories();

  console.log("Phase 1 posts verification");
  console.log("==========================");
  console.log(`Content dir: ${contentDir}`);
  console.log(`Total posts: ${allPosts.length}`);
  console.log(`Published (home): ${publishedPosts.length}`);
  console.log(`Archived: ${archivedPosts.length}`);
  console.log(`Static generation (non-draft): ${staticPosts.length}`);
  console.log(`Categories: ${categories.join(", ")}`);
  console.log("");

  const draftPosts = allPosts.filter((post) => post.draft);
  if (draftPosts.length > 0) {
    console.log(`Draft posts (${draftPosts.length}):`);
    draftPosts.forEach((post) => console.log(`  - ${post.slug}`));
    console.log("");
  }

  console.log("Sample slugs:");
  publishedPosts.slice(0, 5).forEach((post) => {
    console.log(`  ${post.slug}  [${post.category}]  ${post.title}`);
  });

  const slugSet = new Set(allPosts.map((post) => post.slug));
  if (slugSet.size !== allPosts.length) {
    console.error("\nERROR: Duplicate slugs detected.");
    process.exit(1);
  }

  if (allPosts.length === 0) {
    console.error("\nERROR: No posts found. Check content directory path.");
    process.exit(1);
  }

  console.log("\nOK: posts layer is ready.");
}

main();
