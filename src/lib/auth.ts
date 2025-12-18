import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// JWT payload type
interface SessionPayload extends JWTPayload {
  user?: {
    id: string;
    username: string;
    role: string;
    name?: string;
  };
  expires?: Date;
}

const secretKey =
  process.env.JWT_SECRET || "your-secret-key-at-least-32-chars-long";
const key = new TextEncoder().encode(secretKey);

const TIMEOUT = "7d"; // 7 days

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TIMEOUT)
    .sign(key);
}

export async function decrypt(input: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Extend session if valid (optional, here we just check validity in middleware)
  const parsed = await decrypt(session);

  if (!parsed) {
    return;
  }

  // Refresh logic could go here
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: session,
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  return res;
}
