"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/chip";

const FILTERS = ["FE", "BE", "iOS", "Android", "Design", "Product", "ETC"];

export function ChipDemo() {
  const [active, setActive] = useState<string[]>(["일상"]);

  function toggle(filter: string) {
    setActive((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERS.map((filter) => (
        <Chip
          key={filter}
          selected={active.includes(filter)}
          onClick={() => toggle(filter)}
        >
          {filter}
        </Chip>
      ))}
    </div>
  );
}
