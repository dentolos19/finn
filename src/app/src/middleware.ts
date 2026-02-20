import { getSession, updateSession } from "@/session";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await getSession();

  if (path === "/login" && session) {
    const res = NextResponse.redirect(new URL("/", req.nextUrl));
    return await updateSession(req, res);
  }

  if (path === "/" && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return await updateSession(req);
}
