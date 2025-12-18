"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { respondInvitation } from "@/app/invite/[uniqueToken]/action";
import {
  InvitationData,
  formatLocalTime,
  isEventEnded,
  getAcceptedDisplayMode,
  AcceptedDisplayMode,
} from "@/components/templates/types";

export interface UseInvitationReturn {
  // State
  status: InvitationData["status"];
  loading: boolean;
  displayMode: AcceptedDisplayMode;
  eventEnded: boolean;
  localTime: string;

  // Actions
  handleAccept: () => Promise<void>;
  handleDecline: () => Promise<void>;
  handleReconsider: () => Promise<void>;

  // Data
  data: InvitationData;

  // Derived booleans for conditional rendering
  showAcceptButton: boolean;
  showDeclineButton: boolean;
  showJoinMeetingButton: boolean;
  showDiscountCode: boolean;
  showWaitingMessage: boolean;
  showAcceptedContent: boolean;
  showDeclinedContent: boolean;

  // i18n
  t: ReturnType<typeof useTranslation>["t"];
  greeting: string;
  honorific: string;
  guestName: string;
}

export function useInvitation(data: InvitationData): UseInvitationReturn {
  const { t } = useTranslation();
  const [status, setStatus] = useState(data.status);
  const [loading, setLoading] = useState(false);

  // Derived state
  const eventEnded = useMemo(
    () => isEventEnded(data.eventEndTime),
    [data.eventEndTime]
  );
  const displayMode = useMemo(
    () => getAcceptedDisplayMode(data.eventTime, data.eventEndTime),
    [data.eventTime, data.eventEndTime]
  );
  const localTime = useMemo(
    () =>
      data.eventTime ? formatLocalTime(data.eventTime, data.language) : "",
    [data.eventTime, data.language]
  );

  // Actions
  const handleAccept = useCallback(async () => {
    setLoading(true);
    try {
      await respondInvitation(data.uniqueToken, "ACCEPTED");
      setStatus("ACCEPTED");
    } finally {
      setLoading(false);
    }
  }, [data.uniqueToken]);

  const handleDecline = useCallback(async () => {
    setLoading(true);
    try {
      await respondInvitation(data.uniqueToken, "DECLINED");
      setStatus("DECLINED");
    } finally {
      setLoading(false);
    }
  }, [data.uniqueToken]);

  const handleReconsider = useCallback(async () => {
    setLoading(true);
    try {
      await respondInvitation(data.uniqueToken, "OPENED");
      setStatus("OPENED");
    } finally {
      setLoading(false);
    }
  }, [data.uniqueToken]);

  // Derived booleans
  const showAcceptButton =
    (status === "PENDING" || status === "OPENED") && !eventEnded;
  const showDeclineButton =
    (status === "PENDING" || status === "OPENED") && !eventEnded;
  const showAcceptedContent = status === "ACCEPTED";
  const showDeclinedContent = status === "DECLINED";
  const showJoinMeetingButton =
    status === "ACCEPTED" &&
    displayMode === "join_meeting" &&
    !!data.meetingLink;
  const showDiscountCode =
    status === "ACCEPTED" && displayMode === "show_code" && !!data.discountCode;
  const showWaitingMessage = status === "ACCEPTED" && displayMode === "waiting";

  // Greeting with name substitution
  const greeting = t("Invitation.greeting", { name: data.guestName });
  const honorific = t("Invitation.honorific");
  const guestName = data.guestName;

  return {
    // State
    status,
    loading,
    displayMode,
    eventEnded,
    localTime,

    // Actions
    handleAccept,
    handleDecline,
    handleReconsider,

    // Data
    data,

    // Derived booleans
    showAcceptButton,
    showDeclineButton,
    showJoinMeetingButton,
    showDiscountCode,
    showWaitingMessage,
    showAcceptedContent,
    showDeclinedContent,

    // i18n
    t,
    greeting,
    honorific,
    guestName,
  };
}
