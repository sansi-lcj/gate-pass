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

export default function LuxuryGold({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="h-screen bg-stone-950 text-white flex flex-col relative overflow-hidden select-none">
      {/* 1. Background Layer: Large Device + Gold Aura */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Ambient Warm Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[120vw] h-[80vh] bg-amber-900/10 blur-[150px] rounded-full" />

        {/* Hero Device Section */}
        <div className="absolute inset-x-0 top-0 h-[55%] flex items-center justify-center p-12">
          <div className="relative w-full h-full max-w-4xl transition-transform duration-[4s] group hover:scale-105">
            {/* Pedestal Shadow */}
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-2/3 h-12 bg-black/60 blur-3xl rounded-full" />

            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter brightness-110 contrast-110 drop-shadow-[0_20px_60px_rgba(217,119,6,0.2)]"
              priority
            />

            {/* Sparkling Gold Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-amber-400 rounded-full animate-ping opacity-30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 2. Content Layer: Bottom Glass Panels */}
      <div className="flex-1" /> {/* Spacer for Top Hero */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Main Content Panel */}
        <div className="w-full max-w-2xl bg-stone-900/40 border-t border-amber-500/20 backdrop-blur-3xl rounded-t-[40px] p-6 md:p-10 flex flex-col gap-8 shadow-[0_-30px_100px_rgba(0,0,0,0.9)]">
          {/* Brand & Title Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 mb-2 opacity-50">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={110}
                height={28}
                className="h-6 w-auto"
              />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500" />
            </div>

            <p className="text-amber-500/60 text-xs md:text-sm tracking-[0.5em] uppercase font-light">
              {greeting}
            </p>

            <div className="space-y-1 px-4">
              <h1 className="text-2xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-400 to-amber-200 tracking-tight leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-stone-500 text-[10px] md:text-xs tracking-[0.3em] uppercase italic">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Bar */}
          <div className="bg-amber-950/20 border border-amber-500/10 p-6 rounded-2xl text-center space-y-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div>
              <p className="text-amber-500/40 text-[9px] uppercase tracking-widest mb-1">
                Exclusive Access
              </p>
              <p className="text-xl md:text-3xl text-amber-100 font-light tracking-tight">
                {localTime || "PENDING RELEASE"}
              </p>
            </div>

            <div className="flex justify-center gap-8 pt-4 border-t border-amber-500/10 text-[10px] text-amber-300/40 font-light uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="fill-amber-500/50"
                >
                  <circle cx="5" cy="5" r="3" />
                </svg>
                <span>{t("Invitation.highlights.item1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="fill-amber-500/50"
                >
                  <circle cx="5" cy="5" r="3" />
                </svg>
                <span>{t("Invitation.highlights.item2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="fill-amber-500/50"
                >
                  <circle cx="5" cy="5" r="3" />
                </svg>
                <span>{t("Invitation.highlights.item3")}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-amber-900/20 border border-amber-500/20 p-6 rounded-2xl text-center shadow-inner"
              waitingTitleClassName="text-amber-400 text-lg font-bold mb-1"
              waitingHintClassName="text-stone-500 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:to-amber-400 text-stone-950 font-black py-5 px-8 rounded-xl transition-all shadow-xl"
              codeLabelClassName="text-amber-500/40 text-[9px] uppercase tracking-[0.5em] mb-2"
              codeClassName="text-5xl md:text-6xl font-light text-amber-100 tracking-[0.3em] py-4"
              meetingLinkClassName="text-amber-400 underline mt-4 inline-block text-[10px] uppercase tracking-widest hover:text-amber-200"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-white/5 border border-white/5 text-stone-500 p-4 rounded-xl text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-4"
              acceptButtonClassName="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black py-5 rounded-2xl shadow-xl transition-all text-sm uppercase tracking-[0.2em]"
              declineButtonClassName="px-8 border border-amber-500/20 text-stone-500 hover:text-white rounded-2xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 opacity-20 text-center">
          <p className="text-[9px] text-stone-500 tracking-[0.5em] uppercase">
            {t("Invitation.footer")} POINCARE COLLECTION
          </p>
        </div>
      </div>
    </div>
  );
}
