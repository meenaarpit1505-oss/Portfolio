import fs from "fs";
import path from "path";

export function fileExistsInPublic(relativePath: string): boolean {
  try {
    if (typeof relativePath !== "string" || relativePath.includes("..")) {
      return false;
    }
    const publicDir = path.resolve(process.cwd(), "public");
    const cleanPath = path.normalize(relativePath).replace(/^[/\\]+/, "");
    const resolvedPath = path.resolve(publicDir, cleanPath);
    if (!resolvedPath.startsWith(publicDir + path.sep) && resolvedPath !== publicDir) {
      return false;
    }
    return fs.existsSync(resolvedPath);
  } catch {
    return false;
  }
}

export function isPlaceholderPublicImage(relativePath?: string): boolean {
  if (typeof relativePath !== "string") return true;
  const src = relativePath.trim().toLowerCase();
  if (!src) return true;
  return src.includes("placeholder") || src.includes("/_shared/") || src.endsWith(".svg");
}

export function isRenderableProjectImage(relativePath?: string): boolean {
  if (typeof relativePath !== "string" || !relativePath.trim()) return false;
  if (isPlaceholderPublicImage(relativePath)) return false;
  return fileExistsInPublic(relativePath.trim());
}
