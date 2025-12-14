// Shared types for invitation templates
export interface InvitationData {
  id: string;
  guestName: string;
  uniqueToken: string;
  discountCode: string | null;
  status: 'PENDING' | 'OPENED' | 'ACCEPTED' | 'DECLINED';
  language: string;
  eventTime: string; // ISO 8601
  eventEndTime?: string | null;
  meetingLink?: string | null;
}

// RTL support
export const rtlLocales = ['ar', 'he'] as const;
export const isRtl = (locale: string) => rtlLocales.includes(locale as any);

export interface InvitationProps {
  data: InvitationData;
  // messages removed, use useTranslation hook
}

// Helper to check if event has ended
export function isEventEnded(eventEndTime: string | null | undefined): boolean {
  if (!eventEndTime) return false;
  return new Date() > new Date(eventEndTime);
}

// Helper to format time for user's locale
export function formatLocalTime(isoTime: string, locale: string): string {
  try {
    const localeMap: Record<string, string> = {
      'en': 'en-US',
      'zh-CN': 'zh-CN',
      'zh-TW': 'zh-TW',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
      'ar': 'ar-SA',
      'id': 'id-ID',
      'th': 'th-TH',
      'vi': 'vi-VN',
    };
    const dateLocale = localeMap[locale] || 'en-US';
    return new Intl.DateTimeFormat(dateLocale, {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date(isoTime));
  } catch {
    return isoTime; // Fallback to raw string
  }
}
