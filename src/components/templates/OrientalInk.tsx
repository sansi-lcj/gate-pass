"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { respondInvitation } from "@/app/invite/[uniqueToken]/action";
import { useTranslation } from "react-i18next";
import { InvitationProps, formatLocalTime, isEventEnded } from "./types";

export default function OrientalInk({ data }: InvitationProps) {
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
    <div className="min-h-screen bg-gradient-to-b from-stone-100 to-stone-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ink Wash Effect */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23374151' d='M46.5,-78.3C59.3,-69.8,68.5,-55.5,74.8,-40.4C81.2,-25.2,84.7,-9.2,83.4,6.2C82.1,21.7,76,36.6,66.8,49.4C57.6,62.2,45.4,72.9,31.3,78.2C17.3,83.6,1.5,83.6,-13.8,80.5C-29.1,77.4,-43.8,71.2,-56.5,61.6C-69.2,52,-79.8,39,-84.4,24.1C-89,9.2,-87.6,-7.5,-81.8,-22.2C-76,-36.9,-65.8,-49.5,-52.8,-57.8C-39.9,-66.2,-24.2,-70.3,-8.4,-73.3C7.5,-76.3,33.7,-86.8,46.5,-78.3Z' transform='translate(100 100)' /%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
          backgroundSize: "contain",
        }}
      />

      <div
        className="relative z-10 bg-white/90 backdrop-blur p-8 md:p-12 max-w-2xl w-full border border-stone-300"
        style={{ boxShadow: "8px 8px 0 rgba(120, 113, 108, 0.2)" }}
      >
        {/* Brand with Chinese Aesthetic */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-300">
          <Image
            src="/assets/realsee-logo-en-with-brands-color.svg"
            alt="Realsee"
            width={120}
            height={32}
            className="h-6 w-auto"
          />
          <div className="text-right">
            <span className="text-stone-500 text-xs tracking-widest">
              POINCARÉ
            </span>
            <p className="text-stone-800 text-lg font-serif">如视科技</p>
          </div>
        </div>

        <p className="text-stone-600 text-lg">{greeting}</p>
        <h1 className="text-3xl md:text-4xl font-serif text-stone-800 my-4">
          {status === "ACCEPTED"
            ? t("Invitation.accepted_title")
            : t("Invitation.title")}
        </h1>
        <p className="text-stone-500">{t("Invitation.subtitle")}</p>

        {/* Product Image - Ink Wash Art Display */}
        <div className="relative w-full h-80 md:h-[28rem] my-12 group">
          {/* Outer Minimalist Frame */}
          <div className="absolute inset-0 border border-stone-300 rounded-sm bg-gradient-to-b from-stone-50 via-white to-stone-50">
            {/* Ink Wash Background Texture */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 40%, rgba(0,0,0,0.03) 0%, transparent 50%),
                                 radial-gradient(circle at 70% 60%, rgba(0,0,0,0.02) 0%, transparent 50%)`,
              }}
            />

            {/* Subtle Ink Diffusion Effect */}
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-stone-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-stone-500/5 rounded-full blur-3xl" />

            {/* Product Image with Ink Effect */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/images/poincare/poincare-transparent.png"
                  alt="Poincare Device"
                  fill
                  className="object-contain p-16 hover:scale-105 transition-all duration-1000 filter grayscale contrast-110 hover:grayscale-0"
                  priority
                />
              </div>

              {/* Subtle Ink Splash Accents */}
              <div className="absolute top-8 right-8 w-3 h-3 bg-stone-400/20 rounded-full blur-sm" />
              <div className="absolute top-12 right-12 w-2 h-2 bg-stone-500/15 rounded-full blur-sm" />
              <div className="absolute bottom-8 left-8 w-3 h-3 bg-stone-400/20 rounded-full blur-sm" />
              <div className="absolute bottom-12 left-12 w-2 h-2 bg-stone-500/15 rounded-full blur-sm" />
            </div>

            {/* Traditional Corner Seals */}
            <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-stone-400/40 group-hover:border-stone-500/60 transition-colors duration-500" />
            <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-stone-400/40 group-hover:border-stone-500/60 transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-stone-400/40 group-hover:border-stone-500/60 transition-colors duration-500" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-stone-400/40 group-hover:border-stone-500/60 transition-colors duration-500" />
          </div>

          {/* Calligraphy-inspired Outer Lines */}
          <div className="absolute -inset-2 border border-stone-200 rounded-sm pointer-events-none" />
        </div>

        <div className="border border-stone-300 bg-stone-50 p-6 my-8">
          <p className="text-stone-500 text-sm">
            {t("Invitation.event_time_label")}
          </p>
          <p className="text-2xl text-stone-800 font-serif mt-1">
            {localTime || "..."}
          </p>
          <p className="text-stone-400 text-xs">
            {t("Invitation.event_time_local")}
          </p>
          <div className="mt-6 space-y-2 text-stone-600">
            <p className="flex items-center gap-2">
              <span className="text-stone-400">●</span>{" "}
              {t("Invitation.highlights.item1")}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-stone-400">●</span>{" "}
              {t("Invitation.highlights.item2")}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-stone-400">●</span>{" "}
              {t("Invitation.highlights.item3")}
            </p>
          </div>
        </div>

        {eventEnded && (
          <div className="bg-stone-100 text-stone-500 p-4 mb-6 text-center">
            {t("Invitation.event_ended")}
          </div>
        )}

        {status === "ACCEPTED" && data.discountCode && (
          <div className="bg-stone-800 text-white p-8 mb-8 text-center">
            <p className="text-stone-400 text-sm">
              {t("Invitation.code_label")}
            </p>
            <p className="text-3xl font-serif tracking-widest mt-2">
              {data.discountCode}
            </p>
            {data.meetingLink && (
              <a
                href={data.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 underline mt-4 inline-block"
              >
                {t("Invitation.meeting_link_label")}
              </a>
            )}
          </div>
        )}

        {status === "DECLINED" && (
          <div className="bg-red-50 border border-red-200 p-6 mb-8 text-center">
            <p className="text-red-700">{t("Invitation.declined_title")}</p>
            <p className="text-stone-500 text-sm">
              {t("Invitation.declined_desc")}
            </p>
            {!eventEnded && (
              <button
                onClick={handleReconsider}
                disabled={loading}
                className="text-stone-600 underline mt-4"
              >
                {t("Invitation.reconsider_btn")}
              </button>
            )}
          </div>
        )}

        {(status === "PENDING" || status === "OPENED") && !eventEnded && (
          <div className="flex justify-center mt-8 pt-8 border-t border-stone-300">
            <button
              onClick={handleAccept}
              disabled={loading}
              className="bg-stone-800 hover:bg-stone-700 text-white py-4 px-12 transition-all disabled:opacity-50 min-w-[200px]"
            >
              {t("Invitation.accept_btn")}
            </button>
          </div>
        )}

        {status === "ACCEPTED" && (
          <div className="text-center mt-4">
            <span className="inline-block bg-green-50 text-green-700 border border-green-200 px-6 py-3">
              ✓ {t("Invitation.accepted_desc")}
            </span>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-stone-300 text-center">
          <p className="text-stone-400 text-xs">
            {t("Invitation.footer")} © 2025
          </p>
        </div>
      </div>
    </div>
  );
}
