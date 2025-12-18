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

export default function AbstractArt({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="h-screen bg-[#FFF9FB] text-slate-900 flex flex-col relative overflow-hidden select-none font-sans">
      {/* 1. Background Layer: Organic Shapes & Hero Device */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Organic Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-200/40 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-violet-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[40vw] bg-teal-200/30 rounded-full blur-[120px]" />

        {/* Hero Device Section */}
        <div className="absolute inset-x-0 top-0 h-[55%] flex items-center justify-center p-12">
          <div className="relative w-full h-full max-w-2xl group transition-all duration-1000">
            {/* Floating Glassmorphism Orbs around Device */}
            <div
              className="absolute top-[10%] left-[10%] w-12 h-12 bg-white/40 backdrop-blur-md rounded-full border border-white/50 animate-bounce"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute bottom-[20%] right-[10%] w-16 h-16 bg-white/40 backdrop-blur-md rounded-full border border-white/50 animate-bounce"
              style={{ animationDuration: "4s" }}
            />

            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_20px_60px_rgba(168,85,247,0.15)] transition-transform duration-[4s] group-hover:rotate-2 group-hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>

      {/* 2. Content Layer: Bottom Glass Panel */}
      <div className="flex-1" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Main Panel */}
        <div className="w-full max-w-3xl bg-white/40 border-t border-white/80 backdrop-blur-3xl rounded-t-[50px] p-6 md:p-10 flex flex-col gap-8 shadow-[0_-30px_100px_rgba(168,85,247,0.08)]">
          {/* Brand & Title */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-40">
              <div className="h-[2px] w-8 bg-rose-300" />
              <div className="h-[2px] w-8 bg-violet-300" />
              <div className="h-[2px] w-8 bg-teal-300" />
            </div>

            <p className="text-violet-600/60 text-xs md:text-sm tracking-[0.4em] uppercase font-black">
              {greeting}
            </p>

            <div className="space-y-2 px-8">
              <h1 className="text-2xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-rose-500 via-violet-600 to-teal-500 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold px-4">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white/60 border border-white p-6 rounded-[30px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm group">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-[9px] uppercase tracking-widest mb-1 font-bold">
                Event Launch
              </p>
              <p className="text-xl md:text-2xl font-black text-slate-800">
                {localTime || "PREPARING..."}
              </p>
            </div>

            <div className="flex gap-4 md:gap-8">
              {["item1", "item2", "item3"].map((key, i) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-1 group/icon"
                >
                  <div
                    className={`w-2 h-2 rounded-full transform group-hover/icon:scale-150 transition-transform ${
                      i === 0
                        ? "bg-rose-400"
                        : i === 1
                        ? "bg-violet-400"
                        : "bg-teal-400"
                    }`}
                  />
                  <span className="text-[9px] text-slate-400 uppercase tracking-tighter text-center leading-[1.1] max-w-[70px]">
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
              containerClassName="bg-white/80 border border-white p-8 rounded-3xl text-center shadow-md"
              waitingTitleClassName="text-violet-600 text-xl font-black mb-2 uppercase tracking-wide"
              waitingHintClassName="text-slate-400 text-[10px] uppercase tracking-[0.2em]"
              joinButtonClassName="w-full bg-gradient-to-tr from-rose-500 via-violet-600 to-teal-500 text-white font-black py-5 px-8 rounded-2xl transition-all shadow-xl hover:scale-[1.02]"
              codeLabelClassName="text-slate-400 text-[9px] uppercase tracking-[0.5em] mb-2"
              codeClassName="text-5xl md:text-7xl font-black text-slate-900 tracking-[0.2em] py-4"
              meetingLinkClassName="text-violet-500 underline mt-4 inline-block text-[11px] font-bold hover:text-rose-500"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-slate-100 text-slate-400 p-4 rounded-xl text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-4"
              acceptButtonClassName="flex-1 bg-slate-900 text-white font-black py-5 rounded-3xl shadow-2xl hover:bg-violet-600 transition-all text-sm uppercase tracking-[0.2em]"
              declineButtonClassName="px-8 border border-slate-200 text-slate-400 hover:text-slate-900 rounded-3xl transition-all text-[11px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 opacity-30 text-center">
          <p className="text-[9px] text-slate-400 tracking-[0.6em] uppercase">
            {t("Invitation.footer")} · ARTISTIC INTERFACE
          </p>
        </div>
      </div>
    </div>
  );
}
