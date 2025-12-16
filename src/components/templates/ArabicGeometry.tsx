"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { respondInvitation } from "@/app/invite/[uniqueToken]/action";
import { useTranslation } from "react-i18next";
import { InvitationProps, formatLocalTime, isEventEnded } from "./types";

// Special RTL-ready template for Arabic regions
export default function ArabicGeometry({ data }: InvitationProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Geometric Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2310b981' stroke-width='1'%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3Ccircle cx='40' cy='40' r='30'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Cpath d='M10 10l60 60M10 70l60-60'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Golden Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

      <div className="relative z-10 bg-emerald-950/80 backdrop-blur-lg border border-emerald-600/30 rounded-lg p-8 md:p-12 max-w-2xl w-full shadow-2xl">
        {/* Brand */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-600/30">
          <Image
            src="/assets/realsee-logo-en-with-brands-wihte.svg"
            alt="Realsee"
            width={120}
            height={32}
            className="h-6 w-auto"
          />
          <span className="text-amber-400 font-serif tracking-widest">
            POINCARÉ
          </span>
        </div>

        <p className="text-emerald-300 text-lg">{greeting}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 my-4">
          {status === "ACCEPTED"
            ? t("Invitation.accepted_title")
            : t("Invitation.title")}
        </h1>
        <p className="text-emerald-400/70">{t("Invitation.subtitle")}</p>

        {/* Product Image */}
        <div className="relative w-full h-56 my-8 border border-emerald-600/30 bg-emerald-900/30 rounded-lg">
          <Image
            src="/images/poincare/poincare-transparent.png"
            alt="Poincaré Device"
            fill
            className="object-contain p-6 hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="bg-emerald-900/50 border border-emerald-600/30 rounded-lg p-6 my-8">
          <p className="text-amber-400/80 text-sm">
            {t("Invitation.event_time_label")}
          </p>
          <p className="text-2xl text-white font-medium mt-1">
            {localTime || "..."}
          </p>
          <p className="text-emerald-500 text-xs">
            {t("Invitation.event_time_local")}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-emerald-800/50 text-emerald-300 px-3 py-1 rounded border border-emerald-600/30 text-sm">
              ✦ {t("Invitation.highlights.item1")}
            </span>
            <span className="bg-emerald-800/50 text-emerald-300 px-3 py-1 rounded border border-emerald-600/30 text-sm">
              ✦ {t("Invitation.highlights.item2")}
            </span>
            <span className="bg-emerald-800/50 text-emerald-300 px-3 py-1 rounded border border-emerald-600/30 text-sm">
              ✦ {t("Invitation.highlights.item3")}
            </span>
          </div>
        </div>

        {eventEnded && (
          <div className="bg-emerald-900/50 text-emerald-400 p-4 rounded-lg mb-6 text-center">
            {t("Invitation.event_ended")}
          </div>
        )}

        {status === "ACCEPTED" && data.discountCode && (
          <div className="bg-gradient-to-r from-amber-900/50 to-amber-800/50 border border-amber-500/30 rounded-lg p-8 mb-8 text-center">
            <p className="text-amber-400/70 text-sm">
              {t("Invitation.code_label")}
            </p>
            <p className="text-4xl font-bold text-amber-300 tracking-widest mt-2">
              {data.discountCode}
            </p>
            {data.meetingLink && (
              <a
                href={data.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 underline mt-4 inline-block"
              >
                {t("Invitation.meeting_link_label")}
              </a>
            )}
          </div>
        )}

        {status === "DECLINED" && (
          <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-6 mb-8 text-center">
            <p className="text-red-400">{t("Invitation.declined_title")}</p>
            <p className="text-emerald-400/70 text-sm">
              {t("Invitation.declined_desc")}
            </p>
            {!eventEnded && (
              <button
                onClick={handleReconsider}
                disabled={loading}
                className="text-amber-400 underline mt-4"
              >
                {t("Invitation.reconsider_btn")}
              </button>
            )}
          </div>
        )}

        {(status === "PENDING" || status === "OPENED") && !eventEnded && (
          <div className="flex justify-center mt-8 pt-8 border-t border-emerald-600/30">
            <button
              onClick={handleAccept}
              disabled={loading}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold py-4 px-12 rounded transition-all disabled:opacity-50 min-w-[200px]"
            >
              {t("Invitation.accept_btn")}
            </button>
          </div>
        )}

        {status === "ACCEPTED" && (
          <div className="text-center mt-4">
            <span className="inline-block bg-green-900/50 text-green-400 border border-green-500/30 px-6 py-3 rounded">
              ✓ {t("Invitation.accepted_desc")}
            </span>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-emerald-600/30 text-center">
          <p className="text-emerald-600 text-xs">
            {t("Invitation.footer")} © 2025
          </p>
        </div>
      </div>
    </div>
  );
}
