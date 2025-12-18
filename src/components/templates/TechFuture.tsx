"use client";

import { useMemo } from "react";
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
    <div className="h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden font-mono select-none">
      {/* 1. Background Layer: Global HUD & Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* 2. Top Hero Section: Large Device + Scanners */}
      <div className="flex-1 relative flex items-center justify-center p-8 group transition-all duration-700">
        <div className="relative w-full h-full max-w-2xl animate-[fadeIn_1s_ease-out]">
          {/* Circular HUD Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square border border-blue-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square border border-dashed border-blue-400/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

          <Image
            src="/images/poincare/poincare-transparent.png"
            alt="Poincare Device"
            fill
            className="object-contain filter drop-shadow-[0_0_80px_rgba(59,130,246,0.2)] transition-transform duration-[3s] group-hover:scale-110"
            priority
          />

          {/* Dynamic Laser Scanners */}
          <div className="absolute inset-x-0 h-[1px] bg-blue-500/30 animate-[scan_3s_infinite]" />

          {/* HUD Interface elements (No Emojis) */}
          <div className="absolute top-0 right-0 p-4 border-r border-t border-blue-500/30 rounded-tr-xl">
            <div className="text-[8px] text-blue-400/60 uppercase tracking-widest mb-1">
              Status: Operational
            </div>
            <div className="w-12 h-1 bg-blue-500/20">
              <div className="w-2/3 h-full bg-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Content Section: Glass Panels */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Main Glass Panel */}
        <div className="w-full max-w-2xl bg-white/[0.02] border-t border-white/10 backdrop-blur-3xl rounded-t-[40px] p-6 md:p-10 flex flex-col gap-6 shadow-[0_-20px_60px_rgba(0,0,0,0.9)] transition-transform duration-500 transform translate-y-2 hover:translate-y-0">
          {/* Split Title / Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 mb-2 opacity-50">
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

            <p className="text-blue-400 text-[10px] md:text-sm tracking-[0.4em] uppercase font-light">
              {greeting}
            </p>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-blue-200/40 text-[10px] md:text-sm tracking-widest uppercase italic">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Bar */}
          <div className="bg-blue-500/5 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/30" />
            <div className="text-center md:text-left">
              <p className="text-blue-400/40 text-[9px] uppercase tracking-widest mb-1">
                Scheduled Access
              </p>
              <p className="text-xl md:text-3xl font-bold font-mono text-white tracking-tighter">
                {localTime || "SESSION PENDING"}
              </p>
            </div>

            <div className="flex gap-4 md:gap-8">
              {["item1", "item2", "item3"].map((key, i) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="text-blue-500">
                    {i === 0 && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4l3 3" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[8px] text-gray-400 uppercase tracking-tighter max-w-[60px] text-center leading-[1.1]">
                    {t(`Invitation.highlights.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User Interaction Area */}
          <div className="space-y-4">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl text-center"
              waitingTitleClassName="text-green-400 text-lg font-bold mb-1"
              waitingHintClassName="text-green-300/30 text-[9px] uppercase tracking-[0.2em]"
              joinButtonClassName="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-8 rounded-xl shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all hover:translate-y-[-2px]"
              codeLabelClassName="text-blue-400/40 text-[9px] mb-2 font-mono uppercase tracking-[0.5em]"
              codeClassName="text-5xl md:text-6xl font-black text-white tracking-[0.3em] py-2"
              meetingLinkClassName="inline-block mt-4 text-blue-400 underline text-xs font-mono hover:text-blue-200"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-white/5 border border-white/5 text-gray-500 p-4 rounded-xl text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-4"
              acceptButtonClassName="flex-1 bg-white text-black font-black py-5 px-8 rounded-2xl hover:bg-blue-500 hover:text-white transition-all text-sm uppercase tracking-[0.2em] shadow-xl"
              declineButtonClassName="px-6 border border-white/10 text-gray-500 hover:text-white rounded-2xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer Link / Info */}
        <div className="py-4 opacity-20 flex items-center gap-4">
          <div className="h-[1px] w-8 bg-white/20" />
          <p className="text-[8px] text-gray-400 tracking-[0.8em] uppercase">
            {t("Invitation.footer")}
          </p>
          <div className="h-[1px] w-8 bg-white/20" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 10%;
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            top: 90%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
