import { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";

export function isAuthed(req: NextRequest): boolean {
  const cookie = req.cookies.get("iman-admin")?.value;
  const password = process.env.ADMIN_PASSWORD;
  if (!cookie || !password) return false;

  const a = Buffer.from(cookie);
  const b = Buffer.from(password);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
