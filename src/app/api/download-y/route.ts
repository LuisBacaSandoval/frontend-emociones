import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

export async function POST(req: Request) {
  const { label } = await req.json();

  const buffer = Buffer.from(new Uint8Array([label])); // simple etiqueta
  const tempPath = join(tmpdir(), "y.npy");
  await writeFile(tempPath, buffer);

  const res = new NextResponse(buffer);
  res.headers.set("Content-Type", "application/octet-stream");
  res.headers.set("Content-Disposition", "attachment; filename=y.npy");

  return res;
}
