import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poincare Purchase - Realsee 2025",
  description:
    "Exclusive purchase meeting for the Poincare Device. Contact your business partner for an invitation.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black text-white font-mono">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/poincare/hero.jpg"
          alt="Poincare Background"
          fill
          className="object-cover opacity-50 blur-sm"
          priority
        />
      </div>

      <div className="relative z-10 bg-black/60 backdrop-blur-md border border-brand/50 p-8 rounded-2xl shadow-[0_0_50px_rgba(51,102,255,0.4)] text-center max-w-md w-full mx-4">
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-brand shadow-[0_0_20px_rgba(51,102,255,0.8)]">
            <Image
              src="/images/poincare/detail_1.jpg"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <h1 className="text-sm tracking-[0.3em] text-brand-light mb-2 uppercase">
          Realsee Overseas 2025
        </h1>
        <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-brand-light to-brand-secondary">
          Poincare Internal Purchase
        </h2>

        <div className="text-lg mb-8 space-y-4">
          <p className="text-gray-300 font-light">
            Please contact your business partner to get an exclusive invitation
            link.
          </p>
        </div>

        <div className="text-xs text-gray-500 mt-8">
          &copy; 2025 Realsee. All rights reserved.
        </div>
      </div>
    </div>
  );
}
