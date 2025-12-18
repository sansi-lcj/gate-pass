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
    <div className="min-h-screen bg-[#F8F7F2] text-stone-900 flex flex-col relative overflow-hidden select-none font-serif">
      {/* Background Layer: Full-screen Device with mysterious reveal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Full-screen Device Background - "犹抱琵琶半遮面" (ink wash style) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[140%] h-[140%] opacity-[0.08] mix-blend-multiply">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter grayscale brightness-50 contrast-150 blur-[1px]"
              priority
            />
          </div>
        </div>

        {/* Ink Diffusion SVG */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <filter id="ink-diffuse">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <circle cx="10" cy="10" r="25" fill="#222" filter="url(#ink-diffuse)" className="animate-pulse" />
            <circle cx="90" cy="80" r="35" fill="#444" filter="url(#ink-diffuse)" />
          </svg>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        {/* Paper Panel */}
        <div className="w-full max-w-lg bg-[#FCFAF5]/90 backdrop-blur-xl border border-stone-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative">
          {/* Aesthetic Seal */}
          <div className="absolute top-4 right-4 w-12 h-12 border-[2px] border-red-700/30 rounded-md flex items-center justify-center rotate-12 bg-red-50/20">
            <div className="text-red-800/60 text-[8px] font-black leading-tight tracking-tighter text-center">
              如视
              <br />
              认证
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-40">
              <div className="h-[1px] w-10 bg-stone-900" />
              <Image
                src="/assets/realsee-logo-en-with-brands-color.svg"
                alt="Realsee"
                width={80}
                height={20}
                className="h-4 w-auto grayscale"
              />
              <div className="h-[1px] w-10 bg-stone-900" />
            </div>

            <p className="text-stone-500 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light italic">
              {greeting}
            </p>

            <div className="space-y-2 px-4">
              <h1 className="text-xl md:text-3xl font-bold text-stone-900 leading-tight tracking-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <div className="h-[1px] w-16 bg-red-800/20 mx-auto" />
              <p className="text-stone-400 text-[10px] md:text-xs tracking-[0.2em] font-light italic">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Row */}
          <div className="bg-stone-100/30 border-y border-stone-900/5 py-5 text-center space-y-3">
            <div>
              <p className="text-stone-400 text-[9px] uppercase tracking-widest mb-1 font-sans">
                Time & Place
              </p>
              <p className="text-lg md:text-xl text-stone-800 font-medium">
                {localTime || "待定会议"}
              </p>
            </div>

            <div className="flex justify-center gap-6 text-[10px] text-stone-600 font-light italic">
              <span>{t("Invitation.highlights.item1")}</span>
              <span className="text-red-800/20">/</span>
              <span>{t("Invitation.highlights.item2")}</span>
              <span className="text-red-800/20">/</span>
              <span>{t("Invitation.highlights.item3")}</span>
            </div>
          </div>

          {/* Interactions */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-stone-50 border border-stone-200 p-5 rounded-xl text-center"
              waitingTitleClassName="text-stone-800 text-lg font-bold mb-1"
              waitingHintClassName="text-stone-400 text-[10px] tracking-widest"
              joinButtonClassName="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-4 px-6 rounded-lg transition-all shadow-lg"
              codeLabelClassName="text-stone-400 text-[9px] uppercase tracking-[0.4em] mb-1"
              codeClassName="text-3xl md:text-4xl font-bold text-stone-900 tracking-[0.2em] py-2"
              meetingLinkClassName="text-stone-500 underline mt-3 inline-block text-[11px] font-sans hover:text-stone-800"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-stone-100 text-stone-400 p-3 rounded-lg text-center text-[10px] tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-sm uppercase tracking-widest"
              declineButtonClassName="px-5 border border-stone-300 text-stone-400 hover:text-stone-900 rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 opacity-30 text-center font-sans">
          <p className="text-[9px] text-stone-500 tracking-[0.4em] uppercase">
            {t("Invitation.footer")}
          </p>
        </div>
      </div>
    </div>
  );
}
