import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-1 bg-transparent mt-20">
      <div className="flex flex-col items-center gap-4 px-12 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 text-xxs font-medium uppercase tracking-[0.2em] text-gray-2">
          {/* <span aria-hidden className="h-3 w-[1px] bg-gray-2" /> */}
          <span className="overflow-hidden whitespace-nowrap">
            © {new Date().getFullYear()} Juhee Cha
          </span>
          {/* <span aria-hidden className="h-3 w-[1px] bg-gray-2" /> */}
        </div>

        <div className="flex items-center gap-4">
          <Link
            className="group inline-flex items-center gap-1 text-xs text-gray-2 underline-offset-6 decoration-accent transition-colors hover:text-text hover:underline"
            href="https://www.joyfolio.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Joyfolio ↗
          </Link>

          <Link
            className="group inline-flex items-center gap-1 text-xs text-gray-2 underline-offset-6 decoration-accent transition-colors hover:text-text hover:underline"
            href="https://github.com/chajuhui123"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
