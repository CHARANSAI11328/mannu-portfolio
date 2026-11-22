import { NextResponse } from "next/server";
import { updateHeroData } from "@/lib/cms/store";
import { heroSectionSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = heroSectionSchema.partial().parse(body);
    const updated = updateHeroData(parsed);
    return NextResponse.json({ success: true, hero: updated.hero });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Validation failed or update error", details: error?.errors || error?.message },
      { status: 400 }
    );
  }
}
