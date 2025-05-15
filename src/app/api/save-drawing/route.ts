import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const categoryMap: Record<number, string> = {
  0: "alegria",
  1: "tristeza",
  2: "enojo",
};

export async function POST(req: NextRequest) {
  const { image, category } = await req.json();

  if (!image || typeof category !== "number") {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const matches = image.match(/^data:image\/png;base64,(.+)$/);
  if (!matches) {
    return NextResponse.json(
      { error: "Formato de imagen inválido" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(matches[1], "base64");
  const dir = path.join(
    process.cwd(),
    "public",
    categoryMap[category] || "otros"
  );
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filename = `drawing_${Date.now()}.png`;
  const filepath = path.join(dir, filename);

  fs.writeFileSync(filepath, buffer);

  return NextResponse.json({ message: "Imagen guardada", filename });
}
