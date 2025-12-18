"use client";

import Image from "next/image";
import { InvitationProps } from "./types";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  DeclinedContent,
  EventEndedBanner,
} from "@/components/invitation";

export default function Executive({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="h-screen bg-[#0F172A] text-slate-100 flex flex-col relative overflow-hidden select-none font-serif">
      {/* 1. Background Layer: Executive Hero Device */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Ambient Gold Glows */}
        <div className="absolute top-1/3 left-1/4 w-[90vw] h-[60vh] bg-amber-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[70vw] h-[50vh] bg-slate-400/5 blur-[120px] rounded-full" />

        {/* Hero Device Section */}
        <div className="absolute inset-x-0 top-0 h-[55%] flex items-center justify-center p-12">
          <div className="relative w-full h-full max-w-2xl group transition-all duration-1000">
            {/* Serif Frame Elements */}
            <div className="absolute top-[-5%] left-[-5%] w-[110%] h-[110%] border border-slate-700/30 rounded-full" />

            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_40px_100px_rgba(0,0,0,0.5)] contrast-[1.05] brightness-110 transition-transform duration-[5s] group-hover:scale-[1.02]"
              priority
            />
          </div>
        </div>
      </div>

      {/* 2. Content Layer: Bottom Glass Panel */}
      <div className="flex-1" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Main Panel */}
        <div className="w-full max-w-3xl bg-slate-900/60 border-t border-slate-700/50 backdrop-blur-3xl rounded-t-[40px] p-6 md:p-10 flex flex-col gap-8 shadow-[0_-40px_120px_rgba(0,0,0,0.9)]">
          {/* Brand & Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-40">
              <div className="h-[1px] w-12 bg-amber-500" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={110}
                height={28}
                className="h-6 w-auto"
              />
              <div className="h-[1px] w-12 bg-amber-500" />
            </div>

            <p className="text-amber-500/80 text-xs md:text-sm tracking-[0.6em] uppercase font-bold">
              {greeting}
            </p>

            <div className="space-y-1 px-8">
              <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Row */}
          <div className="bg-slate-800/50 border border-slate-700/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl group">
            <div className="text-center md:text-left">
              <p className="text-amber-500/40 text-[9px] uppercase tracking-widest mb-1 italic font-sans">
                Premium Engagement
              </p>
              <p className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
                {localTime || "ASCERTAINING..."}
              </p>
            </div>

            <div className="flex gap-4 md:gap-8">
              {["item1", "item2", "item3"].map((key) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-1.5 group/icon"
                >
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-sm rotate-45 group-hover/icon:scale-150 transition-transform" />
                  <span className="text-[9px] text-slate-400 uppercase tracking-tighter text-center leading-[1.1] max-w-[80px] font-sans">
                    {t(`Invitation.highlights.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions Area */}
          <div className="space-y-4">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center shadow-inner"
              waitingTitleClassName="text-amber-400 text-xl font-black mb-1 uppercase tracking-widest"
              waitingHintClassName="text-slate-500 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-amber-600 hover:bg-amber-500 text-white font-black py-5 px-8 rounded-xl transition-all shadow-xl hover:scale-[1.01]"
              codeLabelClassName="text-amber-500/30 text-[9px] uppercase tracking-[0.6em] mb-2"
              codeClassName="text-5xl md:text-7xl font-black text-white tracking-[0.4em] py-4"
              meetingLinkClassName="text-amber-500 underline mt-4 inline-block text-[11px] font-bold hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-black/40 text-slate-700 p-4 rounded-xl text-center text-[10px] uppercase tracking-widest border border-slate-800"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-4"
              acceptButtonClassName="flex-1 bg-white text-slate-900 font-black py-5 rounded-2xl shadow-[0_20px_60px_rgba(255,255,255,0.1)] transition-all text-sm uppercase tracking-[0.2em] hover:bg-amber-50"
              declineButtonClassName="px-8 border border-slate-700 text-slate-500 hover:text-white rounded-2xl transition-all text-[11px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 opacity-10 text-center">
          <p className="text-[9px] text-slate-400 tracking-[1em] uppercase">
            {t("Invitation.footer")} · EXECUTIVE ORIGIN
          </p>
        </div>
      </div>
    </div>
  );
}
