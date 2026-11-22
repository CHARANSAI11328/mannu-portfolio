import { NextResponse } from "next/server";
import { savePlan, deletePlan } from "@/lib/cms/store";
import { monthlyPlanSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = monthlyPlanSchema.parse(body);
    const updated = savePlan(parsed);
    return NextResponse.json({ success: true, plans: updated.plans });
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
      return NextResponse.json({ error: "Missing plan ID" }, { status: 400 });
    }
    const updated = deletePlan(id);
    return NextResponse.json({ success: true, plans: updated.plans });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete plan", details: error?.message },
      { status: 500 }
    );
  }
}
