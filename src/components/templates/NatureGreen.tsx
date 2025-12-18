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
    <div className="min-h-screen bg-gradient-to-b from-[#0a1f0a] to-[#051505] text-white flex flex-col relative overflow-hidden select-none font-sans">
      {/* Background Layer: Full-screen Device with mysterious reveal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Organic leaf pattern simulation */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="leafPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M15 5 Q20 15 15 25 Q10 15 15 5" fill="none" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#leafPattern)" />
          </svg>
        </div>

        {/* Full-screen Device Background - "犹抱琵琶半遮面" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[130%] h-[130%] opacity-10 blur-[2px]">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_0_60px_rgba(34,197,94,0.2)] hue-rotate-[60deg]"
              priority
            />
          </div>
        </div>

        {/* Organic rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[60vh] border border-green-500/10 rounded-[60%_40%_50%_50%]" />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[40vh] bg-green-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[30vh] bg-emerald-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        {/* Main Panel */}
        <div className="w-full max-w-lg bg-[#0a1f0a]/80 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_0_60px_rgba(34,197,94,0.1)]">
          {/* Brand Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-60">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-green-500" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={90}
                height={22}
                className="h-5 w-auto"
              />
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-green-500" />
            </div>

            <p className="text-green-400 text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
              {greeting}
            </p>

            <div className="space-y-2">
              <h1 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-green-200/30 text-[10px] md:text-xs tracking-[0.2em] uppercase">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-xl">
            <div className="text-center">
              <p className="text-green-400/40 text-[9px] uppercase tracking-widest mb-1">
                Sustainable Session
              </p>
              <p className="text-lg md:text-xl font-bold text-white">
                {localTime || "GROWING..."}
              </p>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              {["item1", "item2", "item3"].map((key, i) => (
                <div key={key} className="flex flex-col items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${i === 1 ? "bg-emerald-400" : "bg-green-500"}`} />
                  <span className="text-[8px] text-green-200/50 uppercase tracking-tight text-center leading-tight max-w-[50px]">
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
              containerClassName="bg-green-500/10 border border-green-500/20 p-5 rounded-xl text-center"
              waitingTitleClassName="text-green-400 text-lg font-bold mb-1"
              waitingHintClassName="text-green-200/30 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg"
              codeLabelClassName="text-green-400/40 text-[9px] uppercase tracking-[0.4em] mb-1"
              codeClassName="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200 tracking-[0.2em] py-2"
              meetingLinkClassName="text-green-400 underline mt-3 inline-block text-[11px] hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-black/30 text-green-200/30 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest border border-green-500/10"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold py-4 rounded-xl shadow-xl transition-all text-sm uppercase tracking-wider"
              declineButtonClassName="px-5 border border-green-500/30 text-green-200/50 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 opacity-20 text-center">
          <p className="text-[9px] text-green-200/50 tracking-[0.5em] uppercase">
            {t("Invitation.footer")}
          </p>
        </div>
      </div>
    </div>
  );
}
