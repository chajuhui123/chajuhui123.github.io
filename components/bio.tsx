import Image from "next/image";

import { siteConfig } from "@/lib/site-config";

export function Bio() {
  const { author } = siteConfig;

  return (
    <div className="relative mb-10 flex md:mb-20">
      <div
        aria-hidden
        className="absolute z-[2] ml-[51px] mt-[3px] h-5 w-5 -rotate-45 animate-pulse bg-[#ff68b4] before:absolute before:-top-2.5 before:left-0 before:h-5 before:w-5 before:rounded-full before:bg-[#ff68b4] after:absolute after:left-2.5 after:top-0 after:h-5 after:w-5 after:rounded-full after:bg-[#ff68b4]"
      />
      <Image
        src="/profile-pic.png"
        alt="Profile picture"
        width={70}
        height={70}
        className="mr-4 min-h-[70px] min-w-[70px] rounded-full"
      />
      {author.name && (
        <p className="mt-3">
          <strong>{author.name}</strong>
          <br />
          <span className="text-text-light">{author.summary}</span>
        </p>
      )}
    </div>
  );
}
