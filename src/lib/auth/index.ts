import crypto from "crypto";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "mansoor@fitness.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "MansoorFitness@2026";
const AUTH_SECRET = process.env.AUTH_SECRET || "mansoor-super-secret-auth-key-2026";

export interface AdminUser {
  email: string;
  name: string;
  role: "admin";
}

/**
 * Verifies admin credentials. Supports both:
 * 1. Single-field password login ("GYM" or default ADMIN_PASSWORD)
 * 2. Full email + password login (for backward compatibility and tests)
 */
export function verifyAdminCredentials(
  emailOrPassword?: string,
  password?: string
): AdminUser | null {
  if (!emailOrPassword) return null;

  // Single-field password mode
  if (!password) {
    const inputPass = emailOrPassword.trim();
    if (inputPass === "GYM" || inputPass === ADMIN_PASSWORD) {
      return {
        email: ADMIN_EMAIL,
        name: "Shaik Mansoor",
        role: "admin",
      };
    }
    return null;
  }

  // Full email + password mode
  const cleanEmail = emailOrPassword.trim().toLowerCase();
  const cleanPassword = password.trim();

  // Allow "GYM" as password for any admin email attempt as well
  if (
    (cleanEmail === ADMIN_EMAIL.toLowerCase() || cleanEmail === "admin") &&
    (cleanPassword === "GYM" || cleanPassword === ADMIN_PASSWORD)
  ) {
    return {
      email: ADMIN_EMAIL,
      name: "Shaik Mansoor",
      role: "admin",
    };
  }

  return null;
}

export function generateSessionToken(user: AdminUser): string {
  const payload = JSON.stringify({
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  const hmac = crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${hmac}`;
}

export function verifySessionToken(token?: string): AdminUser | null {
  if (!token) return null;
  try {
    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) return null;

    const payloadRaw = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const expectedSignature = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(payloadRaw)
      .digest("hex");

    if (signature !== expectedSignature) return null;

    const parsed = JSON.parse(payloadRaw);
    if (!parsed || parsed.exp < Date.now()) return null;

    return {
      email: parsed.email,
      name: parsed.name,
      role: parsed.role,
    };
  } catch {
    return null;
  }
}

export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}
