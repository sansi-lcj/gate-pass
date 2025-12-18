"use client";

import Image from "next/image";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  EventEndedBanner,
} from "@/components/invitation";
import { InvitationProps } from "./types";
import { useMemo } from "react";

export default function DarkMatter({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  // Generate stable star positions
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
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden select-none">
      {/* Background Layer: Full-screen Device with mysterious reveal */}
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

        {/* Full-screen Device Background - "犹抱琵琶半遮面" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[140%] h-[140%] opacity-[0.08] blur-[2px]">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_0_80px_rgba(99,102,241,0.2)]"
              priority
            />
          </div>
        </div>

        {/* Event Horizon Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] aspect-square bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full animate-[spin_40s_linear_infinite]" />

        {/* Nebula Glows */}
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[50vh] bg-indigo-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[40vh] bg-violet-900/10 blur-[120px] rounded-full" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        {/* Main Glass Panel */}
        <div className="w-full max-w-lg bg-gray-950/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          {/* Brand & Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-white" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={90}
                height={22}
                className="h-5 w-auto"
              />
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-white" />
            </div>

            <p className="text-gray-400 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">
              {greeting}
            </p>

            <div className="space-y-1 px-2">
              <h1 className="text-xl md:text-3xl font-light text-white tracking-widest leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.2em] uppercase italic font-light">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Row */}
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="text-center">
              <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">
                Celestial Alignment
              </p>
              <p className="text-lg md:text-xl text-white font-light tracking-tight">
                {localTime || "ASCERTAINING..."}
              </p>
            </div>

            <div className="flex justify-center gap-6 mt-4 text-[9px] text-gray-400 uppercase tracking-widest font-light">
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
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-white/5 border border-white/10 p-5 rounded-xl text-center"
              waitingTitleClassName="text-white text-lg font-light mb-1 tracking-widest"
              waitingHintClassName="text-gray-500 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-white text-black font-black py-4 px-6 rounded-lg transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              codeLabelClassName="text-gray-500 text-[9px] uppercase tracking-[0.4em] mb-1"
              codeClassName="text-3xl md:text-4xl font-light text-white tracking-[0.2em] py-2"
              meetingLinkClassName="text-indigo-400 underline mt-3 inline-block text-[10px] uppercase tracking-widest hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-white/5 border border-white/5 text-gray-600 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 border border-white/10 text-white font-black py-4 rounded-xl shadow-xl transition-all text-sm uppercase tracking-[0.2em] hover:from-black hover:to-black"
              declineButtonClassName="px-5 border border-white/5 text-gray-600 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 opacity-20 text-center">
          <p className="text-[9px] text-gray-500 tracking-[0.6em] uppercase">
            {t("Invitation.footer")}
          </p>
        </div>
      </div>
    </div>
  );
}
