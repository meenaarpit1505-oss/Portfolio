import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const modelsDir = path.join(process.cwd(), "public", "models");
    const hasAvatar = fs.existsSync(path.join(modelsDir, "avatar.glb"));
    const hasDesk = fs.existsSync(path.join(modelsDir, "desk.glb"));

    return NextResponse.json({
      avatar: hasAvatar ? "/models/avatar.glb" : null,
      desk: hasDesk ? "/models/desk.glb" : null,
    });
  } catch {
    return NextResponse.json({
      avatar: null,
      desk: null,
    });
  }
}
