import { NextResponse } from "next/server";
import { verifyAdminCredentials, generateSessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password } = body;

    // Handle single-field password login (e.g. { password: "GYM" })
    let user = null;
    if (password && !email) {
      user = verifyAdminCredentials(password);
    } else if (email && password) {
      user = verifyAdminCredentials(email, password);
    } else if (password) {
      user = verifyAdminCredentials(password);
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid password. Enter the admin access key." },
        { status: 401 }
      );
    }

    const token = generateSessionToken(user);
    const response = NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name },
    });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "Authentication failed", details: error?.message },
      { status: 500 }
    );
  }
}
