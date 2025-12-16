"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { respondInvitation } from "@/app/invite/[uniqueToken]/action";
import { useTranslation } from "react-i18next";
import { InvitationProps, formatLocalTime, isEventEnded } from "./types";

export default function DarkMatter({ data }: InvitationProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState(data.status);
  const localTime = useMemo(() => {
    return data.eventTime ? formatLocalTime(data.eventTime, data.language) : "";
  }, [data.eventTime, data.language]);
  const [loading, setLoading] = useState(false);
  const eventEnded = isEventEnded(data.eventEndTime);

  // Generate stable star positions (seeded pattern based on index)
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        left: `${(i * 7.3) % 100}%`,
        top: `${(i * 13.7) % 100}%`,
        opacity: 0.3 + (i % 7) * 0.1,
        duration: 2 + (i % 5),
      })),
    []
  );

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
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Star Field */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: star.left,
              top: star.top,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Nebula Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-900 rounded-full blur-[150px] opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-900 rounded-full blur-[120px] opacity-20" />

      <div className="relative z-10 bg-gray-950/80 backdrop-blur-xl border border-gray-800 rounded-sm p-8 md:p-12 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
          <Image
            src="/assets/realsee-logo-en-with-brands-wihte.svg"
            alt="Realsee"
            width={120}
            height={32}
            className="h-6 w-auto"
          />
          <span className="text-gray-400 text-xs tracking-[0.3em]">
            POINCARÉ
          </span>
        </div>

        <p className="text-gray-400 text-lg">{greeting}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white my-4">
          {status === "ACCEPTED"
            ? t("Invitation.accepted_title")
            : t("Invitation.title")}
        </h1>
        <p className="text-gray-500">{t("Invitation.subtitle")}</p>

        {/* Product Image - Cosmic Showcase */}
        <div className="relative w-full h-72 md:h-96 my-10">
          {/* Holographic Frame */}
          <div className="absolute inset-0 border-2 border-gray-700 rounded-lg overflow-hidden bg-gradient-to-br from-gray-950 via-indigo-950/20 to-gray-950">
            {/* Dynamic Nebula Background */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
            <div
              className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-violet-600/15 rounded-full blur-[100px] animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-700/10 rounded-full blur-[140px] animate-pulse"
              style={{ animationDelay: "1s" }}
            />

            {/* Scanning Grid Overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(147, 197, 253, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(147, 197, 253, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Product Image with Holographic Glow */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/images/poincare/poincare-transparent.png"
                  alt="Poincare Device"
                  fill
                  className="object-contain p-10 hover:scale-110 transition-all duration-1000 drop-shadow-[0_0_50px_rgba(139,92,246,0.5)] filter brightness-105"
                  priority
                />
              </div>

              {/* Holographic Light Rays */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-45 blur-sm" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-45 blur-sm" />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${3 + (i % 2)}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Outer Glow Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-purple-600/20 rounded-lg blur-sm -z-10" />
        </div>

        <div className="border border-gray-800 bg-gray-900/50 p-6 my-8">
          <p className="text-gray-500 text-sm">
            {t("Invitation.event_time_label")}
          </p>
          <p className="text-2xl text-white font-light mt-1">
            {localTime || "..."}
          </p>
          <p className="text-gray-600 text-xs">
            {t("Invitation.event_time_local")}
          </p>
          <div className="mt-6 space-y-2 text-gray-400 text-sm">
            <p>◆ {t("Invitation.highlights.item1")}</p>
            <p>◆ {t("Invitation.highlights.item2")}</p>
            <p>◆ {t("Invitation.highlights.item3")}</p>
          </div>
        </div>

        {eventEnded && (
          <div className="bg-gray-900 text-gray-500 p-4 mb-6 text-center border border-gray-800">
            {t("Invitation.event_ended")}
          </div>
        )}

        {status === "ACCEPTED" && data.discountCode && (
          <div className="bg-white text-black p-8 mb-8 text-center">
            <p className="text-gray-500 text-sm">
              {t("Invitation.code_label")}
            </p>
            <p className="text-4xl font-bold tracking-[0.2em] mt-2">
              {data.discountCode}
            </p>
            {data.meetingLink && (
              <a
                href={data.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 underline mt-4 inline-block"
              >
                {t("Invitation.meeting_link_label")}
              </a>
            )}
          </div>
        )}

        {status === "DECLINED" && (
          <div className="bg-red-950/50 border border-red-900 p-6 mb-8 text-center">
            <p className="text-red-400">{t("Invitation.declined_title")}</p>
            <p className="text-gray-500 text-sm">
              {t("Invitation.declined_desc")}
            </p>
            {!eventEnded && (
              <button
                onClick={handleReconsider}
                disabled={loading}
                className="text-gray-400 underline mt-4"
              >
                {t("Invitation.reconsider_btn")}
              </button>
            )}
          </div>
        )}

        {(status === "PENDING" || status === "OPENED") && !eventEnded && (
          <div className="flex justify-center mt-8 pt-8 border-t border-gray-800">
            <button
              onClick={handleAccept}
              disabled={loading}
              className="bg-white hover:bg-gray-100 text-black font-bold py-4 px-12 transition-all disabled:opacity-50 min-w-[200px]"
            >
              {t("Invitation.accept_btn")}
            </button>
          </div>
        )}

        {status === "ACCEPTED" && (
          <div className="text-center mt-4">
            <span className="inline-block bg-green-950 text-green-400 border border-green-800 px-6 py-3">
              ✓ {t("Invitation.accepted_desc")}
            </span>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-700 text-xs">
            {t("Invitation.footer")} © 2025
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
