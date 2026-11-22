import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { saveMediaAsset } from "@/lib/cms/store";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "General Upload";

    if (!file) {
      return NextResponse.json({ error: "No file provided in request" }, { status: 400 });
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/svg+xml",
      "video/mp4",
      "video/webm",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `File type "${file.type}" is not supported. Please upload MP4, WebM, JPEG, PNG, or WebP.` },
        { status: 400 }
      );
    }

    // 50MB max limit
    const maxBytes = 50 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: "File exceeds maximum size limit of 50 MB." },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadsDir, safeName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${safeName}`;
    const formattedSize =
      file.size < 1024 * 1024
        ? `${Math.round(file.size / 1024)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    const asset = {
      id: `med-${Date.now()}`,
      name: file.name,
      url: publicUrl,
      type: file.type,
      size: formattedSize,
      category: category || (file.type.startsWith("video/") ? "Hero Video" : "Trainer Photography"),
      uploaded_at: new Date().toISOString(),
    };

    saveMediaAsset(asset);

    return NextResponse.json({
      success: true,
      asset,
      url: publicUrl,
    });
  } catch (error: any) {
    console.error("Media upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file", details: error?.message },
      { status: 500 }
    );
  }
}
