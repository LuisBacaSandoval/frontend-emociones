import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

export async function POST(req: Request) {
  const { data } = await req.json();

  const buffer = Buffer.from(data);
  const tempPath = join(tmpdir(), "X.npy");
  await writeFile(tempPath, buffer);

  const res = new NextResponse(buffer);
  res.headers.set("Content-Type", "application/octet-stream");
  res.headers.set("Content-Disposition", "attachment; filename=X.npy");

  return res;
}
