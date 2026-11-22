import { NextResponse } from "next/server";
import { getMediaAssets, deleteMediaAsset } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const assets = getMediaAssets();
  return NextResponse.json({ assets });
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Media ID is required" }, { status: 400 });
    }
    const updated = deleteMediaAsset(id);
    return NextResponse.json({ success: true, assets: updated });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete media asset" }, { status: 500 });
  }
}
