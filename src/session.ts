"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const expirationTime = 10 * 60; // 10 minutes in seconds
const signingKey = new TextEncoder().encode("hacksg2024");

// biome-ignore lint/suspicious/noExplicitAny: Can be any type
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${expirationTime} seconds from now`)
    .sign(signingKey);
}

// biome-ignore lint/suspicious/noExplicitAny: Can be any type
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, signingKey, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function createSession(key: string) {
  // if (key !== AdminKey)
  //   return false;
  const user = { key };
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });
  cookies().set("session", session, { expires, httpOnly: true });
  return true;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(req: NextRequest, res?: NextResponse) {
  const session = req.cookies.get("session")?.value;
  if (!session) return;

  // Refreshes the current session so it does not expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + expirationTime * 1000);
  const response = res ?? NextResponse.next();
  response.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return response;
}

export async function deleteSession() {
  cookies().set("session", "", { expires: new Date(0) });
}