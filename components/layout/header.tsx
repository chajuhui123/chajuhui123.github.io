"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useScrolled } from "@/lib/use-scrolled";
import { cn } from "@/lib/cn";
import { Text } from "@/components/ui/typography";

export function Header() {
  const scrolled = useScrolled(8);
  const pathname = usePathname();
  const isPostActive = pathname === "/" || pathname.startsWith("/post/");
  const isStashActive = pathname === "/stash" || pathname.startsWith("/stash/");

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center bg-transparent px-6">
      <div
        className={cn(
          "flex w-full items-center justify-between transition-all duration-300 ease-out",
          scrolled
            ? "mt-3 max-w-lg gap-8 rounded-full border border-gray-1/60 bg-white/70 px-6 py-1.5 shadow-md backdrop-blur-xs"
            : "max-w-4xl gap-8 rounded-none border border-transparent bg-transparent px-0 py-4 shadow-none",
        )}
      >
        <Link href="/" className="font-display text-lg font-semibold text-text">
          <Image src="/logo.svg" alt="joylog" width={30} height={30} />
        </Link>

        <div className="flex items-center gap-4 font-display text-sm font-light text-text">
          <Link href="/">
            <Text
              variant="caption"
              className={cn(
                "underline-offset-6 decoration-accent decoration-2 transition-colors hover:text-text",
                isPostActive && "text-text",
              )}
            >
              POST
            </Text>
          </Link>
          <Link href="/stash">
            <Text
              variant="caption"
              className={cn(
                "underline-offset-6 decoration-accent decoration-2 transition-colors hover:text-text",
                isStashActive && "text-text",
              )}
            >
              STASH
            </Text>
          </Link>
        </div>
      </div>
    </header>
  );
}
