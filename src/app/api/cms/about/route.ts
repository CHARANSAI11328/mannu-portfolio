import { NextResponse } from "next/server";
import { updateAboutData } from "@/lib/cms/store";
import { aboutSectionSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = aboutSectionSchema.partial().parse(body);
    const updated = updateAboutData(parsed);
    return NextResponse.json({ success: true, about: updated.about });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Validation failed", details: error?.errors || error?.message },
      { status: 400 }
    );
  }
}
