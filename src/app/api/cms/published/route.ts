import { NextResponse } from "next/server";
import { getPublishedCmsData } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = getPublishedCmsData();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch published content", details: error?.message },
      { status: 500 }
    );
  }
}
