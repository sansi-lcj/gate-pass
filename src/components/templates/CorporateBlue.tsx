"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { respondInvitation } from "@/app/invite/[uniqueToken]/action";
import { useTranslation } from "react-i18next";
import { InvitationProps, formatLocalTime, isEventEnded } from "./types";

export default function CorporateBlue({ data }: InvitationProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState(data.status);
  const localTime = useMemo(() => { return data.eventTime ? formatLocalTime(data.eventTime, data.language) : ""; }, [data.eventTime, data.language]);
  const [loading, setLoading] = useState(false);
  const eventEnded = isEventEnded(data.eventEndTime);


  const handleAccept = async () => {
    setLoading(true);
    await respondInvitation(data.uniqueToken, "ACCEPTED");
    setStatus("ACCEPTED");
    setLoading(false);
  };
  const handleReconsider = async () => {
    setLoading(true);
    await respondInvitation(data.uniqueToken, "OPENED");
    setStatus("OPENED");
    setLoading(false);
  };

  const greeting = t("Invitation.greeting", { name: data.guestName });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur rounded-lg shadow-2xl p-8 md:p-12 max-w-2xl w-full">
        <div className="bg-blue-600 p-8 md:p-10 text-white">
          <div className="flex justify-between items-start mb-6">
            <Image
              src="/assets/realsee-logo-en-with-brands-wihte.svg"
              alt="Realsee"
              width={100}
              height={28}
              className="h-5 w-auto opacity-90"
            />
            <span className="text-blue-200 text-xs font-semibold tracking-wider border border-blue-400 px-2 py-0.5 rounded">
              INVITATION
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {status === "ACCEPTED"
              ? t("Invitation.accepted_title")
              : t("Invitation.title")}
          </h1>
          <p className="text-blue-100 text-sm opacity-90">
            {t("Invitation.subtitle")}
          </p>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-56 bg-gradient-to-b from-blue-50 to-white">
          <Image
            src="/images/poincare/poincare-transparent.png"
            alt="Poincaré Device"
            fill
            className="object-contain p-6 hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="p-8 md:p-10">
          <p className="text-blue-700 text-sm font-medium">
            {t("Invitation.event_time_label")}
          </p>
          <p className="text-2xl text-gray-800 font-bold">
            {localTime || "..."}
          </p>
          <p className="text-gray-400 text-xs">
            {t("Invitation.event_time_local")}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
              {t("Invitation.highlights.item1")}
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
              {t("Invitation.highlights.item2")}
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
              {t("Invitation.highlights.item3")}
            </span>
          </div>
        </div>

        {eventEnded && (
          <div className="bg-gray-100 text-gray-500 p-4 rounded mb-6 text-center">
            {t("Invitation.event_ended")}
          </div>
        )}

        {status === "ACCEPTED" && data.discountCode && (
          <div className="bg-blue-600 text-white p-6 rounded-lg mb-8 text-center">
            <p className="text-blue-200 text-sm">
              {t("Invitation.code_label")}
            </p>
            <p className="text-3xl font-bold tracking-widest mt-2">
              {data.discountCode}
            </p>
            {data.meetingLink && (
              <a
                href={data.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 underline mt-4 inline-block"
              >
                {t("Invitation.meeting_link_label")}
              </a>
            )}
          </div>
        )}

        {/* [6] Action Buttons */}
        {(status === "PENDING" || status === "OPENED") && !eventEnded && (
          <div className="flex justify-center mt-8 pt-8 border-t border-gray-100">
            <button
              onClick={handleAccept}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-12 rounded shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 w-full md:w-auto"
            >
              {t("Invitation.accept_btn")}
            </button>
          </div>
        )}

        {status === "ACCEPTED" && (
          <div className="text-center mt-4">
            <span className="inline-block bg-green-100 text-green-600 font-bold border border-green-300 px-6 py-3 rounded-full">
              ✓ {t("Invitation.accepted_desc")}
            </span>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-xs">
            {t("Invitation.footer")} © 2025
          </p>
        </div>
      </div>
    </div>
  );
}
