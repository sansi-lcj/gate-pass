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

export default function TechFuture({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, honorific, guestName, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      {/* Background Layer */}
      <SharedBackground
        starCount={60}
        primaryColor="blue-500"
        secondaryColor="purple-500"
        accentColor="cyan-500"
        showScanLine={true}
        showDeviceImage={true}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 w-full max-w-2xl">
        <GlassCard
          topAccentColor="blue-500"
          bottomAccentColor="cyan-500"
          glowColor="rgba(59,130,246,0.15)"
        >
          {/* Brand Header */}
          <div className="text-center space-y-6">
            <BrandHeader lineColor="blue-500" logoVariant="white" />

            <div className="space-y-3">
              {honorific && (
                <p className="text-blue-400/60 text-[10px] md:text-xs tracking-[0.5em] uppercase font-light">
                  — {honorific} —
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-white to-blue-300 tracking-wide">
                {guestName}
              </h2>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-white to-blue-300 leading-tight tracking-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-gray-400 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <DiamondDivider diamondColor="cyan-500" lineColor="white" />

          {/* Badge Group */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center space-y-4">
            <BadgeGroup
              primaryColor="cyan"
              secondaryColor="blue"
              accentColor="purple"
              labels={[
                t("Invitation.highlights.item1"),
                t("Invitation.highlights.item2"),
                t("Invitation.highlights.item3"),
              ]}
            />

            <div className="pt-2">
              <p className="text-blue-400/40 text-[9px] uppercase tracking-widest mb-1">
                Scheduled Access
              </p>
              <p className="text-lg md:text-xl font-bold font-mono text-white tracking-tight">
                {localTime || "SESSION PENDING"}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-center"
              waitingTitleClassName="text-blue-400 text-base font-bold mb-1"
              waitingHintClassName="text-blue-300/30 text-[9px] uppercase tracking-[0.2em]"
              joinButtonClassName="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 px-6 rounded-lg shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all"
              codeLabelClassName="text-blue-400/40 text-[9px] mb-1 font-mono uppercase tracking-[0.5em]"
              codeClassName="text-3xl md:text-4xl font-black text-white tracking-[0.3em] py-2"
              meetingLinkClassName="inline-block mt-3 text-blue-400 underline text-xs font-mono hover:text-blue-200"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-white/5 border border-white/5 text-gray-500 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-white text-black font-black py-4 px-6 rounded-xl hover:bg-blue-500 hover:text-white transition-all text-sm uppercase tracking-[0.15em] shadow-xl"
              declineButtonClassName="px-5 border border-white/10 text-gray-500 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
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
