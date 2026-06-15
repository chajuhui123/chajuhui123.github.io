import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: ({ children, ...props }) => (
      <pre
        className="mb-8 overflow-x-auto rounded-lg text-sm [font-size:0.833rem]"
        {...props}
      >
        {children}
      </pre>
    ),
    code: ({ children, ...props }) => (
      <code className="language-text rounded bg-accent px-1 py-0.5 text-text-light" {...props}>
        {children}
      </code>
    ),
    ...components,
  };
}
