"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { respondInvitation } from "@/app/invite/[uniqueToken]/action";
import { useTranslation } from "react-i18next";
import { InvitationProps, formatLocalTime, isEventEnded } from "./types";

export default function Executive({ data }: InvitationProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-2xl bg-white shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 md:p-12 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Image
              src="/assets/realsee-logo-en-with-brands-wihte.svg"
              alt="Realsee"
              width={120}
              height={32}
              className="h-6 w-auto"
            />
            <div className="h-4 w-px bg-slate-600"></div>
            <span className="text-slate-400 text-xs tracking-[0.2em]">
              POINCARÉ
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-serif text-white mb-3">
            {status === "ACCEPTED"
              ? t("Invitation.accepted_title")
              : t("Invitation.title")}
          </h1>
          <p className="text-slate-400 font-light italic">
            {t("Invitation.subtitle")}
          </p>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-64 bg-slate-50 border-b border-slate-200">
          <Image
            src="/images/poincare/poincare-transparent.png"
            alt="Poincaré Device"
            fill
            className="object-contain p-8 hover:scale-105 transition-transform duration-700 mixture-multiply"
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 flex-1 bg-white relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg whitespace-nowrap">
            {t("Invitation.greeting", { name: data.guestName })}
          </div>

          {/* Event Details */}
          <div className="mt-8 border border-slate-200 p-6 bg-slate-50">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
              {t("Invitation.event_time_label")}
            </p>
            <p className="text-xl font-serif text-slate-900">
              {localTime || "Calculating..."}
            </p>
            <p className="text-slate-400 text-xs text-right mt-1">
              {t("Invitation.event_time_local")}
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-amber-600 mt-1">✦</span>
              <p className="text-slate-600">
                {t("Invitation.highlights.item1")}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-amber-600 mt-1">✦</span>
              <p className="text-slate-600">
                {t("Invitation.highlights.item2")}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-amber-600 mt-1">✦</span>
              <p className="text-slate-600">
                {t("Invitation.highlights.item3")}
              </p>
            </div>
          </div>

          {/* Event Ended Banner */}
          {eventEnded && (
            <div className="mt-8 bg-slate-100 text-slate-500 p-4 text-center border border-slate-200 font-serif italic">
              {t("Invitation.event_ended")}
            </div>
          )}

          {/* Benefits / Code Section */}
          {status === "ACCEPTED" && data.discountCode && (
            <div className="mt-8 bg-amber-50 border border-amber-200 p-6 text-center">
              <p className="text-amber-800 text-sm mb-2 font-serif italic">
                {t("Invitation.code_label")}
              </p>
              <p className="text-3xl font-mono font-bold text-slate-900 tracking-widest">
                {data.discountCode}
              </p>
              {data.meetingLink && (
                <a
                  href={data.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-amber-700 hover:text-amber-900 underline font-serif italic"
                >
                  {t("Invitation.meeting_link_label")} →
                </a>
              )}
            </div>
          )}

          {/* Declined State */}
          {status === "DECLINED" && (
            <div className="mt-8 bg-red-50 border border-red-100 p-6 text-center">
              <p className="text-red-800 font-serif mb-2">
                {t("Invitation.declined_title")}
              </p>
              <p className="text-slate-500 text-sm italic">
                {t("Invitation.declined_desc")}
              </p>
              {!eventEnded && (
                <button
                  onClick={handleReconsider}
                  disabled={loading}
                  className="mt-4 text-slate-600 hover:text-slate-900 underline text-sm"
                >
                  {t("Invitation.reconsider_btn")}
                </button>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {(status === "PENDING" || status === "OPENED") && !eventEnded && (
            <div className="flex justify-center mt-10 border-t border-slate-100 pt-8">
              <button
                onClick={handleAccept}
                disabled={loading}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 px-12 transition-all hover:shadow-lg disabled:opacity-50 min-w-[200px]"
              >
                {t("Invitation.accept_btn")}
              </button>
            </div>
          )}

          {/* Accepted Badge */}
          {status === "ACCEPTED" && (
            <div className="text-center mt-8">
              <span className="inline-block text-green-700 font-serif italic border-b-2 border-green-200 pb-1">
                ✓ {t("Invitation.accepted_desc")}
              </span>
            </div>
          )}

          <div className="mt-12 text-center">
            <Image
              src="/assets/realsee-logo-en-with-brands-color.svg"
              alt="Realsee"
              width={80}
              height={20}
              className="h-4 w-auto mx-auto opacity-30"
            />
            <p className="text-slate-300 text-[10px] mt-2 tracking-widest">
              {t("Invitation.footer")} © 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
