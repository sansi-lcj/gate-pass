// Shared types for invitation templates
export interface InvitationData {
  id: string;
  guestName: string;
  uniqueToken: string;
  discountCode: string | null;
  status: "PENDING" | "OPENED" | "ACCEPTED" | "DECLINED";
  language: string;
  eventTime: string; // ISO 8601
  eventEndTime?: string | null;
  meetingLink?: string | null;
}

// RTL support
export const rtlLocales = ["ar", "he"] as const;
type RtlLocale = (typeof rtlLocales)[number];
export const isRtl = (locale: string) =>
  rtlLocales.includes(locale as RtlLocale);

export interface InvitationProps {
  data: InvitationData;
  // messages removed, use useTranslation hook
}

// Helper to check if event has ended
export function isEventEnded(eventEndTime: string | null | undefined): boolean {
  if (!eventEndTime) return false;
  return new Date() > new Date(eventEndTime);
}

// Helper to check if event has started
export function isEventStarted(eventTime: string | null | undefined): boolean {
  if (!eventTime) return false;
  return new Date() >= new Date(eventTime);
}

// Helper to check if we're within 1 hour before event start
export function isWithin1HourOfStart(
  eventTime: string | null | undefined
): boolean {
  if (!eventTime) return false;
  const now = new Date();
  const eventDate = new Date(eventTime);
  const oneHourBefore = new Date(eventDate.getTime() - 60 * 60 * 1000);
  return now >= oneHourBefore && now < eventDate;
}

// Determine what to show in the accepted state
export type AcceptedDisplayMode = "waiting" | "join_meeting" | "show_code";

export function getAcceptedDisplayMode(
  eventTime: string | null | undefined,
  eventEndTime: string | null | undefined
): AcceptedDisplayMode {
  if (isEventEnded(eventEndTime)) {
    return "show_code"; // Event ended, show code
  }
  if (isEventStarted(eventTime)) {
    return "show_code"; // Event started, show code
  }
  if (isWithin1HourOfStart(eventTime)) {
    return "join_meeting"; // 1 hour before, show join button
  }
  return "waiting"; // Before 1 hour window, show waiting message
}

// Helper to format time for user's locale
export function formatLocalTime(isoTime: string, locale: string): string {
  try {
    const localeMap: Record<string, string> = {
      en: "en-US",
      "zh-CN": "zh-CN",
      "zh-TW": "zh-TW",
      ja: "ja-JP",
      ko: "ko-KR",
      ar: "ar-SA",
      id: "id-ID",
      th: "th-TH",
      vi: "vi-VN",
    };
    const dateLocale = localeMap[locale] || "en-US";
    return new Intl.DateTimeFormat(dateLocale, {
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date(isoTime));
  } catch {
    return isoTime; // Fallback to raw string
  }
}
