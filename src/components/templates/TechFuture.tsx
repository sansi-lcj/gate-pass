"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { respondInvitation } from "@/app/invite/[uniqueToken]/action";
import { InvitationProps, formatLocalTime, isEventEnded } from "./types";

import { useTranslation } from "react-i18next";

export default function TechFuture({ data }: InvitationProps) {
  const { t } = useTranslation();

  const [status, setStatus] = useState(data.status);
  const [loading, setLoading] = useState(false);

  // Use useMemo for derived values instead of useState + useEffect
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

  // Replace placeholder in greeting
  const greeting = t("Invitation.greeting", { name: data.guestName });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center relative overflow-hidden font-mono">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
      </div>

      {/* Main Card */}
      <div
        className="relative z-10 border border-blue-500 bg-black/60 p-6 md:p-12 backdrop-blur-md max-w-2xl w-[95%] md:w-full"
        style={{ boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" }}
      >
        {/* [1] Brand Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image
            src="/assets/realsee-logo-en-with-brands-wihte.svg"
            alt="Realsee"
            width={150}
            height={40}
            className="h-8 w-auto"
          />
          <span className="text-blue-400 text-sm border border-blue-400 px-2 py-1">
            POINCARE
          </span>
        </div>

        {/* [2] Greeting */}
        <p className="text-blue-300 text-lg mb-2">{greeting}</p>

        {/* [3] Event Title */}
        <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-widest text-blue-500 mb-2">
          {status === "ACCEPTED"
            ? t("Invitation.accepted_title")
            : t("Invitation.title")}
        </h1>
        <p className="text-gray-400 text-sm mb-8">{t("Invitation.subtitle")}</p>

        {/* Product Image - Enhanced Premium Display */}
        <div className="relative w-full h-64 md:h-80 mb-8 rounded-xl overflow-hidden border-2 border-blue-500/40 bg-gradient-to-b from-blue-950/50 to-black/80 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
                animation: "grid-flow 20s linear infinite",
              }}
            />
          </div>

          {/* Radial Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/20 blur-[80px] rounded-full animate-pulse" />

          {/* Product Image */}
          <Image
            src="/images/poincare/poincare-transparent.png"
            alt="Poincare Device"
            fill
            className="object-contain p-8 hover:scale-110 transition-all duration-700 drop-shadow-[0_0_30px_rgba(59,130,246,0.6)] relative z-10"
            priority
          />

          {/* Scan Line Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent animate-scan pointer-events-none" />

          {/* Corner Accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400/50" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400/50" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400/50" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400/50" />
        </div>

        {/* [4] Event Details */}
        <div className="text-start border-l-2 border-blue-500 pl-6 my-8 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6">
          <p className="text-gray-500 text-sm uppercase">
            {t("Invitation.event_time_label")}
          </p>
          <p className="text-xl text-white mb-1">{localTime || "Loading..."}</p>
          <p className="text-gray-500 text-xs">
            {t("Invitation.event_time_local")}
          </p>

          <div className="mt-6 space-y-2">
            <p className="text-blue-400">
              🎯 {t("Invitation.highlights.item1")}
            </p>
            <p className="text-blue-400">
              💰 {t("Invitation.highlights.item2")}
            </p>
            <p className="text-blue-400">
              🎬 {t("Invitation.highlights.item3")}
            </p>
          </div>
        </div>

        {/* Event Ended Banner */}
        {eventEnded && (
          <div className="bg-gray-800 border border-gray-600 text-gray-300 p-4 mb-6 text-center">
            {t("Invitation.event_ended")}
          </div>
        )}

        {/* [5] Benefits / Code Section */}
        {status === "ACCEPTED" && data.discountCode && (
          <div className="bg-blue-950/50 border border-blue-500 p-6 mb-8 text-center">
            <p className="text-blue-400 text-sm mb-2">
              {t("Invitation.code_label")}
            </p>
            <p className="text-3xl md:text-4xl font-black text-white tracking-widest animate-pulse">
              {data.discountCode}
            </p>
            {data.meetingLink && (
              <a
                href={data.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline"
              >
                {t("Invitation.meeting_link_label")} →
              </a>
            )}
          </div>
        )}

        {/* [6] Action Buttons */}
        {(status === "PENDING" || status === "OPENED") && !eventEnded && (
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <button
              onClick={handleAccept}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-12 transform skew-x-[-5deg] transition-all hover:scale-105 disabled:opacity-50 shadow-[0_0_20px_rgba(37,99,235,0.5)]"
            >
              <span className="inline-block skew-x-[5deg] text-lg">
                {t("Invitation.accept_btn")}
              </span>
            </button>
          </div>
        )}

        {/* Accepted Badge */}
        {status === "ACCEPTED" && (
          <div className="text-center mt-4">
            <span className="inline-block text-green-400 font-bold border-2 border-green-500 px-6 py-3 transform -rotate-2">
              ✓ {t("Invitation.accepted_desc")}
            </span>
          </div>
        )}

        {/* [7] Footer */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-600 text-xs">
            {t("Invitation.footer")} © 2025
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        @keyframes grid-flow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(30px);
          }
        }
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </div>
  );
}
