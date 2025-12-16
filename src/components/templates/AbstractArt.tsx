"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { respondInvitation } from "@/app/invite/[uniqueToken]/action";
import { useTranslation } from "react-i18next";
import { InvitationProps, formatLocalTime, isEventEnded } from "./types";

export default function AbstractArt({ data }: InvitationProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState(data.status);
  const [loading, setLoading] = useState(false);

  const localTime = useMemo(() => {
    return data.eventTime ? formatLocalTime(data.eventTime, data.language) : "";
  }, [data.eventTime, data.language]);

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
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-violet-100 to-teal-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract Shapes */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-rose-300 to-orange-300 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-violet-300 to-fuchsia-300 rounded-full blur-3xl opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-xl">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image
            src="/assets/realsee-logo-en-with-brands-color.svg"
            alt="Realsee"
            width={140}
            height={36}
            className="h-8 w-auto"
          />
          <span className="text-violet-600 text-xs bg-violet-100 px-3 py-1 rounded-full">
            POINCARÉ
          </span>
        </div>

        <p className="text-violet-600 text-lg text-center">{greeting}</p>
        <h1 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-rose-500 via-violet-500 to-teal-500 bg-clip-text text-transparent my-4">
          {status === "ACCEPTED"
            ? t("Invitation.accepted_title")
            : t("Invitation.title")}
        </h1>
        <p className="text-gray-500 text-center">{t("Invitation.subtitle")}</p>

        {/* Product Image */}
        <div className="relative w-full h-64 my-8 backdrop-blur-sm bg-white/30 rounded-xl overflow-hidden border border-white/50 shadow-inner">
          <Image
            src="/images/poincare/poincare-transparent.png"
            alt="Poincaré Device"
            fill
            className="object-contain p-6 hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="bg-gradient-to-r from-rose-50 via-violet-50 to-teal-50 rounded-2xl p-6 my-8 text-center">
          <p className="text-violet-600 text-sm">
            {t("Invitation.event_time_label")}
          </p>
          <p className="text-2xl text-gray-800 font-medium mt-1">
            {localTime || "..."}
          </p>
          <p className="text-gray-400 text-xs">
            {t("Invitation.event_time_local")}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="bg-rose-200/50 text-rose-700 px-4 py-2 rounded-full text-sm">
              {t("Invitation.highlights.item1")}
            </span>
            <span className="bg-violet-200/50 text-violet-700 px-4 py-2 rounded-full text-sm">
              {t("Invitation.highlights.item2")}
            </span>
            <span className="bg-teal-200/50 text-teal-700 px-4 py-2 rounded-full text-sm">
              {t("Invitation.highlights.item3")}
            </span>
          </div>
        </div>

        {eventEnded && (
          <div className="bg-gray-100 text-gray-500 p-4 rounded-xl mb-6 text-center">
            {t("Invitation.event_ended")}
          </div>
        )}

        {status === "ACCEPTED" && data.discountCode && (
          <div className="bg-gradient-to-r from-rose-500 via-violet-500 to-teal-500 text-white rounded-2xl p-8 mb-8 text-center">
            <p className="text-white/80 text-sm">
              {t("Invitation.code_label")}
            </p>
            <p className="text-4xl font-bold tracking-widest mt-2">
              {data.discountCode}
            </p>
            {data.meetingLink && (
              <a
                href={data.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline mt-4 inline-block"
              >
                {t("Invitation.meeting_link_label")}
              </a>
            )}
          </div>
        )}

        {status === "DECLINED" && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 text-center">
            <p className="text-red-500">{t("Invitation.declined_title")}</p>
            <p className="text-gray-500 text-sm">
              {t("Invitation.declined_desc")}
            </p>
            {!eventEnded && (
              <button
                onClick={handleReconsider}
                disabled={loading}
                className="text-violet-500 underline mt-4"
              >
                {t("Invitation.reconsider_btn")}
              </button>
            )}
          </div>
        )}

        {(status === "PENDING" || status === "OPENED") && !eventEnded && (
          <div className="flex justify-center mt-8 pt-8 border-t border-gray-100">
            <button
              onClick={handleAccept}
              disabled={loading}
              className="bg-gradient-to-r from-rose-500 via-violet-500 to-teal-500 hover:opacity-90 text-white font-bold py-4 px-12 rounded-full transition-all shadow-lg disabled:opacity-50 hover:shadow-xl transform hover:-translate-y-1"
            >
              {t("Invitation.accept_btn")}
            </button>
          </div>
        )}

        {status === "ACCEPTED" && (
          <div className="text-center mt-4">
            <span className="inline-block bg-green-100 text-green-600 font-bold px-6 py-3 rounded-full">
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
