"use server";

import { createSession, deleteSession } from "@/session";

export async function login() {
  await createSession("random");
}

export async function logout() {
  await deleteSession();
}