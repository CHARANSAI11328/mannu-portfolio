import { NextResponse } from "next/server";
import { saveAchievement, deleteAchievement } from "@/lib/cms/store";
import { achievementSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = achievementSchema.parse(body);
    const updated = saveAchievement(parsed);
    return NextResponse.json({ success: true, achievements: updated.achievements });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Validation failed", details: error?.errors || error?.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing achievement ID" }, { status: 400 });
    }
    const updated = deleteAchievement(id);
    return NextResponse.json({ success: true, achievements: updated.achievements });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete achievement", details: error?.message },
      { status: 500 }
    );
  }
}
