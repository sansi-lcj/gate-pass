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

export default function NatureGreen({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, honorific, guestName, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1f0a] to-[#051505] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      {/* Background Layer */}
      <SharedBackground
        starCount={45}
        primaryColor="green-500"
        secondaryColor="emerald-500"
        accentColor="green-400"
        showScanLine={false}
        showDeviceImage={true}
      />

      {/* Organic leaf pattern overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="leafPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M15 5 Q20 15 15 25 Q10 15 15 5" fill="none" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#leafPattern)" />
        </svg>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 w-full max-w-2xl">
        <GlassCard
          topAccentColor="green-500"
          bottomAccentColor="emerald-500"
          glowColor="rgba(34,197,94,0.15)"
        >
          {/* Brand Header */}
          <div className="text-center space-y-6">
            <BrandHeader lineColor="green-500" logoVariant="white" />

            <div className="space-y-3">
              {honorific && (
                <p className="text-green-400/60 text-[10px] md:text-xs tracking-[0.5em] uppercase font-medium">
                  — {honorific} —
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-white to-emerald-300 tracking-wide">
                {guestName}
              </h2>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-white to-emerald-300 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-green-200/30 text-[10px] md:text-xs tracking-[0.4em] uppercase">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <DiamondDivider diamondColor="emerald-500" lineColor="white" />

          {/* Badge Group */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6 text-center space-y-4">
            <BadgeGroup
              primaryColor="green"
              secondaryColor="emerald"
              accentColor="green"
              labels={[
                t("Invitation.highlights.item1"),
                t("Invitation.highlights.item2"),
                t("Invitation.highlights.item3"),
              ]}
            />

            <div className="pt-2">
              <p className="text-green-400/40 text-[9px] uppercase tracking-widest mb-1">
                Sustainable Session
              </p>
              <p className="text-lg md:text-xl font-bold text-white">
                {localTime || "GROWING..."}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-green-500/10 border border-green-500/20 p-5 rounded-xl text-center"
              waitingTitleClassName="text-green-400 text-lg font-bold mb-1"
              waitingHintClassName="text-green-200/30 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg"
              codeLabelClassName="text-green-400/40 text-[9px] uppercase tracking-[0.4em] mb-1"
              codeClassName="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200 tracking-[0.2em] py-2"
              meetingLinkClassName="text-green-400 underline mt-3 inline-block text-[11px] hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-black/30 text-green-200/30 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest border border-green-500/10"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold py-4 rounded-xl shadow-xl transition-all text-sm uppercase tracking-wider"
              declineButtonClassName="px-5 border border-green-500/30 text-green-200/50 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>

          {/* Product Preview */}
          <ProductPreview glowColor="rgba(34,197,94,0.3)" />
        </GlassCard>

        {/* Footer */}
        <InvitationFooter text={t("Invitation.footer")} />
      </div>
    </div>
  );
}
