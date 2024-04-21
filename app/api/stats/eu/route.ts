import { serveStats } from "@/domain/serveStats";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await serveStats("eu"), { status: 200 });
}
