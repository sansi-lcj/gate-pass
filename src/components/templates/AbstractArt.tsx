"use client";

import Image from "next/image";
import {
  useInvitation,
  AcceptedContent,
  ActionButtons,
  EventEndedBanner,
} from "@/components/invitation";
import { InvitationProps } from "./types";
import { useMemo } from "react";

export default function AbstractArt({ data }: InvitationProps) {
  const invitation = useInvitation(data);
  const { t, greeting, localTime, status } = invitation;

  // Generate stable abstract shapes
  const shapes = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        size: 80 + (i * 30) % 100,
        left: (i * 12) % 100,
        top: (i * 15) % 100,
        rotate: i * 45,
        color: i % 3 === 0 ? "rose" : i % 3 === 1 ? "violet" : "cyan",
      })),
    []
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-stone-900 flex flex-col relative overflow-hidden select-none font-sans">
      {/* Background Layer: Full-screen Device with mysterious reveal */}
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

        {/* Full-screen Device Background - "犹抱琵琶半遮面" */}
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

        {/* Artistic frame */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] border border-stone-200/50 rounded-3xl rotate-3" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        {/* Main Panel */}
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-stone-200 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          {/* Brand Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="w-8 h-[2px] bg-gradient-to-r from-rose-400 via-violet-400 to-cyan-400" />
              <Image
                src="/assets/realsee-logo-en-with-brands-color.svg"
                alt="Realsee"
                width={90}
                height={22}
                className="h-5 w-auto"
              />
              <div className="w-8 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400" />
            </div>

            <p className="text-violet-500 text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
              {greeting}
            </p>

            <div className="space-y-2">
              <h1 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-violet-500 to-cyan-500 leading-tight">
                {status === "ACCEPTED"
                  ? t("Invitation.accepted_title")
                  : t("Invitation.title")}
              </h1>
              <p className="text-stone-400 text-[10px] md:text-xs tracking-[0.2em] uppercase">
                {t("Invitation.subtitle")}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-gradient-to-r from-rose-50 via-violet-50 to-cyan-50 border border-stone-100 p-4 rounded-xl">
            <div className="text-center">
              <p className="text-violet-400 text-[9px] uppercase tracking-widest mb-1">
                Creative Session
              </p>
              <p className="text-lg md:text-xl font-bold text-stone-800">
                {localTime || "COMPOSING..."}
              </p>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              {["item1", "item2", "item3"].map((key, i) => (
                <div key={key} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      i === 0 ? "bg-rose-400" : i === 1 ? "bg-violet-400" : "bg-cyan-400"
                    }`}
                  />
                  <span className="text-[8px] text-stone-500 uppercase tracking-tight text-center leading-tight max-w-[50px]">
                    {t(`Invitation.highlights.${key}`)}
                  </span>
                </div>
              ))}
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
        </div>

        {/* Footer */}
        <div className="mt-6 opacity-30 text-center">
          <p className="text-[9px] text-stone-400 tracking-[0.5em] uppercase">
            {t("Invitation.footer")}
          </p>
        </div>
      </div>
    </div>
  );
}
