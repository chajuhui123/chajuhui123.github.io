import { getAllStashes } from "@/lib/stash";
import { StashList } from "./stash-list";

export default function Stash() {
  const stashes = getAllStashes();

  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col px-6 pb-20 pt-10">
      <StashList stashes={stashes} />
    </div>
  );
}
