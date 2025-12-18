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

export default function CyberGrid({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="h-screen bg-black text-white flex flex-col relative overflow-hidden select-none font-mono">
      {/* 1. Background Layer: Cyber HUD & Hero Device */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Perspectival Cyber Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(168, 85, 247, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            transform: "perspective(1000px) rotateX(45deg) translateY(-20%)",
            transformOrigin: "center top",
          }}
        />

        {/* Glows */}
        <div className="absolute top-1/4 left-1/4 w-[80vw] h-[60vh] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[50vh] bg-fuchsia-600/5 blur-[120px] rounded-full" />

        {/* Hero Device Section */}
        <div className="absolute inset-x-0 top-0 h-[55%] flex items-center justify-center p-12">
          <div className="relative w-full h-full max-w-2xl group transition-all duration-1000">
            {/* Dynamic Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square border-2 border-purple-500/10 rounded-full animate-[spin_30s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square border border-dashed border-fuchsia-400/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_0_60px_rgba(168,85,247,0.3)] transition-transform duration-[4s] group-hover:scale-110"
              priority
            />

            {/* Scanlines Overlay on Device */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(168,85,247,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_4s_linear_infinite]" />
          </div>
        </div>
      </div>

      {/* 2. Content Layer: Bottom Glass Panel */}
      <div className="flex-1" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Main Panel */}
        <div className="w-full max-w-3xl bg-black/40 border-t border-purple-500/30 backdrop-blur-3xl rounded-t-[40px] p-6 md:p-10 flex flex-col gap-8 shadow-[0_-20px_100px_rgba(168,85,247,0.15)] overflow-hidden">
          {/* HUD Accents */}
          <div className="absolute top-4 left-4 w-12 h-1 border-l-2 border-t-2 border-purple-500/50" />
          <div className="absolute top-4 right-4 w-12 h-1 border-r-2 border-t-2 border-fuchsia-500/50" />

          {/* Title Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-70">
              <div className="h-[1px] w-8 bg-purple-500/50" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={110}
                height={28}
                className="h-6 w-auto"
              />
              <div className="h-[1px] w-8 bg-purple-500/50" />
            </div>

            <p className="text-purple-400 text-xs md:text-sm tracking-[0.4em] uppercase font-bold animate-pulse">
              {greeting}
            </p>

            <div className="space-y-2 px-4">
              <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-fuchsia-400 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-stone-500 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-purple-900/10 border border-purple-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="text-center md:text-left">
              <p className="text-purple-400/40 text-[9px] uppercase tracking-widest mb-1">
                Authorization Time
              </p>
              <p className="text-xl md:text-3xl font-black text-white tracking-widest">
                {localTime || "ENCRYPTING..."}
              </p>
            </div>

            <div className="flex gap-6 md:gap-10">
              {["item1", "item2", "item3"].map((key, i) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-2 group/icon"
                >
                  <div className="text-purple-400 group-hover/icon:text-fuchsia-400 transition-colors">
                    {i === 0 && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M12 8v8M8 12h8" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[8px] text-stone-500 uppercase tracking-tighter text-center leading-[1.1] max-w-[64px]">
                    {t(`Invitation.highlights.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-4">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-purple-600/10 border border-purple-500/30 p-8 rounded-2xl text-center shadow-[0_0_40px_rgba(168,85,247,0.1)]"
              waitingTitleClassName="text-purple-400 text-xl font-black mb-2 uppercase tracking-widest"
              waitingHintClassName="text-stone-500 text-[10px] uppercase tracking-[0.2em]"
              joinButtonClassName="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:to-fuchsia-500 text-white font-black py-5 px-8 rounded-xl transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)]"
              codeLabelClassName="text-purple-400/40 text-[9px] uppercase tracking-[0.5em] mb-2"
              codeClassName="text-5xl md:text-7xl font-black text-white tracking-[0.2em] py-4"
              meetingLinkClassName="text-purple-400 underline mt-4 inline-block text-[11px] hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-white/5 border border-white/5 text-stone-600 p-4 rounded-xl text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-4"
              acceptButtonClassName="flex-1 bg-white text-black font-black py-5 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-purple-600 hover:text-white transition-all text-sm uppercase tracking-[0.2em]"
              declineButtonClassName="px-8 border border-purple-500/30 text-stone-600 hover:text-white rounded-2xl transition-all text-[11px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 opacity-30 text-center">
          <p className="text-[9px] text-stone-600 tracking-[0.6em] uppercase">
            {t("Invitation.footer")} · CYBER GRID INTERFACE
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 0 100%;
          }
        }
      `}</style>
    </div>
  );
}
