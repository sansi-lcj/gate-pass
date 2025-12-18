"use client";

import Image from "next/image";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  EventEndedBanner,
} from "@/components/invitation";
import { InvitationProps } from "./types";

export default function LuxuryGold({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] text-white flex flex-col relative overflow-hidden select-none font-serif">
      {/* Background Layer: Full-screen Device with mysterious reveal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gold particle effect simulation */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
                animationDelay: `${i * 0.2}s`,
                opacity: 0.3 + (i % 5) * 0.1,
              }}
            />
          ))}
        </div>

        {/* Full-screen Device Background - "犹抱琵琶半遮面" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[140%] h-[140%] opacity-10 blur-[1px]">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_0_60px_rgba(251,191,36,0.2)] sepia-[0.3]"
              priority
            />
          </div>
        </div>

        {/* Luxury ornamental ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] border border-amber-500/10 rounded-full" />

        {/* Ambient gold glows */}
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[40vh] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[30vh] bg-amber-600/5 blur-[100px] rounded-full" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        {/* Main Panel */}
        <div className="w-full max-w-lg bg-black/60 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_0_60px_rgba(251,191,36,0.1)]">
          {/* Gold corner ornaments */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-500/50" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-500/50" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-500/50" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-500/50" />

          {/* Brand Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-60">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-amber-500" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={90}
                height={22}
                className="h-5 w-auto"
              />
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-amber-500" />
            </div>

            <p className="text-amber-400 text-[10px] md:text-xs tracking-[0.5em] uppercase font-light">
              {greeting}
            </p>

            <div className="space-y-2">
              <h1 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-amber-200/30 text-[10px] md:text-xs tracking-[0.3em] uppercase">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl">
            <div className="text-center">
              <p className="text-amber-400/40 text-[9px] uppercase tracking-widest mb-1">
                Exclusive Engagement
              </p>
              <p className="text-lg md:text-xl font-bold text-white">
                {localTime || "PREPARING..."}
              </p>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              {["item1", "item2", "item3"].map((key) => (
                <div key={key} className="flex flex-col items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-amber-500 rotate-45" />
                  <span className="text-[8px] text-amber-200/50 uppercase tracking-tight text-center leading-tight max-w-[50px]">
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
              containerClassName="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl text-center"
              waitingTitleClassName="text-amber-400 text-lg font-bold mb-1"
              waitingHintClassName="text-amber-200/30 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold py-4 px-6 rounded-lg transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)]"
              codeLabelClassName="text-amber-400/40 text-[9px] uppercase tracking-[0.4em] mb-1"
              codeClassName="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100 tracking-[0.2em] py-2"
              meetingLinkClassName="text-amber-400 underline mt-3 inline-block text-[11px] hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-black/40 text-amber-200/30 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest border border-amber-500/10"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold py-4 rounded-xl shadow-xl transition-all text-sm uppercase tracking-wider"
              declineButtonClassName="px-5 border border-amber-500/30 text-amber-200/50 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 opacity-20 text-center">
          <p className="text-[9px] text-amber-200/50 tracking-[0.6em] uppercase">
            {t("Invitation.footer")}
          </p>
        </div>
      </div>
    </div>
  );
}
