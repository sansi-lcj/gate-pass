"use client";

import { InvitationProps } from "./types";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  EventEndedBanner,
  SharedBackground,
  GlassCard,
  DiamondDivider,
  BadgeGroup,
  BrandHeader,
  ProductPreview,
  InvitationFooter,
} from "@/components/invitation";

export default function DigitalWave({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, honorific, guestName, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0f1628] to-[#0a0a1a] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      {/* Background Layer */}
      <SharedBackground
        starCount={45}
        primaryColor="cyan-500"
        secondaryColor="indigo-500"
        accentColor="blue-400"
        showScanLine={false}
        showDeviceImage={true}
      />

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.2)" />
              <stop offset="50%" stopColor="rgba(99, 102, 241, 0.2)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.2)" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z"
            fill="url(#waveGrad)"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 w-full max-w-2xl">
        <GlassCard
          topAccentColor="cyan-500"
          bottomAccentColor="indigo-500"
          glowColor="rgba(56,189,248,0.15)"
        >
          {/* Brand Header */}
          <div className="text-center space-y-6">
            <BrandHeader lineColor="cyan-400" logoVariant="white" />

            <div className="space-y-3">
              {honorific && (
                <p className="text-cyan-400/60 text-[10px] md:text-xs tracking-[0.5em] uppercase font-medium">
                  — {honorific} —
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-indigo-300 tracking-wide">
                {guestName}
              </h2>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-indigo-300 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.4em] uppercase">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <DiamondDivider diamondColor="indigo-500" lineColor="white" />

          {/* Badge Group */}
          <div className="bg-cyan-500/5 border border-cyan-400/10 rounded-2xl p-6 text-center space-y-4">
            <BadgeGroup
              primaryColor="cyan"
              secondaryColor="indigo"
              accentColor="blue"
              labels={[
                t("Invitation.highlights.item1"),
                t("Invitation.highlights.item2"),
                t("Invitation.highlights.item3"),
              ]}
            />

            <div className="pt-2">
              <p className="text-cyan-400/50 text-[9px] uppercase tracking-widest mb-1">
                Event Schedule
              </p>
              <p className="text-lg md:text-xl font-bold text-white">
                {localTime || "SYNCHRONIZING..."}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-cyan-500/10 border border-cyan-400/20 p-5 rounded-xl text-center"
              waitingTitleClassName="text-cyan-400 text-lg font-bold mb-1"
              waitingHintClassName="text-slate-500 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg"
              codeLabelClassName="text-cyan-400/50 text-[9px] uppercase tracking-[0.4em] mb-1"
              codeClassName="text-3xl md:text-4xl font-bold text-white tracking-[0.2em] py-2"
              meetingLinkClassName="text-cyan-400 underline mt-3 inline-block text-[11px] hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-slate-800/50 text-slate-500 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-cyan-500/20 transition-all text-sm uppercase tracking-wider"
              declineButtonClassName="px-5 border border-slate-600 text-slate-500 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>

          {/* Product Preview */}
          <ProductPreview glowColor="rgba(56,189,248,0.3)" />
        </GlassCard>

        {/* Footer */}
        <InvitationFooter text={t("Invitation.footer")} />
      </div>
    </div>
  );
}
