import { serveStats } from "@/domain/serveStats";
import { DEFAULT_TITLE, REGIONS, TITLES, Title } from "@/domain/constants";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || DEFAULT_TITLE) as Title;

  if (!TITLES.includes(title)) {
    return NextResponse.json({ error: "Invalid title" }, { status: 400 });
  }

  if (!REGIONS.includes(region)) {
    return NextResponse.json({ error: "Invalid region" }, { status: 400 });
  }

  return NextResponse.json(await serveStats(region, title), { status: 200 });
}
