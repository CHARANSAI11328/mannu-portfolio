import { NextResponse } from "next/server";
import { updateContactSettings } from "@/lib/cms/store";
import { contactSettingsSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSettingsSchema.parse(body);
    const updated = updateContactSettings(parsed);
    return NextResponse.json({ success: true, contact: updated.contact });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Validation failed", details: error?.errors || error?.message },
      { status: 400 }
    );
  }
}
