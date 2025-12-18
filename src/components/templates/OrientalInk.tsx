"use client";

import Image from "next/image";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  EventEndedBanner,
} from "@/components/invitation";
import { InvitationProps } from "./types";

export default function OrientalInk({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="h-screen bg-[#F8F7F2] text-stone-900 flex flex-col relative overflow-hidden select-none font-serif">
      {/* 1. Background Layer: Ink Wash & Hero Device */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Large Device Silhouette (Top Hero) */}
        <div className="absolute inset-x-0 top-0 h-[50%] flex items-center justify-center p-12 transition-all duration-1000">
          <div className="relative w-full h-full max-w-4xl opacity-15 mix-blend-multiply group hover:opacity-25 transition-opacity duration-1000">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter grayscale brightness-50 contrast-150"
              priority
            />
          </div>
        </div>

        {/* Ink Diffusion SVG */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <filter id="ink-diffuse">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <circle
              cx="10"
              cy="10"
              r="25"
              fill="#222"
              filter="url(#ink-diffuse)"
              className="animate-pulse"
            />
            <circle
              cx="90"
              cy="80"
              r="35"
              fill="#444"
              filter="url(#ink-diffuse)"
            />
          </svg>
        </div>
      </div>

      {/* 2. Content Layer: Bottom Paper Panel */}
      <div className="flex-1" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Paper Panel */}
        <div className="w-full max-w-2xl bg-[#FCFAF5]/80 border-t border-stone-200 backdrop-blur-3xl rounded-t-[50px] p-6 md:p-10 flex flex-col gap-8 shadow-[0_-30px_80px_rgba(0,0,0,0.08)] relative">
          {/* Aesthetic Seal (SVG) */}
          <div className="absolute top-8 right-8 w-14 h-14 border-[3px] border-red-700/30 rounded-md flex items-center justify-center rotate-12 bg-red-50/20">
            <div className="text-red-800/60 text-[10px] font-black leading-tight tracking-tighter text-center">
              如视
              <br />
              认证
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-40">
              <div className="h-[1px] w-12 bg-stone-900" />
              <Image
                src="/assets/realsee-logo-en-with-brands-black.svg"
                alt="Realsee"
                width={90}
                height={24}
                className="h-4 w-auto grayscale"
              />
              <div className="h-[1px] w-12 bg-stone-900" />
            </div>

            <p className="text-stone-500 text-sm tracking-[0.4em] uppercase font-light italic">
              {greeting}
            </p>

            <div className="space-y-2 px-8">
              <h1 className="text-2xl md:text-5xl font-bold text-stone-900 leading-tight tracking-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <div className="h-[1px] w-24 bg-red-800/20 mx-auto" />
              <p className="text-stone-400 text-xs md:text-sm tracking-[0.2em] font-light italic">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Row */}
          <div className="bg-stone-100/30 border-y border-stone-900/5 py-8 text-center space-y-4">
            <div>
              <p className="text-stone-400 text-[10px] uppercase tracking-widest mb-1.5 font-sans">
                Time & Place
              </p>
              <p className="text-xl md:text-3xl text-stone-800 font-medium">
                {localTime || "待定会议"}
              </p>
            </div>

            <div className="flex justify-center gap-8 text-[11px] text-stone-600 font-light italic">
              <span>{t("Invitation.highlights.item1")}</span>
              <span className="text-red-800/20">/</span>
              <span>{t("Invitation.highlights.item2")}</span>
              <span className="text-red-800/20">/</span>
              <span>{t("Invitation.highlights.item3")}</span>
            </div>
          </div>

          {/* Interactions */}
          <div className="space-y-4 pb-4">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-stone-50 border border-stone-200 p-8 rounded-2xl text-center shadow-sm"
              waitingTitleClassName="text-stone-800 text-xl font-bold mb-2"
              waitingHintClassName="text-stone-400 text-xs tracking-widest"
              joinButtonClassName="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-5 px-8 rounded-xl transition-all shadow-xl"
              codeLabelClassName="text-stone-400 text-[9px] uppercase tracking-[0.4em] mb-2"
              codeClassName="text-5xl md:text-6xl font-bold text-stone-900 tracking-[0.2em] py-4"
              meetingLinkClassName="text-stone-500 underline mt-4 inline-block text-[11px] font-sans hover:text-stone-800"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-stone-100 text-stone-400 p-4 rounded-xl text-center text-xs tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-4"
              acceptButtonClassName="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-bold py-5 rounded-2xl shadow-xl transition-all text-sm uppercase tracking-widest"
              declineButtonClassName="px-8 border border-stone-300 text-stone-400 hover:text-stone-900 rounded-2xl transition-all text-[11px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 opacity-30 text-center font-sans">
          <p className="text-[9px] text-stone-500 tracking-[0.4em] uppercase">
            {t("Invitation.footer")} POINCARE SYSTEM
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
