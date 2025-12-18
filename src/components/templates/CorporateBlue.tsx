"use client";

import Image from "next/image";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  EventEndedBanner,
} from "@/components/invitation";
import { InvitationProps } from "./types";

export default function CorporateBlue({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#1a365d] text-white flex flex-col relative overflow-hidden select-none font-sans">
      {/* Background Layer: Full-screen Device with mysterious reveal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Full-screen Device Background - "犹抱琵琶半遮面" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[130%] h-[130%] opacity-10 blur-[2px]">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_0_80px_rgba(59,130,246,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Corporate accent lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] border border-blue-400/10 rounded-lg" />

        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-blue-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-blue-600/5 blur-[80px] rounded-full" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        {/* Main Panel */}
        <div className="w-full max-w-lg bg-[#0d2137]/80 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Brand Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-60">
              <div className="h-[2px] w-10 bg-blue-400" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={100}
                height={25}
                className="h-5 w-auto"
              />
              <div className="h-[2px] w-10 bg-blue-400" />
            </div>

            <p className="text-blue-300 text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
              {greeting}
            </p>

            <div className="space-y-1">
              <h1 className="text-xl md:text-3xl font-bold text-white leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-blue-200/50 text-[10px] md:text-xs tracking-[0.2em] uppercase">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-blue-900/30 border border-blue-400/10 p-4 rounded-xl">
            <div className="text-center">
              <p className="text-blue-300/50 text-[9px] uppercase tracking-widest mb-1">
                Scheduled Meeting
              </p>
              <p className="text-lg md:text-xl font-bold text-white">
                {localTime || "TO BE CONFIRMED"}
              </p>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              {["item1", "item2", "item3"].map((key, i) => (
                <div key={key} className="flex flex-col items-center gap-1.5">
                  <div className="text-blue-400">
                    {i === 0 && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[8px] text-blue-200/60 uppercase tracking-tight text-center leading-tight max-w-[50px]">
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
              containerClassName="bg-blue-900/40 border border-blue-400/20 p-5 rounded-xl text-center"
              waitingTitleClassName="text-blue-300 text-lg font-bold mb-1"
              waitingHintClassName="text-blue-200/40 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg"
              codeLabelClassName="text-blue-300/40 text-[9px] uppercase tracking-[0.4em] mb-1"
              codeClassName="text-3xl md:text-4xl font-bold text-white tracking-[0.2em] py-2"
              meetingLinkClassName="text-blue-400 underline mt-3 inline-block text-[11px] hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-blue-900/20 text-blue-300/50 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-xl transition-all text-sm uppercase tracking-wider"
              declineButtonClassName="px-5 border border-blue-400/30 text-blue-300/60 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 opacity-30 text-center">
          <p className="text-[9px] text-blue-200/50 tracking-[0.5em] uppercase">
            {t("Invitation.footer")}
          </p>
        </div>
      </div>
    </div>
  );
}
