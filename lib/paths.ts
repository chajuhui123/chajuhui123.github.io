import fs from "fs";
import path from "path";

function resolveRepoRoot(): string {
  const cwd = process.cwd();

  if (fs.existsSync(path.join(cwd, "content/blog"))) {
    return cwd;
  }

  const parent = path.join(cwd, "..");
  if (fs.existsSync(path.join(parent, "content/blog"))) {
    return parent;
  }

  return cwd;
}

export function getContentDir(): string {
  return path.join(resolveRepoRoot(), "content/blog");
}

export function getPublicDir(): string {
  return path.join(process.cwd(), "public");
}

export function getRepoRoot(): string {
  return resolveRepoRoot();
}
