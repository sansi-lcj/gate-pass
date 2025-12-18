"use client";

import Image from "next/image";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  EventEndedBanner,
} from "@/components/invitation";
import { InvitationProps } from "./types";

export default function DigitalWave({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0f1628] to-[#0a0a1a] text-white flex flex-col relative overflow-hidden select-none font-sans">
      {/* Background Layer: Full-screen Device with mysterious reveal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Wave Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.2)" />
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.2)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0.2)" />
              </linearGradient>
            </defs>
            <path
              d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z"
              fill="url(#waveGrad)"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Full-screen Device Background - "犹抱琵琶半遮面" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[130%] h-[130%] opacity-12 blur-[3px]">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_0_60px_rgba(56,189,248,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Flowing Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[60vh] border border-cyan-400/5 rounded-[50%] rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[45vh] border border-indigo-400/5 rounded-[50%] -rotate-12" />

        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[50vw] h-[40vh] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[40vw] h-[30vh] bg-indigo-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        {/* Main Glass Panel */}
        <div className="w-full max-w-lg bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_0_60px_rgba(56,189,248,0.1)]">
          {/* Brand Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-60">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-cyan-400" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={90}
                height={22}
                className="h-5 w-auto"
              />
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-cyan-400" />
            </div>

            <p className="text-cyan-400 text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
              {greeting}
            </p>

            <div className="space-y-2">
              <h1 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-indigo-300 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.2em] uppercase">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-cyan-500/5 border border-cyan-400/10 p-4 rounded-xl">
            <div className="text-center">
              <p className="text-cyan-400/50 text-[9px] uppercase tracking-widest mb-1">
                Event Schedule
              </p>
              <p className="text-lg md:text-xl font-bold text-white">
                {localTime || "SYNCHRONIZING..."}
              </p>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              {["item1", "item2", "item3"].map((key, i) => (
                <div key={key} className="flex flex-col items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                  <span className="text-[8px] text-slate-400 uppercase tracking-tight text-center leading-tight max-w-[50px]">
                    {t(`Invitation.highlights.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-cyan-500/10 border border-cyan-400/20 p-5 rounded-xl text-center"
              waitingTitleClassName="text-cyan-400 text-lg font-bold mb-1"
              waitingHintClassName="text-slate-500 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg"
              codeLabelClassName="text-cyan-400/50 text-[9px] uppercase tracking-[0.4em] mb-1"
              codeClassName="text-3xl md:text-4xl font-bold text-white tracking-[0.2em] py-2"
              meetingLinkClassName="text-cyan-400 underline mt-3 inline-block text-[11px] hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-slate-800/50 text-slate-500 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-cyan-500/20 transition-all text-sm uppercase tracking-wider"
              declineButtonClassName="px-5 border border-slate-600 text-slate-500 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 opacity-30 text-center">
          <p className="text-[9px] text-slate-500 tracking-[0.5em] uppercase">
            {t("Invitation.footer")}
          </p>
        </div>
      </div>
    </div>
  );
}
