import { NextResponse } from "next/server";
import { publishAllChanges } from "@/lib/cms/store";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const author = body.author || "Shaik Mansoor";
    const result = publishAllChanges(author);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to publish content", details: error?.message },
      { status: 500 }
    );
  }
}
