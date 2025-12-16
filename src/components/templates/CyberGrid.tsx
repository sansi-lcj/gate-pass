"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { respondInvitation } from "@/app/invite/[uniqueToken]/action";
import { useTranslation } from "react-i18next";
import { InvitationProps, formatLocalTime, isEventEnded } from "./types";

export default function CyberGrid({ data }: InvitationProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.4) 2px, transparent 2px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.4) 2px, transparent 2px)
            `,
            backgroundSize: "60px 60px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "center top",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500 rounded-full blur-[150px] opacity-20" />
      </div>

      {/* Main Card */}
      <div className="relative z-10 bg-black/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 md:p-12 max-w-2xl w-[95%] shadow-2xl shadow-purple-500/20">
        {/* Brand */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image
            src="/assets/realsee-logo-en-with-brands-wihte.svg"
            alt="Realsee"
            width={150}
            height={40}
            className="h-8 w-auto"
          />
          <span className="text-purple-400 text-sm border border-purple-400/50 px-3 py-1 rounded-full">
            POINCARÉ
          </span>
        </div>

        {/* Greeting */}
        <p className="text-purple-300 text-lg mb-2 text-center">{greeting}</p>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
          {status === "ACCEPTED"
            ? t("Invitation.accepted_title")
            : t("Invitation.title")}
        </h1>
        {/* Product Image */}
        <div className="relative w-full h-48 md:h-64 mb-8 rounded-lg overflow-hidden border border-purple-500/30">
          <Image
            src="/images/poincare/poincare-transparent.png"
            alt="Poincaré Device"
            fill
            className="object-contain hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        <div className="bg-black/50 border border-purple-500/50 p-6 backdrop-blur-md rounded-lg mb-8 relative group">
          <div className="absolute inset-0 bg-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-gray-400 text-sm mb-2 uppercase tracking-widest">
            {t("Invitation.event_time_label")}
          </p>
          <p className="text-2xl text-white font-bold mb-1 font-mono">
            {localTime || "Calculating..."}
          </p>
          <p className="text-purple-400 text-xs text-right">
            {t("Invitation.event_time_local")}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
              🎯 {t("Invitation.highlights.item1")}
            </span>
            <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm">
              💰 {t("Invitation.highlights.item2")}
            </span>
            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
              🎬 {t("Invitation.highlights.item3")}
            </span>
          </div>
        </div>

        {/* Event Ended */}
        {eventEnded && (
          <div className="bg-gray-800/50 border border-gray-600 text-gray-300 p-4 rounded-xl mb-6 text-center">
            {t("Invitation.event_ended")}
          </div>
        )}

        {/* Accepted State */}
        {status === "ACCEPTED" && data.discountCode && (
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-2xl p-6 mb-8 text-center">
            <p className="text-purple-300 text-sm mb-2">
              {t("Invitation.code_label")}
            </p>
            <p className="text-4xl font-black text-white tracking-widest">
              {data.discountCode}
            </p>
            {data.meetingLink && (
              <a
                href={data.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-purple-400 hover:text-purple-300 underline"
              >
                {t("Invitation.meeting_link_label")} →
              </a>
            )}
          </div>
        )}

        {/* Declined State */}
        {status === "DECLINED" && (
          <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-6 mb-8 text-center">
            <p className="text-red-400 mb-2">
              {t("Invitation.declined_title")}
            </p>
            <p className="text-gray-400 text-sm">
              {t("Invitation.declined_desc")}
            </p>
            {!eventEnded && (
              <button
                onClick={handleReconsider}
                disabled={loading}
                className="mt-4 text-purple-400 underline text-sm"
              >
                {t("Invitation.reconsider_btn")}
              </button>
            )}
          </div>
        )}

        {/* [6] Action Buttons */}
        {(status === "PENDING" || status === "OPENED") && !eventEnded && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleAccept}
              disabled={loading}
              className="relative group px-12 py-4 bg-transparent border-2 border-purple-500 text-purple-400 font-bold uppercase tracking-widest overflow-hidden hover:text-white transition-colors"
            >
              <div className="absolute inset-0 bg-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 origin-left"></div>
              <span className="relative z-10">
                {t("Invitation.accept_btn")}
              </span>
            </button>
          </div>
        )}

        {/* Accepted Badge */}
        {status === "ACCEPTED" && (
          <div className="text-center mt-4">
            <span className="inline-block bg-green-500/20 text-green-400 font-bold border border-green-500/50 px-6 py-3 rounded-full">
              ✓ {t("Invitation.accepted_desc")}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-600 text-xs">
            {t("Invitation.footer")} © 2025
          </p>
        </div>
      </div>
    </div>
  );
}
