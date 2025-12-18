"use client";

import Image from "next/image";
import { ReactNode } from "react";

// ============================================
// Diamond Divider Component
// ============================================
export interface DiamondDividerProps {
  /** Diamond color class (e.g., "amber-500", "brand") */
  diamondColor?: string;
  /** Line gradient direction */
  lineColor?: string;
}

export function DiamondDivider({
  diamondColor = "amber-500",
  lineColor = "white",
}: DiamondDividerProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div
        className={`h-[1px] flex-1 bg-gradient-to-r from-transparent to-${lineColor}/10`}
      />
      <div className={`w-2 h-2 bg-${diamondColor}/30 rotate-45`} />
      <div
        className={`h-[1px] flex-1 bg-gradient-to-l from-transparent to-${lineColor}/10`}
      />
    </div>
  );
}

// ============================================
// Badge Component (Single)
// ============================================
export interface BadgeProps {
  /** Badge icon - can be SVG element or custom node */
  icon: ReactNode;
  /** Badge label text */
  label: string;
  /** Gradient from color */
  gradientFrom?: string;
  /** Gradient to color */
  gradientTo?: string;
  /** Border color */
  borderColor?: string;
  /** Icon color */
  iconColor?: string;
}

export function Badge({
  icon,
  label,
  gradientFrom = "amber-500",
  gradientTo = "amber-600",
  borderColor = "amber-500",
  iconColor = "amber-400",
}: BadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-${gradientFrom}/20 to-${gradientTo}/10 border border-${borderColor}/30`}
      >
        <div className={`text-${iconColor}`}>{icon}</div>
      </div>
      <span className="text-[9px] text-gray-500 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

// ============================================
// Badge Group Component (3 badges)
// ============================================
export interface BadgeGroupProps {
  /** Primary badge color theme */
  primaryColor?: string;
  /** Secondary badge color theme */
  secondaryColor?: string;
  /** Accent badge color theme */
  accentColor?: string;
  /** Badge labels */
  labels?: [string, string, string];
}

// Star icon
const StarIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// Shield icon
const ShieldIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

// Crown icon
const CrownIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M2 17l3-9 5 4 2-10 2 10 5-4 3 9H2z" />
    <path d="M2 17h20v4H2z" />
  </svg>
);

export function BadgeGroup({
  primaryColor = "amber",
  secondaryColor = "brand",
  accentColor = "purple",
  labels = ["Exclusive", "Premium", "Limited"],
}: BadgeGroupProps) {
  return (
    <div className="flex justify-center gap-8 md:gap-12">
      <Badge
        icon={<StarIcon />}
        label={labels[0]}
        gradientFrom={`${primaryColor}-500`}
        gradientTo={`${primaryColor}-600`}
        borderColor={`${primaryColor}-500`}
        iconColor={`${primaryColor}-400`}
      />
      <Badge
        icon={<ShieldIcon />}
        label={labels[1]}
        gradientFrom={secondaryColor}
        gradientTo={secondaryColor}
        borderColor={secondaryColor}
        iconColor={`${secondaryColor}-light`}
      />
      <Badge
        icon={<CrownIcon />}
        label={labels[2]}
        gradientFrom={`${accentColor}-500`}
        gradientTo={`${accentColor}-600`}
        borderColor={`${accentColor}-500`}
        iconColor={`${accentColor}-400`}
      />
    </div>
  );
}

// ============================================
// Brand Header Component
// ============================================
export interface BrandHeaderProps {
  /** Line accent color */
  lineColor?: string;
  /** Logo variant: "white" or "color" */
  logoVariant?: "white" | "color";
  /** Logo width */
  logoWidth?: number;
  /** Logo height */
  logoHeight?: number;
}

export function BrandHeader({
  lineColor = "brand",
  logoVariant = "white",
  logoWidth = 120,
  logoHeight = 30,
}: BrandHeaderProps) {
  const logoSrc =
    logoVariant === "white"
      ? "/assets/realsee-logo-en-with-brands-wihte.svg"
      : "/assets/realsee-logo-en-with-brands-color.svg";

  return (
    <div className="flex items-center justify-center gap-4 opacity-70">
      <div
        className={`h-[1px] w-12 bg-gradient-to-r from-transparent to-${lineColor}`}
      />
      <Image
        src={logoSrc}
        alt="Realsee"
        width={logoWidth}
        height={logoHeight}
        className="h-7 w-auto"
      />
      <div
        className={`h-[1px] w-12 bg-gradient-to-l from-transparent to-${lineColor}`}
      />
    </div>
  );
}

// ============================================
// Product Preview Circle Component
// ============================================
export interface ProductPreviewProps {
  /** Image source */
  imageSrc?: string;
  /** Alt text */
  alt?: string;
  /** Glow color for box-shadow */
  glowColor?: string;
  /** Size class */
  sizeClass?: string;
}

export function ProductPreview({
  imageSrc = "/images/poincare/detail_1.jpg",
  alt = "Poincare Device Preview",
  glowColor = "rgba(51,102,255,0.3)",
  sizeClass = "w-24 h-24 md:w-32 md:h-32",
}: ProductPreviewProps) {
  return (
    <div className="flex justify-center">
      <div
        className={`relative ${sizeClass} rounded-full overflow-hidden border border-white/10`}
        style={{ boxShadow: `0 0 40px ${glowColor}` }}
      >
        <Image src={imageSrc} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    </div>
  );
}

// ============================================
// Footer Component
// ============================================
export interface InvitationFooterProps {
  /** Footer text */
  text?: string;
  /** Additional className */
  className?: string;
}

export function InvitationFooter({
  text = "© 2025 Realsee. All rights reserved.",
  className = "",
}: InvitationFooterProps) {
  return (
    <div className={`mt-8 text-center opacity-40 ${className}`}>
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="h-[1px] w-8 bg-white/20" />
        <span className="text-[8px] text-gray-500 tracking-[0.5em] uppercase">
          Powered by
        </span>
        <div className="h-[1px] w-8 bg-white/20" />
      </div>
      <p className="text-[10px] text-gray-500 tracking-widest">{text}</p>
    </div>
  );
}

// Named exports are preferred, default export removed to avoid warning
