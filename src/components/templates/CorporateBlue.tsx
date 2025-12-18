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

export default function CorporateBlue({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="h-screen bg-slate-900 text-slate-100 flex flex-col relative overflow-hidden select-none font-sans">
      {/* 1. Background Layer: Corporate Tech Glow & Hero Device */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Tech Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#3b82f6 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Professional Blue Glows */}
        <div className="absolute top-1/4 left-1/4 w-[100vw] h-[60vh] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[80vw] h-[50vh] bg-indigo-600/10 blur-[120px] rounded-full" />

        {/* Hero Device Section */}
        <div className="absolute inset-x-0 top-0 h-[55%] flex items-center justify-center p-12">
          <div className="relative w-full h-full max-w-2xl group transition-all duration-1000">
            {/* Tech Scanning Line */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[scan_4s_ease-in-out_infinite]" />

            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_0_80px_rgba(37,99,235,0.2)] transition-transform duration-[4s] group-hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>

      {/* 2. Content Layer: Bottom Glass Panel */}
      <div className="flex-1" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Main Panel */}
        <div className="w-full max-w-3xl bg-slate-800/40 border-t border-blue-500/20 backdrop-blur-3xl rounded-t-[40px] p-6 md:p-10 flex flex-col gap-8 shadow-[0_-30px_100px_rgba(0,0,0,0.8)]">
          {/* Brand & Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={110}
                height={28}
                className="h-6 w-auto"
              />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500" />
            </div>

            <p className="text-blue-400 text-xs md:text-sm tracking-[0.5em] uppercase font-bold">
              {greeting}
            </p>

            <div className="space-y-1 px-8">
              <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-slate-500 text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Row */}
          <div className="bg-blue-600/5 border border-blue-500/10 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative group overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1 bg-blue-500" />

            <div className="text-center md:text-left">
              <p className="text-blue-500/40 text-[9px] uppercase tracking-widest mb-1 font-bold">
                Corporate Access
              </p>
              <p className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {localTime || "ASCERTAINING..."}
              </p>
            </div>

            <div className="flex gap-4 md:gap-8">
              {["item1", "item2", "item3"].map((key) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-1.5 group/highlight"
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover/highlight:scale-150 transition-transform" />
                  <span className="text-[9px] text-slate-400 uppercase tracking-tighter text-center leading-[1.1] max-w-[80px]">
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
              containerClassName="bg-blue-600/10 border border-blue-500/20 p-8 rounded-2xl text-center shadow-inner"
              waitingTitleClassName="text-blue-400 text-xl font-black mb-1 uppercase tracking-widest"
              waitingHintClassName="text-slate-500 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-8 rounded-xl transition-all shadow-xl hover:scale-[1.01]"
              codeLabelClassName="text-blue-500/40 text-[9px] uppercase tracking-[0.6em] mb-2"
              codeClassName="text-5xl md:text-7xl font-black text-white tracking-[0.3em] py-4"
              meetingLinkClassName="text-blue-400 underline mt-4 inline-block text-[11px] font-bold hover:text-white transition-colors"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-white/5 text-slate-600 p-4 rounded-xl text-center text-[10px] uppercase tracking-widest border border-white/5"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-4"
              acceptButtonClassName="flex-1 bg-blue-600 text-white font-black py-5 rounded-2xl shadow-2xl transition-all text-sm uppercase tracking-[0.3em] hover:bg-blue-700"
              declineButtonClassName="px-8 border border-slate-700 text-slate-500 hover:text-white rounded-2xl transition-all text-[11px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 opacity-20 text-center">
          <p className="text-[9px] text-slate-600 tracking-[0.8em] uppercase">
            {t("Invitation.footer")} · PROFESSIONAL NETWORK
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0%,
          100% {
            transform: translateY(-50px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(50px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
