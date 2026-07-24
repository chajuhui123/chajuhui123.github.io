"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrolled } from "@/lib/use-scrolled";
import { cn } from "@/lib/cn";
import { Text } from "@/components/ui/typography";

export function Header() {
  const scrolled = useScrolled(8);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center bg-transparent px-6">
      <div
        className={cn(
          "flex w-full items-center justify-between transition-all duration-300 ease-out",
          scrolled
            ? "mt-3 max-w-xl gap-8 rounded-full border border-border/60 bg-background/70 px-6 py-2.5 shadow-sm backdrop-blur-md"
            : "max-w-3xl gap-8 rounded-none border border-transparent bg-transparent px-0 py-4 shadow-none",
        )}
      >
        <Link
          href="/"
          className="font-display text-lg font-semibold text-foreground"
        >
          <Image src="/logo.svg" alt="joylog" width={30} height={30} />
        </Link>

        <div className="flex items-center gap-2 font-display text-sm font-light text-foreground">
          <Link href="/design-system">
            <Text variant="small">POST</Text>
          </Link>
        </div>
      </div>
    </header>
  );
}
