'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { respondInvitation } from '@/app/invite/[uniqueToken]/action';
import { InvitationProps, formatLocalTime, isEventEnded } from './types';

import { useTranslation } from 'react-i18next';

export default function TechFuture({ data }: InvitationProps) {
  const { t } = useTranslation(); // Use 'Invitation' namespace if keys are nested, but provider loads under 'translation' namespace by default. 
  // Wait, in provider I loaded resources: { [locale]: { translation: resources } }.
  // The structure of resources (JSON) is { Invitation: { ... }, Dashboard: { ... } }.
  // So t('Invitation.greeting') should be correct.
  // OR I can use namespace if I loaded it differently. 
  // Let's stick to default namespace 'translation' and use dot notation: t('Invitation.greeting'). 
  // Or I can destructure: const { t } = useTranslation(); 
  
  const [status, setStatus] = useState(data.status);
  const [localTime, setLocalTime] = useState('');
  const [loading, setLoading] = useState(false);
  const eventEnded = isEventEnded(data.eventEndTime);

  useEffect(() => {
    // Format to user's local time
    if (data.eventTime) {
      setLocalTime(formatLocalTime(data.eventTime, data.language));
    }
  }, [data.eventTime, data.language]);

  const handleAccept = async () => {
    setLoading(true);
    await respondInvitation(data.uniqueToken, 'ACCEPTED');
    setStatus('ACCEPTED');
    setLoading(false);
  };

  const handleDecline = async () => {
    setLoading(true);
    await respondInvitation(data.uniqueToken, 'DECLINED');
    setStatus('DECLINED');
    setLoading(false);
  };

  const handleReconsider = async () => {
    setLoading(true);
    await respondInvitation(data.uniqueToken, 'OPENED');
    setStatus('OPENED');
    setLoading(false);
  };

  // Replace placeholder in greeting
  const greeting = t('Invitation.greeting', { name: data.guestName });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center relative overflow-hidden font-mono">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
      </div>
      
      {/* Main Card */}
      <div className="relative z-10 border border-blue-500 bg-black/60 p-6 md:p-12 backdrop-blur-md max-w-2xl w-[95%] md:w-full"
        style={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }}>
        
        {/* [1] Brand Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image 
            src="/assets/realsee-logo-en-with-brands-wihte.svg" 
            alt="Realsee" 
            width={150} 
            height={40}
            className="h-8 w-auto"
          />
          <span className="text-blue-400 text-sm border border-blue-400 px-2 py-1">POINCARÉ</span>
        </div>

        {/* [2] Greeting */}
        <p className="text-blue-300 text-lg mb-2">{greeting}</p>

        {/* [3] Event Title */}
        <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-widest text-blue-500 mb-2">
          {status === 'ACCEPTED' ? t('Invitation.accepted_title') : t('Invitation.title')}
        </h1>
        <p className="text-gray-400 text-sm mb-8">{t('Invitation.subtitle')}</p>

        {/* [4] Event Details */}
        <div className="text-left border-l-2 border-blue-500 pl-6 my-8">
          <p className="text-gray-500 text-sm uppercase">{t('Invitation.event_time_label')}</p>
          <p className="text-xl text-white mb-1">{localTime || 'Loading...'}</p>
          <p className="text-gray-500 text-xs">{t('Invitation.event_time_local')}</p>

          <div className="mt-6 space-y-2">
            <p className="text-blue-400">🎯 {t('Invitation.highlights.item1')}</p>
            <p className="text-blue-400">💰 {t('Invitation.highlights.item2')}</p>
            <p className="text-blue-400">🎬 {t('Invitation.highlights.item3')}</p>
          </div>
        </div>

        {/* Event Ended Banner */}
        {eventEnded && (
          <div className="bg-gray-800 border border-gray-600 text-gray-300 p-4 mb-6 text-center">
            {t('Invitation.event_ended')}
          </div>
        )}

        {/* [5] Benefits / Code Section */}
        {status === 'ACCEPTED' && data.discountCode && (
          <div className="bg-blue-950/50 border border-blue-500 p-6 mb-8 text-center">
            <p className="text-blue-400 text-sm mb-2">{t('Invitation.code_label')}</p>
            <p className="text-3xl md:text-4xl font-black text-white tracking-widest animate-pulse">
              {data.discountCode}
            </p>
            {data.meetingLink && (
              <a 
                href={data.meetingLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline"
              >
                {t('Invitation.meeting_link_label')} →
              </a>
            )}
          </div>
        )}

        {/* Declined State */}
        {status === 'DECLINED' && (
          <div className="bg-red-950/30 border border-red-500/50 p-6 mb-8 text-center">
            <p className="text-red-400 mb-2">{t('Invitation.declined_title')}</p>
            <p className="text-gray-400 text-sm">{t('Invitation.declined_desc')}</p>
            {!eventEnded && (
              <button
                onClick={handleReconsider}
                disabled={loading}
                className="mt-4 text-blue-400 hover:text-blue-300 underline text-sm"
              >
                {t('Invitation.reconsider_btn')}
              </button>
            )}
          </div>
        )}

        {/* [6] Action Buttons */}
        {(status === 'PENDING' || status === 'OPENED') && !eventEnded && (
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <button 
              onClick={handleAccept}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 transform skew-x-[-5deg] transition-all hover:scale-105 disabled:opacity-50"
            >
              <span className="inline-block skew-x-[5deg]">{t('Invitation.accept_btn')}</span>
            </button>
            <button 
              onClick={handleDecline}
              disabled={loading}
              className="bg-transparent border border-red-500/50 text-red-400 hover:bg-red-500/10 font-bold py-4 px-8 transform skew-x-[-5deg] transition-all disabled:opacity-50"
            >
              <span className="inline-block skew-x-[5deg]">{t('Invitation.decline_btn')}</span>
            </button>
          </div>
        )}

        {/* Accepted Badge */}
        {status === 'ACCEPTED' && (
          <div className="text-center mt-4">
            <span className="inline-block text-green-400 font-bold border-2 border-green-500 px-6 py-3 transform -rotate-2">
              ✓ {t('Invitation.accepted_desc')}
            </span>
          </div>
        )}

        {/* [7] Footer */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-600 text-xs">{t('Invitation.footer')} © 2025</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
