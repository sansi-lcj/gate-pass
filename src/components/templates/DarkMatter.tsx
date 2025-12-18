"use client";

import Image from "next/image";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  DeclinedContent,
  EventEndedBanner,
} from "@/components/invitation";
import { InvitationProps } from "./types";
import { useMemo } from "react";

export default function DarkMatter({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

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

  return (
    <div className="h-screen bg-black text-white flex flex-col relative overflow-hidden select-none">
      {/* 1. Background Layer: Star Field & Hero Device */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Star Field */}
        <div className="absolute inset-0">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[1px] bg-white rounded-full animate-pulse"
              style={{
                left: star.left,
                top: star.top,
                opacity: star.opacity,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Nebula Glows */}
        <div className="absolute top-1/4 left-1/4 w-[100vw] h-[60vh] bg-indigo-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[80vw] h-[50vh] bg-violet-900/10 blur-[120px] rounded-full" />

        {/* Hero Device Section */}
        <div className="absolute inset-x-0 top-0 h-[55%] flex items-center justify-center p-12">
          <div className="relative w-full h-full max-w-2xl group transition-all duration-1000">
            {/* Event Horizon Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full animate-[spin_40s_linear_infinite]" />

            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_0_80px_rgba(99,102,241,0.2)] transition-transform duration-[5s] group-hover:scale-110"
              priority
            />

            {/* Cosmic Dust Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-indigo-400 rounded-full blur-[1px] animate-float opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Content Layer: Bottom Glass Panel */}
      <div className="flex-1" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Main Glass Panel */}
        <div className="w-full max-w-3xl bg-gray-950/40 border-t border-white/10 backdrop-blur-3xl rounded-t-[40px] p-6 md:p-10 flex flex-col gap-8 shadow-[0_-30px_100px_rgba(0,0,0,0.9)]">
          {/* Brand & Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={110}
                height={28}
                className="h-6 w-auto"
              />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white" />
            </div>

            <p className="text-gray-400 text-xs md:text-sm tracking-[0.5em] uppercase font-light">
              {greeting}
            </p>

            <div className="space-y-1 px-4">
              <h1 className="text-2xl md:text-5xl font-light text-white tracking-widest leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.3em] uppercase italic font-light">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Row */}
          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="text-center md:text-left">
              <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">
                Celestial Alignment
              </p>
              <p className="text-xl md:text-2xl text-white font-light tracking-tight">
                {localTime || "ASCERTAINING..."}
              </p>
            </div>

            <div className="flex gap-4 md:gap-8 text-[10px] text-gray-400 uppercase tracking-widest font-light">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                <span>{t("Invitation.highlights.item1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
                <span>{t("Invitation.highlights.item2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                <span>{t("Invitation.highlights.item3")}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-white/5 border border-white/10 p-8 rounded-2xl text-center shadow-inner"
              waitingTitleClassName="text-white text-xl font-light mb-1 tracking-widest"
              waitingHintClassName="text-gray-500 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-white text-black font-black py-5 px-8 rounded-xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
              codeLabelClassName="text-gray-500 text-[9px] uppercase tracking-[0.5em] mb-2"
              codeClassName="text-5xl md:text-7xl font-light text-white tracking-[0.2em] py-4"
              meetingLinkClassName="text-indigo-400 underline mt-4 inline-block text-[10px] uppercase tracking-widest hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-white/5 border border-white/5 text-gray-600 p-4 rounded-xl text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-4"
              acceptButtonClassName="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 border border-white/10 text-white font-black py-5 rounded-2xl shadow-xl transition-all text-sm uppercase tracking-[0.3em] hover:from-black hover:to-black"
              declineButtonClassName="px-8 border border-white/5 text-gray-600 hover:text-white rounded-2xl transition-all text-[11px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 opacity-20 text-center">
          <p className="text-[9px] text-gray-500 tracking-[0.8em] uppercase">
            {t("Invitation.footer")} · DARK MATTER VOYAGE
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
