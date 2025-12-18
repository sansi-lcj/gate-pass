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

export default function MinimalWhite({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="h-screen bg-slate-50 text-slate-900 flex flex-col relative overflow-hidden select-none font-sans">
      {/* 1. Background Layer: Minimalist Hero Device */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Gradient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-gradient-to-b from-white to-transparent blur-[120px] opacity-60" />

        {/* Hero Device Section */}
        <div className="absolute inset-x-0 top-0 h-[60%] flex items-center justify-center p-16">
          <div className="relative w-full h-full max-w-2xl group transition-all duration-1000">
            {/* Minimal Frame Elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-slate-200" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-slate-200" />

            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-[3s] group-hover:scale-105 group-hover:drop-shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              priority
            />
          </div>
        </div>
      </div>

      {/* 2. Content Layer: Bottom Glass Panel */}
      <div className="flex-1" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Main Panel */}
        <div className="w-full max-w-3xl bg-white/70 border-t border-white backdrop-blur-3xl rounded-t-[40px] p-6 md:p-10 flex flex-col gap-8 shadow-[0_-20px_80px_rgba(0,0,0,0.03)]">
          {/* Brand & Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-30">
              <div className="h-[1px] w-12 bg-slate-300" />
              <Image
                src="/assets/realsee-logo-en-with-brands-color.svg"
                alt="Realsee"
                width={110}
                height={28}
                className="h-6 w-auto grayscale"
              />
              <div className="h-[1px] w-12 bg-slate-300" />
            </div>

            <p className="text-slate-400 text-xs md:text-sm tracking-[0.5em] uppercase font-light">
              {greeting}
            </p>

            <div className="space-y-1 px-8">
              <h1 className="text-2xl md:text-5xl font-extralight uppercase tracking-tight text-slate-900 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Row */}
          <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm group">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-[9px] uppercase tracking-widest mb-1 font-medium">
                Scheduled Event
              </p>
              <p className="text-xl md:text-2xl font-light text-slate-800 tracking-tight">
                {localTime || "ASCERTAINING..."}
              </p>
            </div>

            <div className="flex gap-4 md:gap-10 text-[10px] text-slate-500 uppercase tracking-widest font-light">
              {["item1", "item2", "item3"].map((key) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-2 group/icon"
                >
                  <div className="w-1 h-1 bg-slate-300 rounded-full group-hover/icon:bg-slate-800 transition-colors" />
                  <span className="text-[9px] text-slate-400 group-hover/icon:text-slate-800 transition-colors leading-[1.1] max-w-[80px] text-center">
                    {t(`Invitation.highlights.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-white/50 border border-slate-100 p-8 rounded-2xl text-center shadow-inner"
              waitingTitleClassName="text-slate-900 text-xl font-light mb-1 uppercase tracking-widest"
              waitingHintClassName="text-slate-400 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-slate-900 text-white font-light py-5 px-8 rounded-xl transition-all shadow-xl hover:bg-black hover:scale-[1.01]"
              codeLabelClassName="text-slate-400 text-[9px] uppercase tracking-[0.6em] mb-2"
              codeClassName="text-5xl md:text-7xl font-extralight text-slate-900 tracking-[0.3em] py-4"
              meetingLinkClassName="text-slate-500 underline mt-4 inline-block text-[11px] hover:text-black transition-colors"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-slate-50/50 text-slate-400 p-4 rounded-xl text-center text-[10px] uppercase tracking-widest border border-slate-100"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-4"
              acceptButtonClassName="flex-1 bg-slate-900 text-white font-light py-5 rounded-2xl shadow-2xl transition-all text-sm uppercase tracking-[0.3em] hover:bg-black"
              declineButtonClassName="px-8 border border-slate-200 text-slate-400 hover:text-slate-900 rounded-2xl transition-all text-[11px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 opacity-20 text-center">
          <p className="text-[9px] text-slate-400 tracking-[0.8em] uppercase">
            {t("Invitation.footer")} · MINIMALIST PURITY
          </p>
        </div>
      </div>
    </div>
  );
}
