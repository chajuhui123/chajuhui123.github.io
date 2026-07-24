import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-transparent mt-20">
      <div className="flex flex-col items-center gap-4 px-12 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 text-xxs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <span aria-hidden className="h-3 w-[1px] bg-muted-foreground" />
          <span className="copyright-text overflow-hidden whitespace-nowrap">
            © {new Date().getFullYear()} Juhee Cha
          </span>
          <span aria-hidden className="h-3 w-[1px] bg-muted-foreground" />
        </div>

        <Link
          href="https://github.com/chajuhui123"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          GitHub
          <span aria-hidden>↗</span>
        </Link>
      </div>
    </footer>
  );
}
