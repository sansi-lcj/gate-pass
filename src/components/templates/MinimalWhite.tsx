"use client";

import Image from "next/image";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  EventEndedBanner,
} from "@/components/invitation";
import { InvitationProps } from "./types";

export default function MinimalWhite({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative overflow-hidden select-none font-sans">
      {/* Background Layer: Full-screen Device with mysterious reveal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Gradient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[50vh] bg-gradient-to-b from-white to-transparent blur-[100px] opacity-60" />

        {/* Full-screen Device Background - "犹抱琵琶半遮面" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[130%] h-[130%] opacity-[0.04]">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
              priority
            />
          </div>
        </div>

        {/* Minimal Frame Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh]">
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-slate-200" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-slate-200" />
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        {/* Main Panel */}
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_10px_60px_rgba(0,0,0,0.04)]">
          {/* Brand & Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-30">
              <div className="h-[1px] w-10 bg-slate-300" />
              <Image
                src="/assets/realsee-logo-en-with-brands-color.svg"
                alt="Realsee"
                width={90}
                height={22}
                className="h-5 w-auto grayscale"
              />
              <div className="h-[1px] w-10 bg-slate-300" />
            </div>

            <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">
              {greeting}
            </p>

            <div className="space-y-1 px-4">
              <h1 className="text-xl md:text-3xl font-extralight uppercase tracking-tight text-slate-900 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.3em] uppercase font-light">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Row */}
          <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-xl">
            <div className="text-center">
              <p className="text-slate-400 text-[9px] uppercase tracking-widest mb-1 font-medium">
                Scheduled Event
              </p>
              <p className="text-lg md:text-xl font-light text-slate-800 tracking-tight">
                {localTime || "ASCERTAINING..."}
              </p>
            </div>

            <div className="flex justify-center gap-8 mt-4">
              {["item1", "item2", "item3"].map((key) => (
                <div key={key} className="flex flex-col items-center gap-1.5 group/icon">
                  <div className="w-1 h-1 bg-slate-300 rounded-full group-hover/icon:bg-slate-800 transition-colors" />
                  <span className="text-[8px] text-slate-400 group-hover/icon:text-slate-800 transition-colors leading-tight max-w-[60px] text-center uppercase tracking-tight">
                    {t(`Invitation.highlights.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-slate-50/80 border border-slate-100 p-5 rounded-xl text-center"
              waitingTitleClassName="text-slate-900 text-lg font-light mb-1 uppercase tracking-widest"
              waitingHintClassName="text-slate-400 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-slate-900 text-white font-light py-4 px-6 rounded-lg transition-all shadow-lg hover:bg-black"
              codeLabelClassName="text-slate-400 text-[9px] uppercase tracking-[0.5em] mb-1"
              codeClassName="text-3xl md:text-4xl font-extralight text-slate-900 tracking-[0.2em] py-2"
              meetingLinkClassName="text-slate-500 underline mt-3 inline-block text-[11px] hover:text-black transition-colors"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-slate-50/80 text-slate-400 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest border border-slate-100"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-slate-900 text-white font-light py-4 rounded-xl shadow-lg transition-all text-sm uppercase tracking-[0.2em] hover:bg-black"
              declineButtonClassName="px-5 border border-slate-200 text-slate-400 hover:text-slate-900 rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 opacity-20 text-center">
          <p className="text-[9px] text-slate-400 tracking-[0.6em] uppercase">
            {t("Invitation.footer")}
          </p>
        </div>
      </div>
    </div>
  );
}
