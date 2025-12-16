import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getTemplate } from "@/components/templates/registry";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { trackVisit } from "./action";
import { isRtl } from "@/components/templates/types";
import I18nProvider from "@/components/providers/I18nProvider";

export const dynamic = "force-dynamic";

// Prevent search engine indexing
// Prevent search engine indexing but allow social previews
export async function generateMetadata({
  params,
}: {
  params: Promise<{ uniqueToken: string }>;
}): Promise<Metadata> {
  const { uniqueToken } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { uniqueToken },
  });

  if (!invitation) {
    return {
      title: "Invitation Not Found",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: `Invitation for ${invitation.guestName} | Realsee Overseas`,
    description: `You are cordially invited to the Realsee 2025 Poincare Device Purchase Meeting.`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `Invitation for ${invitation.guestName}`,
      description: "Realsee 2025 Poincare Device Purchase Meeting",
      // images: ['/assets/event-cover.png'], // TODO: Add actual image URL
    },
  };
}

// Load messages for a specific locale
async function getMessages(locale: string) {
  try {
    return (await import(`../../../../messages/${locale}.json`)).default;
  } catch {
    return (await import("../../../../messages/en.json")).default;
  }
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ uniqueToken: string }>;
}) {
  const { uniqueToken } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { uniqueToken },
  });

  if (!invitation) return notFound();

  // Get system config for event time
  const config = await prisma.systemConfig.findUnique({
    where: { id: "global" },
  });

  // Track visit (fire and forget)
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || undefined;
  trackVisit(uniqueToken, userAgent);

  // Load messages for invitation's language (direct from invitation, no cookie needed)
  const allMessages = await getMessages(invitation.language);
  const messages = allMessages; // Pass all messages including "Invitation" namespace

  // Dynamic template selection based on invitation styleKey
  const TemplateComponent = getTemplate(invitation.styleKey);

  // Prepare data for template
  const templateData = {
    id: invitation.id,
    guestName: invitation.guestName,
    language: invitation.language,
    status: invitation.status as "PENDING" | "OPENED" | "ACCEPTED" | "DECLINED",
    uniqueToken: invitation.uniqueToken,
    discountCode: invitation.discountCode,
    eventTime: config?.eventTime || "2025-06-15T14:30:00+08:00",
    eventEndTime: config?.eventEndTime,
    meetingLink: config?.meetingLink,
  };

  // Determine if RTL layout
  const rtl = isRtl(invitation.language);

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <I18nProvider locale={invitation.language} resources={messages}>
        {/* eslint-disable-next-line react-hooks/static-components -- Dynamic template selection */}
        <TemplateComponent data={templateData} />
      </I18nProvider>
    </div>
  );
}
