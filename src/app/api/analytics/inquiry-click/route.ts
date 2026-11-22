import { NextResponse } from "next/server";
import { recordWhatsAppInquiryClick } from "@/lib/cms/store";

export async function POST() {
  try {
    const total = recordWhatsAppInquiryClick();
    return NextResponse.json({ success: true, total_clicks: total });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to record inquiry click", details: error?.message },
      { status: 500 }
    );
  }
}
