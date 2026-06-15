type TagProps = {
  category: string;
};

export function Tag({ category }: TagProps) {
  return (
    <div className="inline-block h-7 w-fit rounded-[13px] border border-[#ecf0f2] bg-accent px-2 text-xs leading-7 text-primary [font-family:var(--font-family-heading)]">
      #{category}
    </div>
  );
}
