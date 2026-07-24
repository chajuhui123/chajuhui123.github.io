import { readFileSync } from "node:fs";

const [, , msgFile] = process.argv;
const message = readFileSync(msgFile, "utf8").split("\n")[0].trim();

const isMergeOrRevert = /^(Merge|Revert)\b/.test(message);
const startsWithEmoji = /^\p{Extended_Pictographic}(️)?/u.test(message);
const startsWithShortcode = /^:\w+:/.test(message);

if (isMergeOrRevert || startsWithEmoji || startsWithShortcode) {
  process.exit(0);
}

console.error(
  [
    "\n❌  커밋 메시지가 gitmoji로 시작하지 않습니다.",
    `   현재: "${message}"`,
    "   예시: ✨ Add login page",
    "   `pnpm commit` 명령으로 gitmoji를 골라 커밋해보세요.\n",
  ].join("\n")
);
process.exit(1);
