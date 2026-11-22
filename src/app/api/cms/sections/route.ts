import { NextResponse } from "next/server";
import { updateSectionSettings } from "@/lib/cms/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected array of sections" }, { status: 400 });
    }
    const updated = updateSectionSettings(body);
    return NextResponse.json({ success: true, sections: updated.sections });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update sections", details: error?.message },
      { status: 500 }
    );
  }
}
