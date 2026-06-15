import { remark } from "remark";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";

function rewriteAssetPaths(html: string): string {
  return html
    .replace(/src="\.\.\/\.\.\/\.\.\/src\/images\//g, 'src="/images/')
    .replace(/src="\.\.\/\.\.\/src\/images\//g, 'src="/images/')
    .replace(/src="\.\.\/src\/images\//g, 'src="/images/');
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: true,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return rewriteAssetPaths(result.toString());
}
