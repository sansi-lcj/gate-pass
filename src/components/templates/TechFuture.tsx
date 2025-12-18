"use client";

import Image from "next/image";
import { InvitationProps } from "./types";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  EventEndedBanner,
} from "@/components/invitation";

export default function TechFuture({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden font-mono select-none">
      {/* Background Layer: Full-screen Device with mysterious reveal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* HUD Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Full-screen Device Background - "犹抱琵琶半遮面" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[150%] h-[150%] opacity-20 blur-sm">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_0_100px_rgba(59,130,246,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Circular HUD rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] aspect-square border border-blue-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] aspect-square border border-dashed border-blue-400/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

        {/* Scanning laser effect */}
        <div className="absolute inset-x-0 h-[1px] bg-blue-500/30 animate-[scan_3s_infinite]" />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        {/* Main Glass Panel */}
        <div className="w-full max-w-lg bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          {/* HUD Corner Accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-500/30 rounded-tr-lg" />

          {/* Brand Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="h-[1px] w-8 bg-blue-500" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={80}
                height={20}
                className="h-4 w-auto"
              />
              <div className="h-[1px] w-8 bg-blue-500" />
            </div>

            <p className="text-blue-400 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">
              {greeting}
            </p>

            <div className="space-y-1">
              <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-blue-200/40 text-[10px] md:text-xs tracking-widest uppercase italic">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-blue-500/5 border border-white/5 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/30" />
            <div className="text-center">
              <p className="text-blue-400/40 text-[9px] uppercase tracking-widest mb-1">
                Scheduled Access
              </p>
              <p className="text-lg md:text-xl font-bold font-mono text-white tracking-tight">
                {localTime || "SESSION PENDING"}
              </p>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              {["item1", "item2", "item3"].map((key, i) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-1 opacity-80"
                >
                  <div className="text-blue-500">
                    {i === 0 && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4l3 3" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[8px] text-gray-400 uppercase tracking-tight max-w-[50px] text-center leading-tight">
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
              containerClassName="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center"
              waitingTitleClassName="text-green-400 text-base font-bold mb-1"
              waitingHintClassName="text-green-300/30 text-[9px] uppercase tracking-[0.2em]"
              joinButtonClassName="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 px-6 rounded-lg shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all"
              codeLabelClassName="text-blue-400/40 text-[9px] mb-1 font-mono uppercase tracking-[0.5em]"
              codeClassName="text-3xl md:text-4xl font-black text-white tracking-[0.3em] py-2"
              meetingLinkClassName="inline-block mt-3 text-blue-400 underline text-xs font-mono hover:text-blue-200"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-white/5 border border-white/5 text-gray-500 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-white text-black font-black py-4 px-6 rounded-xl hover:bg-blue-500 hover:text-white transition-all text-sm uppercase tracking-[0.15em] shadow-xl"
              declineButtonClassName="px-5 border border-white/10 text-gray-500 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 opacity-20 flex items-center gap-4">
          <div className="h-[1px] w-6 bg-white/20" />
          <p className="text-[8px] text-gray-400 tracking-[0.6em] uppercase">
            {t("Invitation.footer")}
          </p>
          <div className="h-[1px] w-6 bg-white/20" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          50% { opacity: 0.5; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
