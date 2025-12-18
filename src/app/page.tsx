import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Realsee Insider Access - Poincare Premiere",
  description:
    "Exclusive premiere event for the Poincare Device. Contact your business partner for an invitation.",
};

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

const stars = generateStars(60);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black text-white font-sans">
      {/* ===== Background Layer ===== */}
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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[160%] h-[160%] opacity-[0.08] blur-[2px]">
            <Image
              src="/images/poincare/poincare-transparent.png"
              alt="Poincare Device"
              fill
              className="object-contain filter drop-shadow-[0_0_100px_rgba(51,102,255,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Rotating HUD Rings */}
        <div
          className="absolute top-1/2 left-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] border border-brand/10 rounded-full"
          style={{
            animation: "rotate-slow 120s linear infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] border border-dashed border-purple-500/10 rounded-full"
          style={{
            animation: "rotate-slow 80s linear infinite reverse",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] border border-amber-500/5 rounded-full"
          style={{
            animation: "rotate-slow 60s linear infinite",
          }}
        />

        {/* Scanning Laser Effect */}
        <div
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand/40 to-transparent"
          style={{
            animation: "scan 4s ease-in-out infinite",
          }}
        />

        {/* Ambient Glows */}
        <div
          className="absolute top-1/4 left-1/4 w-[50vw] h-[40vh] bg-brand/5 blur-[150px] rounded-full"
          style={{ animation: "pulse-glow 8s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[30vh] bg-purple-600/5 blur-[120px] rounded-full"
          style={{
            animation: "pulse-glow 10s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vh] bg-amber-500/3 blur-[100px] rounded-full"
          style={{
            animation: "pulse-glow 6s ease-in-out infinite",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* ===== Content Layer ===== */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-10 w-full max-w-2xl">
        {/* Main Glass Card */}
        <div className="relative w-full bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col gap-8 shadow-[0_0_80px_rgba(51,102,255,0.15)]">
          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-brand/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-brand/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500/20 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500/20 rounded-br-lg" />

          {/* Brand Header */}
          <div className="text-center space-y-6">
            {/* Logo with decorative lines */}
            <div className="flex items-center justify-center gap-4 opacity-70">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand" />
              <Image
                src="/assets/realsee-logo-en-with-brands-wihte.svg"
                alt="Realsee"
                width={120}
                height={30}
                className="h-7 w-auto"
              />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand" />
            </div>

            {/* Subtitle */}
            <p className="text-brand-light text-[11px] md:text-xs tracking-[0.5em] uppercase font-light">
              — Insider Access —
            </p>

            {/* Main Title */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-brand-light leading-tight tracking-tight">
                Poincare Premiere
              </h1>
              <p className="text-gray-400 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">
                2025 Exclusive Event
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-2 h-2 bg-amber-500/30 rotate-45" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* Access Guidance */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center space-y-4">
            <div className="flex justify-center gap-8 md:gap-12">
              {/* VIP Badge */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30">
                  <svg
                    className="w-5 h-5 text-amber-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest">
                  Exclusive
                </span>
              </div>

              {/* Shield Badge */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-brand/20 to-brand/10 border border-brand/30">
                  <svg
                    className="w-5 h-5 text-brand-light"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest">
                  Premium
                </span>
              </div>

              {/* Crown Badge */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 17l3-9 5 4 2-10 2 10 5-4 3 9H2z" />
                    <path d="M2 17h20v4H2z" />
                  </svg>
                </div>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest">
                  Limited
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
              Please contact your business partner
              <br />
              <span className="text-brand-light">
                to receive an exclusive invitation link.
              </span>
            </p>
          </div>

          {/* Product Teaser */}
          <div className="flex justify-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(51,102,255,0.3)]">
              <Image
                src="/images/poincare/detail_1.jpg"
                alt="Poincare Device Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center opacity-40">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-white/20" />
            <span className="text-[8px] text-gray-500 tracking-[0.5em] uppercase">
              Powered by
            </span>
            <div className="h-[1px] w-8 bg-white/20" />
          </div>
          <p className="text-[10px] text-gray-500 tracking-widest">
            &copy; 2025 Realsee. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
