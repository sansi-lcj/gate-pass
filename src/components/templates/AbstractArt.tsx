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
  ProductPreview,
  InvitationFooter,
} from "@/components/invitation";
import { useMemo } from "react";

export default function AbstractArt({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  // Generate stable abstract shapes
  const shapes = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        size: 80 + ((i * 30) % 100),
        left: (i * 12) % 100,
        top: (i * 15) % 100,
        rotate: i * 45,
        color: i % 3 === 0 ? "rose" : i % 3 === 1 ? "violet" : "cyan",
      })),
    []
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-stone-900 flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      {/* Background Layer - Light Theme with Abstract Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Abstract geometric shapes */}
        {shapes.map((shape, i) => (
          <div
            key={i}
            className={`absolute rounded-full blur-[80px] opacity-20 ${
              shape.color === "rose"
                ? "bg-rose-400"
                : shape.color === "violet"
                ? "bg-violet-400"
                : "bg-cyan-400"
            }`}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              left: `${shape.left}%`,
              top: `${shape.top}%`,
              transform: `rotate(${shape.rotate}deg)`,
            }}
          />
        ))}

        {/* Full-screen Device Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[130%] h-[130%] opacity-[0.06] mix-blend-multiply">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter grayscale"
              priority
            />
          </div>
        </div>

        {/* Rotating rings */}
        <div
          className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] border border-violet-200/30 rounded-full rotate-3"
          style={{ animation: "rotate-slow 100s linear infinite" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] border border-dashed border-rose-200/20 rounded-full -rotate-3"
          style={{ animation: "rotate-slow 80s linear infinite reverse" }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 w-full max-w-2xl">
        {/* Light Theme Glass Card */}
        <div
          className="relative w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-stone-200 rounded-3xl p-8 md:p-12 flex flex-col gap-8"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}
        >
          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-violet-300/50 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-rose-300/50 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-300/50 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-violet-300/50 rounded-br-lg" />

          {/* Brand Header */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="w-12 h-[2px] bg-gradient-to-r from-rose-400 via-violet-400 to-cyan-400" />
              <Image
                src="/assets/realsee-logo-en-with-brands-color.svg"
                alt="Realsee"
                width={120}
                height={30}
                className="h-7 w-auto"
              />
              <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400" />
            </div>

            <p className="text-violet-500 text-[11px] md:text-xs tracking-[0.5em] uppercase font-medium">
              — {greeting} —
            </p>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-violet-500 to-cyan-500 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-stone-400 text-[10px] md:text-xs tracking-[0.4em] uppercase">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <DiamondDivider diamondColor="violet-500" lineColor="stone-900" />

          {/* Badge Group */}
          <div className="bg-gradient-to-r from-rose-50 via-violet-50 to-cyan-50 border border-stone-100 rounded-2xl p-6 text-center space-y-4">
            <BadgeGroup
              primaryColor="rose"
              secondaryColor="violet"
              accentColor="cyan"
              labels={[
                t("Invitation.highlights.item1"),
                t("Invitation.highlights.item2"),
                t("Invitation.highlights.item3"),
              ]}
            />

            <div className="pt-2">
              <p className="text-violet-400 text-[9px] uppercase tracking-widest mb-1">
                Creative Session
              </p>
              <p className="text-lg md:text-xl font-bold text-stone-800">
                {localTime || "COMPOSING..."}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-3">
            <AcceptedContent
              invitation={invitation}
              containerClassName="bg-gradient-to-r from-rose-50 via-violet-50 to-cyan-50 border border-stone-100 p-5 rounded-xl text-center"
              waitingTitleClassName="text-violet-600 text-lg font-bold mb-1"
              waitingHintClassName="text-stone-400 text-[10px] uppercase tracking-widest"
              joinButtonClassName="w-full bg-gradient-to-r from-rose-500 via-violet-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg"
              codeLabelClassName="text-violet-400 text-[9px] uppercase tracking-[0.4em] mb-1"
              codeClassName="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-violet-500 to-cyan-500 tracking-[0.2em] py-2"
              meetingLinkClassName="text-violet-500 underline mt-3 inline-block text-[11px] hover:text-violet-700"
            />

            <EventEndedBanner
              invitation={invitation}
              className="bg-stone-50 text-stone-400 p-3 rounded-lg text-center text-[10px] uppercase tracking-widest border border-stone-100"
            />

            <ActionButtons
              invitation={invitation}
              className="flex gap-3"
              acceptButtonClassName="flex-1 bg-gradient-to-r from-rose-500 via-violet-500 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-xl transition-all text-sm uppercase tracking-wider"
              declineButtonClassName="px-5 border border-stone-200 text-stone-400 hover:text-stone-900 rounded-xl transition-all text-[10px] uppercase tracking-widest"
            />
          </div>

          {/* Product Preview */}
          <ProductPreview glowColor="rgba(139,92,246,0.2)" />
        </div>

        {/* Footer */}
        <InvitationFooter text={t("Invitation.footer")} className="opacity-30" />
      </div>
    </div>
  );
}
