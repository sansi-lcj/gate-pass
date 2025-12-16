"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { respondInvitation } from "@/app/invite/[uniqueToken]/action";
import { useTranslation } from "react-i18next";
import { InvitationProps, formatLocalTime, isEventEnded } from "./types";

export default function NatureGreen({ data }: InvitationProps) {
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Leaf Pattern */}
      <svg
        className="absolute bottom-0 left-0 w-32 h-32 text-green-200 opacity-50"
        viewBox="0 0 100 100"
      >
        <path
          fill="currentColor"
          d="M50,10 Q80,30 80,60 Q80,90 50,90 Q20,90 20,60 Q20,30 50,10"
        />
      </svg>
      <svg
        className="absolute top-20 right-10 w-24 h-24 text-emerald-200 opacity-40 rotate-45"
        viewBox="0 0 100 100"
      >
        <path
          fill="currentColor"
          d="M50,10 Q80,30 80,60 Q80,90 50,90 Q20,90 20,60 Q20,30 50,10"
        />
      </svg>

      <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl w-full border-l-4 border-green-500">
        <div className="flex items-center justify-between mb-8">
          <Image
            src="/assets/realsee-logo-en-with-brands-color.svg"
            alt="Realsee"
            width={120}
            height={32}
            className="h-6 w-auto"
          />
          <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs">
            🌿 POINCARÉ
          </span>
        </div>

        <p className="text-green-600 text-lg">{greeting}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 my-4">
          {status === "ACCEPTED"
            ? t("Invitation.accepted_title")
            : t("Invitation.title")}
        </h1>
        <p className="text-gray-500">{t("Invitation.subtitle")}</p>

        {/* Product Image - Nature Green Showcase */}
        <div className="relative w-full h-80 md:h-96 my-10">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 border-2 border-green-200 rounded-2xl overflow-hidden shadow-xl">
            {/* Organic Patterns */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 40%),
                  radial-gradient(circle at 80% 70%, rgba(132, 204, 22, 0.3) 0%, transparent 40%),
                  radial-gradient(circle at 50% 50%, rgba(22, 163, 74, 0.2) 0%, transparent 50%)
                `,
              }}
            />

            {/* Soft Green Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-green-300/20 blur-[100px] rounded-full animate-pulse" />

            {/* Product Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/images/poincare/poincare-transparent.png"
                alt="Poincare Device"
                fill
                className="object-contain p-14 hover:scale-110 transition-all duration-1000 drop-shadow-[0_10px_40px_rgba(34,197,94,0.3)] filter brightness-105"
                priority
              />
            </div>

            {/* Botanical Corner Elements */}
            <div className="absolute top-6 left-6 w-10 h-10 border-l-3 border-t-3 border-green-400/60 rounded-tl-lg" />
            <div className="absolute top-6 right-6 w-10 h-10 border-r-3 border-t-3 border-green-400/60 rounded-tr-lg" />
            <div className="absolute bottom-6 left-6 w-10 h-10 border-l-3 border-b-3 border-green-400/60 rounded-bl-lg" />
            <div className="absolute bottom-6 right-6 w-10 h-10 border-r-3 border-b-3 border-green-400/60 rounded-br-lg" />
          </div>

          {/* Outer Natural Glow */}
          <div className="absolute -inset-1 bg-green-200/40 rounded-2xl blur-sm -z-10" />
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 my-8">
          <p className="text-green-700 text-sm">
            {t("Invitation.event_time_label")}
          </p>
          <p className="text-2xl text-gray-800 font-medium mt-1">
            {localTime || "..."}
          </p>
          <p className="text-gray-400 text-xs">
            {t("Invitation.event_time_local")}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              🌱 {t("Invitation.highlights.item1")}
            </span>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
              💚 {t("Invitation.highlights.item2")}
            </span>
            <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
              🌿 {t("Invitation.highlights.item3")}
            </span>
          </div>
        </div>

        {eventEnded && (
          <div className="bg-gray-100 text-gray-500 p-4 rounded-xl mb-6 text-center">
            {t("Invitation.event_ended")}
          </div>
        )}

        {status === "ACCEPTED" && data.discountCode && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-8 mb-8 text-center">
            <p className="text-green-100 text-sm">
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
                className="text-green-100 underline mt-4 inline-block"
              >
                {t("Invitation.meeting_link_label")}
              </a>
            )}
          </div>
        )}

        {status === "DECLINED" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 text-center">
            <p className="text-red-600">{t("Invitation.declined_title")}</p>
            <p className="text-gray-500 text-sm">
              {t("Invitation.declined_desc")}
            </p>
            {!eventEnded && (
              <button
                onClick={handleReconsider}
                disabled={loading}
                className="text-green-600 underline mt-4"
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
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-12 rounded-full transition-all shadow-lg disabled:opacity-50 min-w-[200px]"
            >
              {t("Invitation.accept_btn")}
            </button>
          </div>
        )}

        {status === "ACCEPTED" && (
          <div className="text-center mt-4">
            <span className="inline-block bg-green-100 text-green-600 font-bold px-6 py-3 rounded-full">
              🌿 {t("Invitation.accepted_desc")}
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
