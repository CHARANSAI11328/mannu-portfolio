import { NextResponse } from "next/server";
import { saveTransformation, deleteTransformation } from "@/lib/cms/store";
import { transformationSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = transformationSchema.parse(body);

    if (parsed.is_published && !parsed.has_client_consent) {
      return NextResponse.json(
        { error: "Cannot publish transformation without explicit client consent." },
        { status: 400 }
      );
    }

    const updated = saveTransformation(parsed);
    return NextResponse.json({ success: true, transformations: updated.transformations });
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
      return NextResponse.json({ error: "Missing transformation ID" }, { status: 400 });
    }
    const updated = deleteTransformation(id);
    return NextResponse.json({ success: true, transformations: updated.transformations });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete transformation", details: error?.message },
      { status: 500 }
    );
  }
}
