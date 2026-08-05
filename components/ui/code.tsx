import { type ComponentPropsWithoutRef } from "react";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/cn";

export function InlineCode({
  className,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className={cn(
        "rounded bg-code-bg px-1.5 py-0.5 font-mono text-[0.875em] text-code-text",
        className,
      )}
      {...props}
    />
  );
}

type CodeBlockProps = {
  code: string;
  lang?: string;
  className?: string;
};

export async function CodeBlock({
  code,
  lang = "text",
  className,
}: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: "github-dark",
  });

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-gray-800 bg-black",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
        <span className="font-mono text-xs text-gray-400">{lang}</span>
      </div>
      <div
        className="shiki-wrapper overflow-x-auto py-4 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
