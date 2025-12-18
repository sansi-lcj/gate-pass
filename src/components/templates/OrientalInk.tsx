"use client";

import Image from "next/image";
import { InvitationProps } from "./types";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  EventEndedBanner,
  DiamondDivider,
  BadgeGroup,
  BrandHeader,
  ProductPreview,
  InvitationFooter,
} from "@/components/invitation";

export default function OrientalInk({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-stone-900 flex flex-col items-center justify-center relative overflow-hidden font-serif select-none">
      {/* Background Layer - Oriental Ink Theme */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Full-screen Device Background - ink wash style */}
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

        {/* Subtle rotating element */}
        <div
          className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] border border-stone-300/20 rounded-full"
          style={{ animation: "rotate-slow 150s linear infinite" }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 w-full max-w-2xl">
        {/* Paper Panel */}
        <div
          className="relative w-full max-w-2xl bg-[#FCFAF5]/90 backdrop-blur-xl border border-stone-200 rounded-2xl p-8 md:p-12 flex flex-col gap-8"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}
        >
          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-stone-400/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-stone-400/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-red-800/20 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-red-800/20 rounded-br-lg" />

          {/* Aesthetic Seal */}
          <div className="absolute top-4 right-16 w-12 h-12 border-[2px] border-red-700/30 rounded-md flex items-center justify-center rotate-12 bg-red-50/20">
            <div className="text-red-800/60 text-[8px] font-black leading-tight tracking-tighter text-center">
              如视
              <br />
              认证
            </div>
          </div>

          {/* Brand Header */}
          <div className="text-center space-y-6">
            <BrandHeader lineColor="stone-900" logoVariant="color" />

            <p className="text-stone-500 text-[11px] md:text-xs tracking-[0.5em] uppercase font-light italic">
              — {greeting} —
            </p>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight tracking-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <div className="h-[1px] w-16 bg-red-800/20 mx-auto" />
              <p className="text-stone-400 text-[10px] md:text-xs tracking-[0.4em] font-light italic">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <DiamondDivider diamondColor="red-800" lineColor="stone-900" />

          {/* Badge Group */}
          <div className="bg-stone-100/30 border-y border-stone-900/5 rounded-2xl p-6 text-center space-y-4">
            <BadgeGroup
              primaryColor="stone"
              secondaryColor="stone"
              accentColor="red"
              labels={[
                t("Invitation.highlights.item1"),
                t("Invitation.highlights.item2"),
                t("Invitation.highlights.item3"),
              ]}
            />

            <div className="pt-2">
              <p className="text-stone-400 text-[9px] uppercase tracking-widest mb-1 font-sans">
                Time & Place
              </p>
              <p className="text-lg md:text-xl text-stone-800 font-medium">
                {localTime || "待定会议"}
              </p>
            </div>
          </div>

          {/* Action Area */}
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

          {/* Product Preview */}
          <ProductPreview glowColor="rgba(0,0,0,0.1)" />
        </div>

        {/* Footer */}
        <InvitationFooter text={t("Invitation.footer")} className="opacity-30" />
      </div>
    </div>
  );
}
