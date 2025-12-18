"use client";

import { UseInvitationReturn } from "@/hooks/useInvitation";

interface AcceptedContentProps {
  invitation: UseInvitationReturn;
  className?: string;
  // Style customization props
  containerClassName?: string;
  waitingTitleClassName?: string;
  waitingHintClassName?: string;
  timeClassName?: string;
  joinButtonClassName?: string;
  joinHintClassName?: string;
  codeLabelClassName?: string;
  codeClassName?: string;
  meetingLinkClassName?: string;
}

/**
 * Headless AcceptedContent component
 * Renders the appropriate content based on displayMode:
 * - "waiting": Shows confirmation + waiting hint + event time
 * - "join_meeting": Shows confirmation + join meeting button
 * - "show_code": Shows discount code (if available)
 */
export function AcceptedContent({
  invitation,
  className = "",
  containerClassName = "p-6 text-center",
  waitingTitleClassName = "text-green-500 text-lg font-bold mb-2",
  waitingHintClassName = "text-gray-500 text-sm",
  timeClassName = "text-blue-500 text-sm mt-2",
  joinButtonClassName = "inline-block bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg",
  joinHintClassName = "text-gray-500 text-xs mt-3",
  codeLabelClassName = "text-sm mb-2",
  codeClassName = "text-3xl md:text-4xl font-mono font-bold tracking-widest",
  meetingLinkClassName = "inline-block mt-4 underline",
}: AcceptedContentProps) {
  const {
    t,
    displayMode,
    localTime,
    data,
    showWaitingMessage,
    showJoinMeetingButton,
    showDiscountCode,
  } = invitation;

  if (!invitation.showAcceptedContent) return null;

  return (
    <div className={`${containerClassName} ${className}`}>
      {/* Waiting - Before 30min window */}
      {showWaitingMessage && (
        <>
          <p className={waitingTitleClassName}>
            ✓ {t("Invitation.accepted_desc")}
          </p>
          <p className={waitingHintClassName}>{t("Invitation.waiting_hint")}</p>
          <p className={timeClassName}>📅 {localTime}</p>
        </>
      )}

      {/* Join Meeting - Within 30min before event */}
      {showJoinMeetingButton && (
        <>
          <p className={`${waitingTitleClassName} text-sm mb-3`}>
            ✓ {t("Invitation.accepted_desc")}
          </p>
          <a
            href={data.meetingLink!}
            target="_blank"
            rel="noopener noreferrer"
            className={joinButtonClassName}
          >
            🎬 {t("Invitation.meeting_link_label")}
          </a>
          <p className={joinHintClassName}>
            {t("Invitation.meeting_starting_hint")}
          </p>
        </>
      )}

      {/* Show Code - After event started */}
      {showDiscountCode && (
        <>
          <p className={codeLabelClassName}>{t("Invitation.code_label")}</p>
          <p className={codeClassName}>{data.discountCode}</p>
          {data.meetingLink && (
            <a
              href={data.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className={meetingLinkClassName}
            >
              {t("Invitation.meeting_link_label")} →
            </a>
          )}
        </>
      )}

      {/* Accepted but no specific content to show */}
      {displayMode === "show_code" && !data.discountCode && (
        <p className={waitingTitleClassName}>
          ✓ {t("Invitation.accepted_desc")}
        </p>
      )}
    </div>
  );
}

interface ActionButtonsProps {
  invitation: UseInvitationReturn;
  className?: string;
  acceptButtonClassName?: string;
  declineButtonClassName?: string;
  showDecline?: boolean;
}

/**
 * Headless ActionButtons component
 * Renders accept/decline buttons based on invitation state
 */
export function ActionButtons({
  invitation,
  className = "flex flex-col md:flex-row gap-4 justify-center mt-8",
  acceptButtonClassName = "bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-12 transition-all hover:scale-105 disabled:opacity-50",
  declineButtonClassName = "text-gray-500 hover:text-gray-700 text-sm underline",
  showDecline = false,
}: ActionButtonsProps) {
  const {
    t,
    handleAccept,
    handleDecline,
    loading,
    showAcceptButton,
    showDeclineButton,
  } = invitation;

  if (!showAcceptButton) return null;

  return (
    <div className={className}>
      <button
        onClick={handleAccept}
        disabled={loading}
        className={acceptButtonClassName}
      >
        {t("Invitation.accept_btn")}
      </button>
      {showDecline && showDeclineButton && (
        <button
          onClick={handleDecline}
          disabled={loading}
          className={declineButtonClassName}
        >
          {t("Invitation.decline_btn")}
        </button>
      )}
    </div>
  );
}

interface DeclinedContentProps {
  invitation: UseInvitationReturn;
  className?: string;
  titleClassName?: string;
  descClassName?: string;
  reconsiderClassName?: string;
}

/**
 * Headless DeclinedContent component
 */
export function DeclinedContent({
  invitation,
  className = "p-6 text-center",
  titleClassName = "font-bold mb-2",
  descClassName = "text-sm italic",
  reconsiderClassName = "mt-4 underline text-sm",
}: DeclinedContentProps) {
  const { t, handleReconsider, loading, showDeclinedContent, eventEnded } =
    invitation;

  if (!showDeclinedContent) return null;

  return (
    <div className={className}>
      <p className={titleClassName}>{t("Invitation.declined_title")}</p>
      <p className={descClassName}>{t("Invitation.declined_desc")}</p>
      {!eventEnded && (
        <button
          onClick={handleReconsider}
          disabled={loading}
          className={reconsiderClassName}
        >
          {t("Invitation.reconsider_btn")}
        </button>
      )}
    </div>
  );
}

interface EventEndedBannerProps {
  invitation: UseInvitationReturn;
  className?: string;
}

/**
 * Headless EventEndedBanner component
 */
export function EventEndedBanner({
  invitation,
  className = "p-4 text-center",
}: EventEndedBannerProps) {
  const { t, eventEnded } = invitation;

  if (!eventEnded) return null;

  return <div className={className}>{t("Invitation.event_ended")}</div>;
}
