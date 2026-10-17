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
