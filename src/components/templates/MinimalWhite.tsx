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
import { useMemo } from "react";

export default function MinimalWhite({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  // Light theme uses subtle dots instead of stars
  const dots = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        left: `${(i * 7.3 + 13) % 100}%`,
        top: `${(i * 13.7 + 7) % 100}%`,
        opacity: 0.1 + (i % 5) * 0.05,
      })),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      {/* Background Layer - Light Theme */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Dot Pattern */}
        <div className="absolute inset-0">
          {dots.map((dot, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-slate-300 rounded-full"
              style={{
                left: dot.left,
                top: dot.top,
                opacity: dot.opacity,
              }}
            />
          ))}
        </div>

        {/* Full-screen Device Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[130%] h-[130%] opacity-[0.04]">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
              priority
            />
          </div>
        </div>

        {/* Subtle Gradient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[50vh] bg-gradient-to-b from-white to-transparent blur-[100px] opacity-60" />

        {/* Minimal rotating ring */}
        <div
          className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] border border-slate-200/30 rounded-full"
          style={{ animation: "rotate-slow 120s linear infinite" }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 w-full max-w-2xl">
        {/* Light Theme Glass Card */}
        <div
          className="relative w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 md:p-12 flex flex-col gap-8"
          style={{ boxShadow: "0 10px 60px rgba(0,0,0,0.04)" }}
        >
          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-slate-200 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-slate-200 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-slate-300/50 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-slate-300/50 rounded-br-lg" />

          {/* Brand Header */}
          <div className="text-center space-y-6">
            <BrandHeader lineColor="slate-300" logoVariant="color" />

            <p className="text-slate-400 text-[11px] md:text-xs tracking-[0.5em] uppercase font-light">
              — {greeting} —
            </p>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-extralight uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700 leading-tight tracking-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <DiamondDivider diamondColor="slate-400" lineColor="slate-900" />

          {/* Badge Group */}
          <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 text-center space-y-4">
            <BadgeGroup
              primaryColor="slate"
              secondaryColor="slate"
              accentColor="slate"
              labels={[
                t("Invitation.highlights.item1"),
                t("Invitation.highlights.item2"),
                t("Invitation.highlights.item3"),
              ]}
            />

            <div className="pt-2">
              <p className="text-slate-400 text-[9px] uppercase tracking-widest mb-1 font-medium">
                Scheduled Event
              </p>
              <p className="text-lg md:text-xl font-light text-slate-800 tracking-tight">
                {localTime || "ASCERTAINING..."}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-slate-50/80 border border-slate-100 p-5 rounded-xl text-center"
              waitingTitleClassName="text-slate-900 text-lg font-light mb-1 uppercase tracking-widest"
              waitingHintClassName="text-slate-400 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-slate-900 text-white font-light py-4 px-6 rounded-lg transition-all shadow-lg hover:bg-black"
              codeLabelClassName="text-slate-400 text-[9px] uppercase tracking-[0.5em] mb-1"
              codeClassName="text-3xl md:text-4xl font-extralight text-slate-900 tracking-[0.2em] py-2"
              meetingLinkClassName="text-slate-500 underline mt-3 inline-block text-[11px] hover:text-black transition-colors"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-slate-50/80 text-slate-400 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest border border-slate-100"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-slate-900 text-white font-light py-4 rounded-xl shadow-lg transition-all text-sm uppercase tracking-[0.2em] hover:bg-black"
              declineButtonClassName="px-5 border border-slate-200 text-slate-400 hover:text-slate-900 rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>

          {/* Product Preview */}
          <ProductPreview glowColor="rgba(0,0,0,0.1)" />
        </div>

        {/* Footer */}
        <InvitationFooter text={t("Invitation.footer")} className="opacity-20" />
      </div>
    </div>
  );
}
