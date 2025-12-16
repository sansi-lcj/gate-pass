"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { respondInvitation } from "@/app/invite/[uniqueToken]/action";
import { useTranslation } from "react-i18next";
import { InvitationProps, formatLocalTime, isEventEnded } from "./types";

export default function DigitalWave({ data }: InvitationProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState(data.status);
  const localTime = useMemo(() => {
    return data.eventTime ? formatLocalTime(data.eventTime, data.language) : "";
  }, [data.eventTime, data.language]);
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
    <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-slate-900 to-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Wave Background */}
      <svg
        className="absolute bottom-0 left-0 w-full h-1/2 opacity-30"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(6, 182, 212, 0.3)"
          d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,128C672,139,768,213,864,229.3C960,245,1056,203,1152,165.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <path
          fill="rgba(6, 182, 212, 0.2)"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-8">
          <Image
            src="/assets/realsee-logo-en-with-brands-wihte.svg"
            alt="Realsee"
            width={140}
            height={36}
            className="h-7 w-auto mx-auto mb-6"
          />
          <p className="text-cyan-300 font-light tracking-wide text-lg mb-2">
            {greeting}
          </p>
          <h1 className="text-3xl md:text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 transform -skew-x-6">
            {status === "ACCEPTED"
              ? t("Invitation.accepted_title")
              : t("Invitation.title")}
          </h1>

          {/* Product Image - Digital Wave Showcase */}
          <div className="relative w-full h-72 md:h-96 my-10 rounded-2xl overflow-hidden border-2 border-cyan-500/30 bg-gradient-to-br from-gray-950 via-cyan-950/20 to-gray-950 shadow-[0_0_60px_rgba(6,182,212,0.3)]">
            {/* Animated Wave Background */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 800px 400px at 50% 120%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
                  radial-gradient(ellipse 600px 300px at 50% -20%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)
                `,
                animation: "wave-flow 8s ease-in-out infinite",
              }}
            />

            {/* Dynamic Glow Centers */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-56 bg-blue-500/15 blur-[90px] rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            {/* Product Image Container */}
            <div className="relative w-full h-full flex items-center justify-center z-10">
              <Image
                src="/images/poincare/poincare-transparent.png"
                alt="Poincare Device"
                fill
                className="object-contain p-12 hover:scale-110 transition-all duration-1000 drop-shadow-[0_0_50px_rgba(6,182,212,0.6)] filter brightness-110"
                priority
              />
            </div>

            {/* Flow Lines */}
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

            {/* Corner Tech Accents */}
            <div className="absolute top-6 left-6 w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400/60 to-transparent" />
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-cyan-400/60 to-transparent" />
            </div>
            <div className="absolute top-6 right-6 w-16 h-16">
              <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-cyan-400/60 to-transparent" />
              <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-cyan-400/60 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 w-16 h-16">
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400/60 to-transparent" />
              <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-cyan-400/60 to-transparent" />
            </div>
            <div className="absolute bottom-6 right-6 w-16 h-16">
              <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-cyan-400/60 to-transparent" />
              <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-cyan-400/60 to-transparent" />
            </div>
          </div>

          <p className="text-blue-100 mt-4 text-lg">
            {t("Invitation.subtitle")}
          </p>
        </div>
        {/* Event Details */}
        <div className="bg-cyan-950/50 border-l-4 border-cyan-500 p-6 my-8 rounded-r-xl">
          <p className="text-cyan-400 text-sm">
            {t("Invitation.event_time_label")}
          </p>
          <p className="text-2xl text-white font-medium">
            {localTime || "..."}
          </p>
          <p className="text-slate-500 text-xs">
            {t("Invitation.event_time_local")}
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-cyan-300">
              🎯 {t("Invitation.highlights.item1")}
            </p>
            <p className="text-teal-300">
              💰 {t("Invitation.highlights.item2")}
            </p>
            <p className="text-emerald-300">
              🎬 {t("Invitation.highlights.item3")}
            </p>
          </div>
        </div>

        {eventEnded && (
          <div className="bg-slate-800 text-slate-300 p-4 rounded-xl mb-6 text-center">
            {t("Invitation.event_ended")}
          </div>
        )}

        {status === "ACCEPTED" && data.discountCode && (
          <div className="bg-gradient-to-r from-cyan-900/50 to-teal-900/50 border border-cyan-500/30 rounded-xl p-6 mb-8 text-center">
            <p className="text-cyan-300 text-sm">
              {t("Invitation.code_label")}
            </p>
            <p className="text-3xl font-bold text-white tracking-widest mt-2">
              {data.discountCode}
            </p>
            {data.meetingLink && (
              <a
                href={data.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline mt-4 inline-block"
              >
                {t("Invitation.meeting_link_label")}
              </a>
            )}
          </div>
        )}

        {status === "DECLINED" && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-8 text-center">
            <p className="text-red-400">{t("Invitation.declined_title")}</p>
            <p className="text-slate-400 text-sm">
              {t("Invitation.declined_desc")}
            </p>
            {!eventEnded && (
              <button
                onClick={handleReconsider}
                disabled={loading}
                className="text-cyan-400 underline mt-4"
              >
                {t("Invitation.reconsider_btn")}
              </button>
            )}
          </div>
        )}

        {/* [6] Action Buttons */}
        {(status === "PENDING" || status === "OPENED") && !eventEnded && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleAccept}
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-12 rounded-full shadow-lg shadow-cyan-500/30 transform hover:-translate-y-1 transition-all"
            >
              {t("Invitation.accept_btn")}
            </button>
          </div>
        )}

        {status === "ACCEPTED" && (
          <div className="text-center mt-4">
            <span className="inline-block bg-teal-500/20 text-teal-400 font-bold border border-teal-500/50 px-6 py-3 rounded-full">
              ✓ {t("Invitation.accepted_desc")}
            </span>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-600 text-xs">
            {t("Invitation.footer")} © 2025
          </p>
        </div>
      </div>
    </div>
  );
}
