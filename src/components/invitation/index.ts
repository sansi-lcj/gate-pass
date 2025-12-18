// Re-export all headless components and hook for easy importing
export { useInvitation } from "@/hooks/useInvitation";
export type { UseInvitationReturn } from "@/hooks/useInvitation";

export {
  AcceptedContent,
  ActionButtons,
  DeclinedContent,
  EventEndedBanner,
} from "./HeadlessComponents";

// Shared visual components
export { SharedBackground } from "./SharedBackground";
export type { SharedBackgroundProps } from "./SharedBackground";

export { GlassCard } from "./GlassCard";
export type { GlassCardProps } from "./GlassCard";

export {
  DiamondDivider,
  Badge,
  BadgeGroup,
  BrandHeader,
  ProductPreview,
  InvitationFooter,
} from "./Decorations";
export type {
  DiamondDividerProps,
  BadgeProps,
  BadgeGroupProps,
  BrandHeaderProps,
  ProductPreviewProps,
  InvitationFooterProps,
} from "./Decorations";
