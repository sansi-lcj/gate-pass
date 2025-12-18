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

export default function LuxuryGold({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, honorific, guestName, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] text-white flex flex-col items-center justify-center relative overflow-hidden font-serif select-none">
      {/* Background Layer */}
      <SharedBackground
        starCount={25}
        primaryColor="amber-500"
        secondaryColor="amber-600"
        accentColor="amber-400"
        showScanLine={false}
        showDeviceImage={true}
      />

      {/* Gold particle effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.3 + (i % 5) * 0.1,
            }}
          />
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 w-full max-w-2xl">
        <GlassCard
          topAccentColor="amber-500"
          bottomAccentColor="amber-600"
          glowColor="rgba(251,191,36,0.15)"
        >
          {/* Brand Header */}
          <div className="text-center space-y-6">
            <BrandHeader lineColor="amber-500" logoVariant="white" />

            <div className="space-y-3">
              {honorific && (
                <p className="text-amber-400/60 text-[10px] md:text-xs tracking-[0.5em] uppercase font-light">
                  — {honorific} —
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-amber-200 tracking-wide">
                {guestName}
              </h2>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-amber-200/30 text-[10px] md:text-xs tracking-[0.4em] uppercase">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <DiamondDivider diamondColor="amber-500" lineColor="white" />

          {/* Badge Group */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 text-center space-y-4">
            <BadgeGroup
              primaryColor="amber"
              secondaryColor="amber"
              accentColor="amber"
              labels={[
                t("Invitation.highlights.item1"),
                t("Invitation.highlights.item2"),
                t("Invitation.highlights.item3"),
              ]}
            />

            <div className="pt-2">
              <p className="text-amber-400/40 text-[9px] uppercase tracking-widest mb-1">
                Exclusive Engagement
              </p>
              <p className="text-lg md:text-xl font-bold text-white">
                {localTime || "PREPARING..."}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl text-center"
              waitingTitleClassName="text-amber-400 text-lg font-bold mb-1"
              waitingHintClassName="text-amber-200/30 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold py-4 px-6 rounded-lg transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)]"
              codeLabelClassName="text-amber-400/40 text-[9px] uppercase tracking-[0.4em] mb-1"
              codeClassName="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100 tracking-[0.2em] py-2"
              meetingLinkClassName="text-amber-400 underline mt-3 inline-block text-[11px] hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-black/40 text-amber-200/30 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest border border-amber-500/10"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold py-4 rounded-xl shadow-xl transition-all text-sm uppercase tracking-wider"
              declineButtonClassName="px-5 border border-amber-500/30 text-amber-200/50 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>

          {/* Product Preview */}
          <ProductPreview glowColor="rgba(251,191,36,0.3)" />
        </GlassCard>

        {/* Footer */}
        <InvitationFooter text={t("Invitation.footer")} />
      </div>
    </div>
  );
}
