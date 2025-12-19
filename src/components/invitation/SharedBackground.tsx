"use client";

import Image from "next/image";
import { useMemo } from "react";

export interface SharedBackgroundProps {
  /** Number of stars in the background (default: 60) */
  starCount?: number;
  /** Primary color for HUD ring and effects (e.g., "brand", "blue-500", "indigo-500") */
  primaryColor?: string;
  /** Secondary color for dashed HUD ring (e.g., "purple-500", "violet-500") */
  secondaryColor?: string;
  /** Accent color for inner HUD ring and glow (e.g., "amber-500", "cyan-500") */
  accentColor?: string;
  /** Whether to show the scanning laser line (default: true) */
  showScanLine?: boolean;
  /** Whether to show the Poincare device background image (default: true) */
  showDeviceImage?: boolean;
  /** Custom background color class (default: "bg-black") */
  bgColorClass?: string;
}

// Generate stable star positions for the background
function generateStars(count: number) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: `${(i * 7.3 + 13) % 100}%`,
    top: `${(i * 13.7 + 7) % 100}%`,
    opacity: 0.2 + (i % 7) * 0.1,
    delay: `${(i % 8) * 0.5}s`,
    duration: `${2 + (i % 5)}s`,
    size: i % 5 === 0 ? 2 : 1,
  }));
}

export function SharedBackground({
  starCount = 60,
  primaryColor = "brand",
  secondaryColor = "purple-500",
  accentColor = "amber-500",
  showScanLine = true,
  showDeviceImage = true,
}: SharedBackgroundProps) {
  const stars = useMemo(() => generateStars(starCount), [starCount]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Animated Star Field */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              opacity: star.opacity,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* Full-screen Poincare Device Background - "犹抱琵琶半遮面" */}
      {showDeviceImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[160%] h-[160%] opacity-[0.08] blur-[2px]">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className={`object-contain filter drop-shadow-[0_0_100px_rgba(51,102,255,0.3)]`}
              priority
            />
          </div>
        </div>
      )}

      {/* Rotating HUD Rings - 3 layers with different colors and speeds */}
      <div
        className={`absolute top-1/2 left-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] border border-${primaryColor}/10 rounded-full`}
        style={{
          animation: "rotate-slow 120s linear infinite",
        }}
      />
      <div
        className={`absolute top-1/2 left-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] border border-dashed border-${secondaryColor}/10 rounded-full`}
        style={{
          animation: "rotate-slow 80s linear infinite reverse",
        }}
      />
      <div
        className={`absolute top-1/2 left-1/2 w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] border border-${accentColor}/5 rounded-full`}
        style={{
          animation: "rotate-slow 60s linear infinite",
        }}
      />

      {/* Scanning Laser Effect */}
      {showScanLine && (
        <div
          className={`absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-${primaryColor}/40 to-transparent`}
          style={{
            animation: "scan 4s ease-in-out infinite",
          }}
        />
      )}

      {/* Ambient Glows - Multiple layers with pulse animation */}
      <div
        className={`absolute top-1/4 left-1/4 w-[50vw] h-[40vh] bg-${primaryColor}/5 blur-[150px] rounded-full`}
        style={{ animation: "pulse-glow 8s ease-in-out infinite" }}
      />
      <div
        className={`absolute bottom-1/4 right-1/4 w-[40vw] h-[30vh] bg-${secondaryColor}/5 blur-[120px] rounded-full`}
        style={{
          animation: "pulse-glow 10s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vh] bg-${accentColor}/3 blur-[100px] rounded-full`}
        style={{
          animation: "pulse-glow 6s ease-in-out infinite",
          animationDelay: "4s",
        }}
      />
    </div>
  );
}

export default SharedBackground;

