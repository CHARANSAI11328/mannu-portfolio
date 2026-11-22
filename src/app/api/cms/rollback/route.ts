import { NextResponse } from "next/server";
import { rollbackToRevision } from "@/lib/cms/store";

export async function POST(req: Request) {
  try {
    const { revision_id } = await req.json();
    if (!revision_id) {
      return NextResponse.json({ error: "Missing revision_id" }, { status: 400 });
    }
    const result = rollbackToRevision(revision_id);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: "Restored successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Rollback failed", details: error?.message },
      { status: 500 }
    );
  }
}
