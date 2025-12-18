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

export default function Executive({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, honorific, guestName, localTime, status } = invitation;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col items-center justify-center relative overflow-hidden font-serif select-none">
      {/* Background Layer */}
      <SharedBackground
        starCount={30}
        primaryColor="amber-500"
        secondaryColor="slate-400"
        accentColor="amber-600"
        showScanLine={false}
        showDeviceImage={true}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 w-full max-w-2xl">
        <GlassCard
          topAccentColor="amber-500"
          bottomAccentColor="slate-500"
          glowColor="rgba(251,191,36,0.1)"
        >
          {/* Brand Header */}
          <div className="text-center space-y-6">
            <BrandHeader lineColor="amber-500" logoVariant="white" />

            <div className="space-y-3">
              {honorific && (
                <p className="text-amber-500/60 text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">
                  — {honorific} —
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-amber-200 tracking-wide">
                {guestName}
              </h2>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-black uppercase bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-amber-200 leading-tight tracking-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <DiamondDivider diamondColor="amber-500" lineColor="white" />

          {/* Badge Group */}
          <div className="bg-slate-800/50 border border-slate-700/30 rounded-2xl p-6 text-center space-y-4 shadow-lg">
            <BadgeGroup
              primaryColor="amber"
              secondaryColor="slate"
              accentColor="amber"
              labels={[
                t("Invitation.highlights.item1"),
                t("Invitation.highlights.item2"),
                t("Invitation.highlights.item3"),
              ]}
            />

            <div className="pt-2">
              <p className="text-amber-500/40 text-[9px] uppercase tracking-widest mb-1 italic font-sans">
                Premium Engagement
              </p>
              <p className="text-lg md:text-xl font-bold text-slate-100 tracking-tight">
                {localTime || "ASCERTAINING..."}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-slate-900 border border-slate-800 p-5 rounded-xl text-center shadow-inner"
              waitingTitleClassName="text-amber-400 text-lg font-black mb-1 uppercase tracking-widest"
              waitingHintClassName="text-slate-500 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-amber-600 hover:bg-amber-500 text-white font-black py-4 px-6 rounded-lg transition-all shadow-xl"
              codeLabelClassName="text-amber-500/30 text-[9px] uppercase tracking-[0.5em] mb-1"
              codeClassName="text-3xl md:text-4xl font-black text-white tracking-[0.3em] py-2"
              meetingLinkClassName="text-amber-500 underline mt-3 inline-block text-[11px] font-bold hover:text-white"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-black/40 text-slate-700 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest border border-slate-800"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-white text-slate-900 font-black py-4 rounded-xl shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-all text-sm uppercase tracking-[0.15em] hover:bg-amber-50"
              declineButtonClassName="px-5 border border-slate-700 text-slate-500 hover:text-white rounded-xl transition-all text-[10px] uppercase tracking-widest"
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
