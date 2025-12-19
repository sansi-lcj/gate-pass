"use client";

import { ReactNode } from "react";

export interface GlassCardProps {
  children: ReactNode;
  /** Top corners accent color (e.g., "brand", "blue-500") */
  topAccentColor?: string;
  /** Bottom corners accent color (e.g., "amber-500", "purple-500") */
  bottomAccentColor?: string;
  /** Card glow shadow color for box-shadow */
  glowColor?: string;
  /** Additional className for the card */
  className?: string;
  /** Max width class (default: "max-w-2xl") */
  maxWidthClass?: string;
}

export function GlassCard({
  children,
  topAccentColor = "brand",
  bottomAccentColor = "amber-500",
  glowColor = "rgba(51,102,255,0.15)",
  className = "",
  maxWidthClass = "max-w-2xl",
}: GlassCardProps) {
  return (
    <div
      className={`relative w-full ${maxWidthClass} bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col gap-8 ${className}`}
      style={{
        boxShadow: `0 0 80px ${glowColor}`,
      }}
    >
      {/* Corner Decorations - Top */}
      <div
        className={`absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-${topAccentColor}/30 rounded-tl-lg`}
      />
      <div
        className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-${topAccentColor}/30 rounded-tr-lg`}
      />

      {/* Corner Decorations - Bottom */}
      <div
        className={`absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-${bottomAccentColor}/20 rounded-bl-lg`}
      />
      <div
        className={`absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-${bottomAccentColor}/20 rounded-br-lg`}
      />

      {children}
    </div>
  );
}

export default GlassCard;

