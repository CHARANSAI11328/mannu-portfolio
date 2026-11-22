import { NextResponse } from "next/server";
import { saveFaq, deleteFaq } from "@/lib/cms/store";
import { faqItemSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = faqItemSchema.parse(body);
    const updated = saveFaq(parsed);
    return NextResponse.json({ success: true, faqs: updated.faqs });
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
      return NextResponse.json({ error: "Missing FAQ ID" }, { status: 400 });
    }
    const updated = deleteFaq(id);
    return NextResponse.json({ success: true, faqs: updated.faqs });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete FAQ", details: error?.message },
      { status: 500 }
    );
  }
}
