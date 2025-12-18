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

// Special RTL-ready template for Arabic regions
export default function ArabicGeometry({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="h-screen bg-[#062D24] text-white flex flex-col relative overflow-hidden select-none font-serif">
      {/* 1. Background Layer: Geometric Patterns & Hero Device */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Intricate Geometric Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2310b981' stroke-width='0.5'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z M0 0 L100 100 M100 0 L0 100'/%3E%3Ccircle cx='50' cy='50' r='35'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
          }}
        />

        {/* Ambient Emerald & Gold Glows */}
        <div className="absolute top-1/3 left-1/4 w-[90vw] h-[60vh] bg-emerald-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[70vw] h-[50vh] bg-amber-500/5 blur-[120px] rounded-full" />

        {/* Hero Device Section */}
        <div className="absolute inset-x-0 top-0 h-[55%] flex items-center justify-center p-12">
          <div className="relative w-full h-full max-w-2xl group transition-all duration-1000">
            {/* Rotating Star Frame */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square border border-amber-500/20 rounded-lg rotate-45 animate-[spin_60s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square border border-emerald-500/20 rounded-lg animate-[spin_45s_linear_infinite_reverse]" />

            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_0_60px_rgba(16,185,129,0.3)] transition-transform duration-[4s] group-hover:scale-110"
              priority
            />

            {/* Glistening Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-200 rounded-full animate-pulse opacity-40 blur-[1px]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Content Layer: Bottom Glass Panel */}
      <div className="flex-1" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Main Panel */}
        <div className="w-full max-w-3xl bg-emerald-950/40 border-t border-amber-500/30 backdrop-blur-3xl rounded-t-[40px] p-6 md:p-10 flex flex-col gap-8 shadow-[0_-30px_100px_rgba(0,0,0,0.5)]">
          {/* Brand & Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-70">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={110}
                height={28}
                className="h-6 w-auto"
              />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-500 to-transparent" />
            </div>

            <p className="text-amber-500/80 text-xs md:text-sm tracking-[0.6em] uppercase font-bold animate-pulse">
              {greeting}
            </p>

            <div className="space-y-2 px-4">
              <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-emerald-600/60 text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Row */}
          <div className="bg-emerald-900/40 border border-amber-500/10 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative group overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1 bg-amber-500" />

            <div className="text-center md:text-left">
              <p className="text-emerald-500/40 text-[9px] uppercase tracking-widest mb-1 font-sans">
                Authorized Schedule
              </p>
              <p className="text-xl md:text-2xl font-bold text-white tracking-widest">
                {localTime || "ASCERTAINING..."}
              </p>
            </div>

            <div className="flex gap-4 md:gap-8">
              {["item1", "item2", "item3"].map((key) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-1.5 group/icon"
                >
                  <div className="w-2 h-2 rounded-full border border-amber-500 rotate-45 group-hover/icon:bg-amber-500 transition-colors" />
                  <span className="text-[9px] text-emerald-400 uppercase tracking-tighter text-center leading-[1.1] max-w-[70px] font-sans">
                    {t(`Invitation.highlights.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interaction Area */}
          <div className="space-y-4">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-amber-500/5 border border-amber-500/20 p-8 rounded-2xl text-center shadow-inner"
              waitingTitleClassName="text-amber-400 text-xl font-black mb-2 uppercase tracking-widest"
              waitingHintClassName="text-emerald-600 text-[10px] uppercase tracking-[0.2em]"
              joinButtonClassName="w-full bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black py-5 px-8 rounded-xl transition-all shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:scale-[1.01]"
              codeLabelClassName="text-amber-500/40 text-[9px] uppercase tracking-[0.6em] mb-2"
              codeClassName="text-5xl md:text-7xl font-black text-white tracking-[0.4em] py-4"
              meetingLinkClassName="text-amber-500 underline mt-4 inline-block text-[11px] hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-black/20 text-emerald-800 p-4 rounded-xl text-center text-[10px] uppercase tracking-widest border border-emerald-900/30"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-4"
              acceptButtonClassName="flex-1 bg-white text-emerald-950 font-black py-5 rounded-2xl shadow-xl hover:bg-amber-400 transition-all text-sm uppercase tracking-[0.2em]"
              declineButtonClassName="px-8 border border-emerald-500/20 text-emerald-800 hover:text-white rounded-2xl transition-all text-[11px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 opacity-20 text-center">
          <p className="text-[9px] text-emerald-700 tracking-[1em] uppercase">
            {t("Invitation.footer")} POINCARE ORIGIN
          </p>
        </div>
      </div>
    </div>
  );
}
