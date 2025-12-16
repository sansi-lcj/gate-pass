"use server";

import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import * as bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

type LoginActionState = { error: string } | null;

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData
) {
  const username = formData.get("salesCode") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Please enter both Sales Code and Password" };
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return { error: "Invalid Sales Code" };
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return { error: "Invalid Password" };
  }

  // Create Session
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.username,
    },
    expires,
  });

  // Set Cookie
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  redirect(user.role === "ADMIN" ? "/admin" : "/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
