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

export default function DigitalWave({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden select-none font-sans">
      {/* 1. Background Layer: Fluid Waves & Hero Device */}
      <div className="absolute inset-x-0 top-0 h-[60%] z-0 pointer-events-none">
        {/* Animated Liquid Waves (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            stroke="url(#waveGrad)"
            strokeWidth="0.5"
            fill="none"
            className="animate-[wave_8s_ease-in-out_infinite]"
          />
          <path
            d="M0,60 Q25,40 50,60 T100,60"
            stroke="url(#waveGrad)"
            strokeWidth="0.5"
            fill="none"
            className="animate-[wave_12s_ease-in-out_infinite_reverse]"
          />
        </svg>

        {/* Hero Device Section */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative w-full h-full max-w-2xl group transition-all duration-1000">
            {/* Liquid Ripple Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square bg-cyan-500/10 blur-[100px] rounded-full animate-pulse" />

            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_0_60px_rgba(6,182,212,0.4)] transition-transform duration-[4s] group-hover:scale-105"
              priority
            />

            {/* Particle Flow */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-flow"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 8}s`,
                    animationDuration: `${8 + Math.random() * 8}s`,
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
        {/* Main Panel */}
        <div className="w-full max-w-3xl bg-slate-900/40 border-t border-cyan-500/20 backdrop-blur-3xl rounded-t-[40px] p-6 md:p-10 flex flex-col gap-6 shadow-[0_-20px_100px_rgba(6,182,212,0.1)]">
          {/* Brand & Title */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-70">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-cyan-500" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={110}
                height={28}
                className="h-6 w-auto"
              />
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-cyan-500" />
            </div>

            <p className="text-cyan-400 text-xs md:text-sm tracking-[0.4em] uppercase font-bold italic">
              {greeting}
            </p>

            <div className="space-y-2 px-4">
              <h1 className="text-2xl md:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-blue-300 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-slate-500 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold italic">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Bar */}
          <div className="bg-cyan-950/20 border-y border-cyan-500/10 py-6 px-4 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s] ease-in-out" />

            <div>
              <p className="text-cyan-500/40 text-[9px] uppercase tracking-widest mb-1 font-bold">
                Scheduled Access
              </p>
              <p className="text-xl md:text-2xl text-white font-bold tracking-tight">
                {localTime || "INITIALIZING..."}
              </p>
            </div>

            <div className="flex gap-6 md:gap-10">
              {["item1", "item2", "item3"].map((key, i) => (
                <div key={key} className="flex flex-col items-center gap-1">
                  <div className="text-cyan-400/60 font-black text-[10px]">
                    0{i + 1}
                  </div>
                  <span className="text-[9px] text-slate-400 uppercase tracking-tighter text-center leading-[1.1] max-w-[70px]">
                    {t(`Invitation.highlights.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interaction Area */}
          <div className="space-y-4">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-cyan-600/5 border border-cyan-500/20 p-8 rounded-2xl text-center backdrop-blur-md"
              waitingTitleClassName="text-cyan-300 text-xl font-black mb-2 uppercase tracking-widest"
              waitingHintClassName="text-slate-500 text-[10px] uppercase tracking-[0.2em]"
              joinButtonClassName="w-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:to-blue-500 text-white font-black py-5 px-8 rounded-xl transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:scale-[1.01]"
              codeLabelClassName="text-cyan-400/40 text-[9px] uppercase tracking-[0.6em] mb-2"
              codeClassName="text-5xl md:text-7xl font-black text-white tracking-[0.3em] py-4"
              meetingLinkClassName="text-cyan-400 underline mt-4 inline-block text-[11px] hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-white/5 text-slate-600 p-4 rounded-xl text-center text-[10px] uppercase tracking-widest border border-white/5"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-4"
              acceptButtonClassName="flex-1 bg-white text-slate-900 font-black py-5 rounded-2xl shadow-xl hover:bg-cyan-400 transition-all text-sm uppercase tracking-[0.1em]"
              declineButtonClassName="px-8 border border-cyan-500/20 text-slate-500 hover:text-white rounded-2xl transition-all text-[11px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 opacity-30 text-center">
          <p className="text-[9px] text-slate-600 tracking-[0.5em] uppercase">
            {t("Invitation.footer")} · DIGITAL WAVE CORE
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: scaleY(1) translateY(0);
          }
          50% {
            transform: scaleY(1.2) translateY(-5px);
          }
        }
        @keyframes flow {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          20% {
            opacity: 0.4;
          }
          80% {
            opacity: 0.4;
          }
          100% {
            transform: translate(40px, -40px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
