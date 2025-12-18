"use client";

import Image from "next/image";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  EventEndedBanner,
} from "@/components/invitation";
import { InvitationProps } from "./types";

export default function NatureGreen({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="h-screen bg-[#F7F9F7] text-emerald-900 flex flex-col relative overflow-hidden select-none">
      {/* 1. Background Layer: Large Device + Organic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Ambient Sunlight & Foliage Glows */}
        <div className="absolute top-0 right-0 w-[80vw] h-[60vh] bg-yellow-100/30 blur-[120px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-[60vw] h-[60vh] bg-emerald-100/40 blur-[100px] rounded-full" />

        {/* Hero Device Section (Top Half) */}
        <div className="absolute inset-x-0 top-0 h-[55%] flex items-center justify-center p-12">
          <div className="relative w-full h-full max-w-2xl transition-transform duration-[3s] group hover:scale-110">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter saturate-[0.9] contrast-[1.05] drop-shadow-[0_20px_50px_rgba(16,185,129,0.1)]"
              priority
            />

            {/* Floating Leaves (SVG) */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float opacity-30"
                  style={{
                    top: `${10 + Math.random() * 80}%`,
                    left: `${-10 + Math.random() * 110}%`,
                    animationDelay: `${i * 1.5}s`,
                    animationDuration: `${12 + Math.random() * 8}s`,
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-emerald-400"
                  >
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L5.66,22C8.32,15.19 12.03,11.81 17,11.5V15L21,10L17,5V8Z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Content Layer: Bottom Glass Panel */}
      <div className="flex-1" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Glass Content Panel */}
        <div className="w-full max-w-2xl bg-white/40 border-t border-emerald-100 backdrop-blur-3xl rounded-t-[40px] p-6 md:p-10 flex flex-col gap-8 shadow-[0_-20px_60px_rgba(6,78,59,0.08)]">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="h-[1px] w-10 bg-emerald-600/30" />
              <Image
                src="/assets/realsee-logo-en-with-brands-black.svg"
                alt="Realsee"
                width={100}
                height={26}
                className="h-5 w-auto"
              />
              <div className="h-[1px] w-10 bg-emerald-600/30" />
            </div>

            <p className="text-emerald-700/60 text-xs md:text-sm tracking-[0.3em] uppercase font-medium">
              {greeting}
            </p>

            <div className="space-y-1 px-4">
              <h1 className="text-2xl md:text-4xl font-bold text-emerald-950 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-emerald-600/50 text-[10px] md:text-xs tracking-widest uppercase italic font-light">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-emerald-500/5 border border-emerald-600/10 rounded-2xl p-6 text-center space-y-4">
            <div>
              <p className="text-emerald-600/40 text-[9px] uppercase tracking-widest mb-1">
                Time & Venue
              </p>
              <p className="text-xl md:text-2xl text-emerald-800 font-semibold tracking-tight">
                {localTime || "PREPARING EVENT"}
              </p>
            </div>

            <div className="flex justify-center gap-6 px-4 pt-4 border-t border-emerald-900/5 text-[10px] text-emerald-700/50 uppercase tracking-[0.1em] font-medium">
              <div className="flex items-center gap-2">
                <svg
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  className="fill-emerald-400"
                >
                  <circle cx="3" cy="3" r="3" />
                </svg>
                <span>{t("Invitation.highlights.item1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  className="fill-emerald-400"
                >
                  <circle cx="3" cy="3" r="3" />
                </svg>
                <span>{t("Invitation.highlights.item2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  className="fill-emerald-400"
                >
                  <circle cx="3" cy="3" r="3" />
                </svg>
                <span>{t("Invitation.highlights.item3")}</span>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-4">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-emerald-600/5 border border-emerald-600/10 p-6 rounded-2xl text-center shadow-sm"
              waitingTitleClassName="text-emerald-800 text-lg font-bold mb-1"
              waitingHintClassName="text-emerald-600/40 text-[9px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-emerald-900/10 transition-all"
              codeLabelClassName="text-emerald-700/30 text-[9px] uppercase tracking-[0.3em] mb-2"
              codeClassName="text-5xl md:text-6xl font-black text-emerald-950 tracking-[0.2em] py-2"
              meetingLinkClassName="text-emerald-600 underline mt-4 inline-block text-xs hover:text-emerald-400"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-emerald-50 text-emerald-300 p-4 rounded-xl text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-4"
              acceptButtonClassName="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl text-sm uppercase tracking-widest"
              declineButtonClassName="px-8 border border-emerald-200 text-emerald-400 hover:text-emerald-600 rounded-2xl transition-all text-[11px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 opacity-30 text-center">
          <p className="text-[9px] text-emerald-800/60 tracking-[0.5em] uppercase">
            {t("Invitation.footer")} · NATURE GREEN
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-30px) rotate(15deg);
          }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
