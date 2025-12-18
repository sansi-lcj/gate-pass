"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

// Action state type for useActionState
type ActionState = { error: string } | null;

export async function createInvitationAction(
  prevState: ActionState,
  formData: FormData
) {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const guestName = formData.get("guestName") as string;
  const styleKey = formData.get("styleKey") as string;
  const language = (formData.get("language") as string) || "en";
  const salesNote = formData.get("salesNote") as string;
  const discountCode = formData.get("discountCode") as string;

  if (!guestName || !styleKey) {
    return { error: "Missing required fields" };
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user?.username },
  });
  if (!user) return { error: "User not found" };

  try {
    const uniqueToken = nanoid(10);

    await prisma.invitation.create({
      data: {
        guestName,
        styleKey,
        language,
        salesNote,
        userId: user.id,
        uniqueToken,
        discountCode: discountCode || null,
      },
    });
  } catch (e) {
    console.error(e);
    return { error: "Failed to create invitation" };
  }

  redirect("/dashboard/invitations");
}

export async function getMessagesAction(locale: string) {
  try {
    // Import from messages directory
    // Note: This path depends on where the built server file ends up relative to project root
    // But dynamic imports in server actions usually work with relative paths from source
    const messages = (await import(`../../../../messages/${locale}.json`))
      .default;
    return messages;
  } catch (error) {
    console.error("Failed to load messages for locale:", locale, error);
    // Fallback to English
    return (await import(`../../../../messages/en.json`)).default;
  }
}
