import { serveStats } from "@/domain/serveStats";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const url = headersList.get("referer") || "";
  const path = new URL(url).pathname;
  return NextResponse.json(await serveStats(path.split("/")[1]), { status: 200 });
}
