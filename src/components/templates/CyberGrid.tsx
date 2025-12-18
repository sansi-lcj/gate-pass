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

export default function CyberGrid({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, honorific, guestName, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-mono select-none">
      {/* Background Layer */}
      <SharedBackground
        starCount={40}
        primaryColor="purple-500"
        secondaryColor="fuchsia-500"
        accentColor="violet-500"
        showScanLine={true}
        showDeviceImage={true}
      />

      {/* Additional Cyber Grid Effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(168, 85, 247, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transform: "perspective(1000px) rotateX(45deg) translateY(-20%)",
          transformOrigin: "center top",
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 w-full max-w-2xl">
        <GlassCard
          topAccentColor="purple-500"
          bottomAccentColor="fuchsia-500"
          glowColor="rgba(168,85,247,0.15)"
        >
          {/* Brand Header */}
          <div className="text-center space-y-6">
            <BrandHeader lineColor="purple-500" logoVariant="white" />

            <div className="space-y-3">
              {honorific && (
                <p className="text-purple-400/60 text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold animate-pulse">
                  — {honorific} —
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-white to-fuchsia-400 tracking-wide">
                {guestName}
              </h2>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-black uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-white to-fuchsia-400 leading-tight tracking-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-stone-500 text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <DiamondDivider diamondColor="fuchsia-500" lineColor="white" />

          {/* Badge Group */}
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6 text-center space-y-4">
            <BadgeGroup
              primaryColor="purple"
              secondaryColor="fuchsia"
              accentColor="violet"
              labels={[
                t("Invitation.highlights.item1"),
                t("Invitation.highlights.item2"),
                t("Invitation.highlights.item3"),
              ]}
            />

            <div className="pt-2">
              <p className="text-purple-400/40 text-[9px] uppercase tracking-widest mb-1">
                Authorization Time
              </p>
              <p className="text-lg md:text-xl font-black text-white tracking-widest">
                {localTime || "ENCRYPTING..."}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-purple-600/10 border border-purple-500/30 p-5 rounded-xl text-center shadow-[0_0_40px_rgba(168,85,247,0.1)]"
              waitingTitleClassName="text-purple-400 text-lg font-black mb-1 uppercase tracking-widest"
              waitingHintClassName="text-stone-500 text-[10px] uppercase tracking-[0.2em]"
              joinButtonClassName="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:to-fuchsia-500 text-white font-black py-4 px-6 rounded-lg transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)]"
              codeLabelClassName="text-purple-400/40 text-[9px] uppercase tracking-[0.5em] mb-1"
              codeClassName="text-3xl md:text-4xl font-black text-white tracking-[0.2em] py-2"
              meetingLinkClassName="text-purple-400 underline mt-3 inline-block text-[11px] hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-white/5 border border-white/5 text-stone-600 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-white text-black font-black py-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-purple-600 hover:text-white transition-all text-sm uppercase tracking-[0.15em]"
              declineButtonClassName="px-6 border border-purple-500/30 text-stone-600 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>

          {/* Product Preview */}
          <ProductPreview glowColor="rgba(168,85,247,0.3)" />
        </GlassCard>

        {/* Footer */}
        <InvitationFooter text={t("Invitation.footer")} />
      </div>
    </div>
  );
}
