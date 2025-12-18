"use client";

import Image from "next/image";
import { InvitationProps } from "./types";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  EventEndedBanner,
} from "@/components/invitation";

export default function Executive({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col relative overflow-hidden select-none font-serif">
      {/* Background Layer: Full-screen Device with mysterious reveal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Ambient Gold Glows */}
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[50vh] bg-amber-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[40vh] bg-slate-400/5 blur-[120px] rounded-full" />

        {/* Full-screen Device Background - "犹抱琵琶半遮面" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[140%] h-[140%] opacity-10 blur-[1px]">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_40px_100px_rgba(0,0,0,0.5)] contrast-[1.05] brightness-110"
              priority
            />
          </div>
        </div>

        {/* Serif Frame Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] border border-slate-700/20 rounded-full" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        {/* Main Panel */}
        <div className="w-full max-w-lg bg-slate-900/70 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
          {/* Brand & Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-40">
              <div className="h-[1px] w-10 bg-amber-500" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={90}
                height={22}
                className="h-5 w-auto"
              />
              <div className="h-[1px] w-10 bg-amber-500" />
            </div>

            <p className="text-amber-500/80 text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">
              {greeting}
            </p>

            <div className="space-y-1 px-4">
              <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Row */}
          <div className="bg-slate-800/50 border border-slate-700/30 p-4 rounded-xl shadow-lg">
            <div className="text-center">
              <p className="text-amber-500/40 text-[9px] uppercase tracking-widest mb-1 italic font-sans">
                Premium Engagement
              </p>
              <p className="text-lg md:text-xl font-bold text-slate-100 tracking-tight">
                {localTime || "ASCERTAINING..."}
              </p>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              {["item1", "item2", "item3"].map((key) => (
                <div key={key} className="flex flex-col items-center gap-1.5 group/icon">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-sm rotate-45 group-hover/icon:scale-150 transition-transform" />
                  <span className="text-[8px] text-slate-400 uppercase tracking-tight text-center leading-tight max-w-[60px] font-sans">
                    {t(`Invitation.highlights.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions Area */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-slate-900 border border-slate-800 p-5 rounded-xl text-center shadow-inner"
              waitingTitleClassName="text-amber-400 text-lg font-black mb-1 uppercase tracking-widest"
              waitingHintClassName="text-slate-500 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-amber-600 hover:bg-amber-500 text-white font-black py-4 px-6 rounded-lg transition-all shadow-xl"
              codeLabelClassName="text-amber-500/30 text-[9px] uppercase tracking-[0.5em] mb-1"
              codeClassName="text-3xl md:text-4xl font-black text-white tracking-[0.3em] py-2"
              meetingLinkClassName="text-amber-500 underline mt-3 inline-block text-[11px] font-bold hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-black/40 text-slate-700 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest border border-slate-800"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-white text-slate-900 font-black py-4 rounded-xl shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-all text-sm uppercase tracking-[0.15em] hover:bg-amber-50"
              declineButtonClassName="px-5 border border-slate-700 text-slate-500 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 opacity-10 text-center">
          <p className="text-[9px] text-slate-400 tracking-[0.8em] uppercase">
            {t("Invitation.footer")}
          </p>
        </div>
      </div>
    </div>
  );
}
