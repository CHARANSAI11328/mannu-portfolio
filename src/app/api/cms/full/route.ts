import { NextResponse } from "next/server";
import { getFullCmsData } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = getFullCmsData();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch full CMS data", details: error?.message },
      { status: 500 }
    );
  }
}
