"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { respondInvitation } from "@/app/invite/[uniqueToken]/action";
import { useTranslation } from "react-i18next";
import { InvitationProps, formatLocalTime, isEventEnded } from "./types";

export default function MinimalWhite({ data }: InvitationProps) {
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-xl bg-white p-8 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
        <div className="text-center mb-12">
          <div className="inline-block mb-8">
            <Image
              src="/assets/realsee-logo-en-with-brands-color.svg"
              alt="Realsee"
              width={100}
              height={28}
              className="h-6 w-auto opacity-80"
            />
          </div>

          <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-4">
            {t("Invitation.subtitle")}
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide">
            {status === "ACCEPTED"
              ? t("Invitation.accepted_title")
              : t("Invitation.title")}
          </h1>
          <div className="w-12 h-0.5 bg-gray-200 mx-auto"></div>
        </div>

        {/* Product Image - Minimalist Showcase */}
        <div className="relative w-full h-80 md:h-[32rem] my-12 group">
          <div className="absolute inset-0 bg-white border border-gray-200 shadow-lg">
            {/* Ultra-subtle Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 via-white to-gray-50/30" />

            {/* Product Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/images/poincare/poincare-transparent.png"
                alt="Poincare Device"
                fill
                className="object-contain p-20 hover:scale-105 transition-all duration-1000 filter grayscale hover:grayscale-0 drop-shadow-xl"
                priority
              />
            </div>

            {/* Minimal Corner Dots */}
            <div className="absolute top-8 left-8 w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-gray-400 rounded-full" />
          </div>
        </div>

        <div className="space-y-8 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest">
            {t("Invitation.event_time_label")}
          </p>
          <p className="text-2xl text-gray-900 font-light mt-2">
            {localTime || "..."}
          </p>
          <p className="text-gray-300 text-xs mt-1">
            {t("Invitation.event_time_local")}
          </p>
        </div>

        <div className="flex justify-center gap-8 text-gray-500 text-sm mb-16">
          <span>{t("Invitation.highlights.item1")}</span>
          <span>{t("Invitation.highlights.item2")}</span>
          <span>{t("Invitation.highlights.item3")}</span>
        </div>

        {eventEnded && (
          <div className="bg-gray-50 text-gray-400 p-4 mb-8 text-center">
            {t("Invitation.event_ended")}
          </div>
        )}

        {status === "ACCEPTED" && data.discountCode && (
          <div className="border border-gray-200 p-8 mb-8 text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest">
              {t("Invitation.code_label")}
            </p>
            <p className="text-3xl font-light text-gray-900 tracking-[0.2em] mt-4">
              {data.discountCode}
            </p>
            {data.meetingLink && (
              <a
                href={data.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 underline mt-6 inline-block text-sm"
              >
                {t("Invitation.meeting_link_label")}
              </a>
            )}
          </div>
        )}

        {status === "DECLINED" && (
          <div className="border border-gray-200 p-6 mb-8 text-center">
            <p className="text-gray-600">{t("Invitation.declined_title")}</p>
            <p className="text-gray-400 text-sm mt-2">
              {t("Invitation.declined_desc")}
            </p>
            {!eventEnded && (
              <button
                onClick={handleReconsider}
                disabled={loading}
                className="text-gray-500 underline mt-4 text-sm"
              >
                {t("Invitation.reconsider_btn")}
              </button>
            )}
          </div>
        )}

        {/* [6] Action Buttons */}
        {(status === "PENDING" || status === "OPENED") && !eventEnded && (
          <div className="flex justify-center mt-12 pt-8 border-t border-gray-100">
            <button
              onClick={handleAccept}
              disabled={loading}
              className="bg-black text-white hover:bg-gray-800 font-medium py-3 px-12 transition-colors duration-300 w-full md:w-auto text-sm tracking-mid"
            >
              {t("Invitation.accept_btn")}
            </button>
          </div>
        )}

        {status === "ACCEPTED" && (
          <div className="text-center mt-8">
            <span className="inline-block text-green-600 text-sm">
              ✓ {t("Invitation.accepted_desc")}
            </span>
          </div>
        )}

        <div className="mt-20 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-300 text-xs">
            {t("Invitation.footer")} © 2025
          </p>
        </div>
      </div>
    </div>
  );
}
