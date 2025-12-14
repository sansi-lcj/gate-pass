import React from 'react';
import Image from 'next/image';
import { InvitationBase } from './InvitationBase';

interface PoincareStyleProps {
  guestName: string;
  onAccept: () => void;
  onRefuse: () => void;
  status: string;
  discountCode?: string | null;
}

export const PoincareStyle = ({ guestName, onAccept, onRefuse, status, discountCode }: PoincareStyleProps) => {
  const isPending = status === 'PENDING';
  const isAccepted = status === 'ACCEPTED';

  return (
    <InvitationBase 
      className="bg-black text-white font-mono"
    >
        <div className="absolute inset-0 z-0">
             <Image 
                src="/images/poincare/hero.jpg" 
                alt="Poincare Background" 
                fill 
                className="object-cover opacity-50 blur-sm"
            />
        </div>

      <div className="relative z-10 bg-black/60 backdrop-blur-md border border-brand/50 p-8 rounded-2xl shadow-[0_0_50px_rgba(51,102,255,0.4)] text-center">
        <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-brand shadow-[0_0_20px_rgba(51,102,255,0.8)]">
                 <Image src="/images/poincare/detail_1.jpg" alt="Logo" fill className="object-cover" />
            </div>
        </div>
        
        <h1 className="text-sm tracking-[0.3em] text-brand-light mb-2 uppercase">Realsee 2025</h1>
        <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-brand-light to-brand-secondary">
          Poincaré Internal
        </h2>

        <div className="text-lg mb-8 space-y-2">
          <p className="text-gray-400 text-xs uppercase tracking-widest">Invited Guest</p>
          <p className="text-2xl font-light">{guestName}</p>
        </div>

        {isPending && (
          <div className="flex gap-4 justify-center">
            <button 
                onClick={onRefuse}
                className="px-6 py-2 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-800 transition text-sm uppercase tracking-wider"
            >
              Decline
            </button>
            <button 
                onClick={onAccept}
                className="px-8 py-2 bg-brand text-white rounded-lg shadow-[0_0_20px_rgba(51,102,255,0.5)] hover:bg-brand-light hover:shadow-[0_0_30px_rgba(51,102,255,0.7)] transition transform hover:scale-105 text-sm uppercase tracking-wider font-bold"
            >
              Accept Invite
            </button>
          </div>
        )}

        {isAccepted && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="p-4 bg-brand/10 border border-brand/30 rounded-lg">
                <p className="text-brand-light text-sm mb-2">Access Granted</p>
                <p className="text-xs text-gray-400 mb-1">Your Discount Code</p>
                <div className="text-2xl font-mono text-white tracking-widest border-2 border-dashed border-brand/50 p-2 rounded bg-black/50">
                    {discountCode || 'Generating...'}
                </div>
            </div>
            <p className="mt-4 text-xs text-gray-500">Please present this code at the event.</p>
          </div>
        )}
        
        {status === 'REJECTED' && (
             <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                <p className="text-gray-400">Invitation Declined.</p>
             </div>
        )}
      </div>
    </InvitationBase>
  );
};
