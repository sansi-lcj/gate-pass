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

export default function CorporateBlue({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, honorific, guestName, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#1a365d] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      {/* Background Layer */}
      <SharedBackground
        starCount={35}
        primaryColor="blue-500"
        secondaryColor="blue-600"
        accentColor="blue-400"
        showScanLine={false}
        showDeviceImage={true}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 w-full max-w-2xl">
        <GlassCard
          topAccentColor="blue-400"
          bottomAccentColor="blue-600"
          glowColor="rgba(59,130,246,0.15)"
        >
          {/* Brand Header */}
          <div className="text-center space-y-6">
            <BrandHeader lineColor="blue-400" logoVariant="white" />

            <div className="space-y-3">
              {honorific && (
                <p className="text-blue-300/60 text-[10px] md:text-xs tracking-[0.5em] uppercase font-medium">
                  — {honorific} —
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200 tracking-wide">
                {guestName}
              </h2>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-blue-200/50 text-[10px] md:text-xs tracking-[0.4em] uppercase">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <DiamondDivider diamondColor="blue-400" lineColor="white" />

          {/* Badge Group */}
          <div className="bg-blue-900/30 border border-blue-400/10 rounded-2xl p-6 text-center space-y-4">
            <BadgeGroup
              primaryColor="blue"
              secondaryColor="blue"
              accentColor="blue"
              labels={[
                t("Invitation.highlights.item1"),
                t("Invitation.highlights.item2"),
                t("Invitation.highlights.item3"),
              ]}
            />

            <div className="pt-2">
              <p className="text-blue-300/50 text-[9px] uppercase tracking-widest mb-1">
                Scheduled Meeting
              </p>
              <p className="text-lg md:text-xl font-bold text-white">
                {localTime || "TO BE CONFIRMED"}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-blue-900/40 border border-blue-400/20 p-5 rounded-xl text-center"
              waitingTitleClassName="text-blue-300 text-lg font-bold mb-1"
              waitingHintClassName="text-blue-200/40 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg"
              codeLabelClassName="text-blue-300/40 text-[9px] uppercase tracking-[0.4em] mb-1"
              codeClassName="text-3xl md:text-4xl font-bold text-white tracking-[0.2em] py-2"
              meetingLinkClassName="text-blue-400 underline mt-3 inline-block text-[11px] hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-blue-900/20 text-blue-300/50 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-xl transition-all text-sm uppercase tracking-wider"
              declineButtonClassName="px-5 border border-blue-400/30 text-blue-300/60 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>

          {/* Product Preview */}
          <ProductPreview glowColor="rgba(59,130,246,0.3)" />
        </GlassCard>

        {/* Footer */}
        <InvitationFooter text={t("Invitation.footer")} />
      </div>
    </div>
  );
}
