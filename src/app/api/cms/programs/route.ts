import { NextResponse } from "next/server";
import { saveProgram, deleteProgram } from "@/lib/cms/store";
import { programSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = programSchema.parse(body);
    const updated = saveProgram(parsed);
    return NextResponse.json({ success: true, programs: updated.programs });
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
      return NextResponse.json({ error: "Missing program ID" }, { status: 400 });
    }
    const updated = deleteProgram(id);
    return NextResponse.json({ success: true, programs: updated.programs });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete program", details: error?.message },
      { status: 500 }
    );
  }
}
