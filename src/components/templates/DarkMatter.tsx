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

export default function DarkMatter({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, honorific, guestName, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      {/* Background Layer */}
      <SharedBackground
        starCount={50}
        primaryColor="indigo-500"
        secondaryColor="violet-500"
        accentColor="purple-500"
        showScanLine={false}
        showDeviceImage={true}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 w-full max-w-2xl">
        <GlassCard
          topAccentColor="indigo-500"
          bottomAccentColor="purple-500"
          glowColor="rgba(99,102,241,0.15)"
        >
          {/* Brand Header */}
          <div className="text-center space-y-6">
            <BrandHeader lineColor="indigo-500" logoVariant="white" />

            <div className="space-y-3">
              {honorific && (
                <p className="text-gray-400/60 text-[10px] md:text-xs tracking-[0.5em] uppercase font-light">
                  — {honorific} —
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-light bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-violet-200 tracking-widest">
                {guestName}
              </h2>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-light bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-violet-200 leading-tight tracking-widest">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light italic">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <DiamondDivider diamondColor="violet-500" lineColor="white" />

          {/* Badge Group */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center space-y-4">
            <BadgeGroup
              primaryColor="indigo"
              secondaryColor="violet"
              accentColor="purple"
              labels={[
                t("Invitation.highlights.item1"),
                t("Invitation.highlights.item2"),
                t("Invitation.highlights.item3"),
              ]}
            />

            <div className="pt-2">
              <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">
                Celestial Alignment
              </p>
              <p className="text-lg md:text-xl font-light text-white tracking-tight">
                {localTime || "ASCERTAINING..."}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-white/5 border border-white/10 p-5 rounded-xl text-center"
              waitingTitleClassName="text-white text-lg font-light mb-1 tracking-widest"
              waitingHintClassName="text-gray-500 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-white text-black font-black py-4 px-6 rounded-lg transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              codeLabelClassName="text-gray-500 text-[9px] uppercase tracking-[0.4em] mb-1"
              codeClassName="text-3xl md:text-4xl font-light text-white tracking-[0.2em] py-2"
              meetingLinkClassName="text-indigo-400 underline mt-3 inline-block text-[10px] uppercase tracking-widest hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-white/5 border border-white/5 text-gray-600 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 border border-white/10 text-white font-black py-4 rounded-xl shadow-xl transition-all text-sm uppercase tracking-[0.2em] hover:from-black hover:to-black"
              declineButtonClassName="px-5 border border-white/5 text-gray-600 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>

          {/* Product Preview */}
          <ProductPreview glowColor="rgba(99,102,241,0.3)" />
        </GlassCard>

        {/* Footer */}
        <InvitationFooter text={t("Invitation.footer")} />
      </div>
    </div>
  );
}
