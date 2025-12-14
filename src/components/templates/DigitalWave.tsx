'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { respondInvitation } from '@/app/invite/[uniqueToken]/action';
import { useTranslation } from 'react-i18next';
import { InvitationProps, formatLocalTime, isEventEnded } from './types';

export default function DigitalWave({ data }: InvitationProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState(data.status);
  const [localTime, setLocalTime] = useState('');
  const [loading, setLoading] = useState(false);
  const eventEnded = isEventEnded(data.eventEndTime);

  useEffect(() => {
    if (data.eventTime) setLocalTime(formatLocalTime(data.eventTime, data.language));
  }, [data.eventTime, data.language]);

  const handleAccept = async () => { setLoading(true); await respondInvitation(data.uniqueToken, 'ACCEPTED'); setStatus('ACCEPTED'); setLoading(false); };
  const handleDecline = async () => { setLoading(true); await respondInvitation(data.uniqueToken, 'DECLINED'); setStatus('DECLINED'); setLoading(false); };
  const handleReconsider = async () => { setLoading(true); await respondInvitation(data.uniqueToken, 'OPENED'); setStatus('OPENED'); setLoading(false); };

  const greeting = t('Invitation.greeting', { name: data.guestName });

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-slate-900 to-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Wave Background */}
      <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-30" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="rgba(6, 182, 212, 0.3)" d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,128C672,139,768,213,864,229.3C960,245,1056,203,1152,165.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        <path fill="rgba(6, 182, 212, 0.2)" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
      
      {/* Main Card */}
      <div className="relative z-10 bg-slate-900/80 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-8 md:p-12 max-w-2xl w-[95%] shadow-2xl">
        
        {/* Brand */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image src="/assets/realsee-logo-en-with-brands-wihte.svg" alt="Realsee" width={150} height={40} className="h-8 w-auto" />
          <span className="text-cyan-400 text-sm bg-cyan-500/10 px-3 py-1 rounded-lg">POINCARÉ</span>
        </div>

        <p className="text-cyan-300 text-lg mb-2 text-center">{greeting}</p>

        <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 mb-2">
          {status === 'ACCEPTED' ? t('Invitation.accepted_title') : t('Invitation.title')}
        </h1>
        <p className="text-slate-400 text-center mb-8">{t('Invitation.subtitle')}</p>

        {/* Event Details */}
        <div className="bg-cyan-950/50 border-l-4 border-cyan-500 p-6 my-8 rounded-r-xl">
          <p className="text-cyan-400 text-sm">{t('Invitation.event_time_label')}</p>
          <p className="text-2xl text-white font-medium">{localTime || '...'}</p>
          <p className="text-slate-500 text-xs">{t('Invitation.event_time_local')}</p>
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-cyan-300">🎯 {t('Invitation.highlights.item1')}</p>
            <p className="text-teal-300">💰 {t('Invitation.highlights.item2')}</p>
            <p className="text-emerald-300">🎬 {t('Invitation.highlights.item3')}</p>
          </div>
        </div>

        {eventEnded && <div className="bg-slate-800 text-slate-300 p-4 rounded-xl mb-6 text-center">{t('Invitation.event_ended')}</div>}

        {status === 'ACCEPTED' && data.discountCode && (
          <div className="bg-gradient-to-r from-cyan-900/50 to-teal-900/50 border border-cyan-500/30 rounded-xl p-6 mb-8 text-center">
            <p className="text-cyan-300 text-sm">{t('Invitation.code_label')}</p>
            <p className="text-3xl font-bold text-white tracking-widest mt-2">{data.discountCode}</p>
            {data.meetingLink && <a href={data.meetingLink} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline mt-4 inline-block">{t('Invitation.meeting_link_label')}</a>}
          </div>
        )}

        {status === 'DECLINED' && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-8 text-center">
            <p className="text-red-400">{t('Invitation.declined_title')}</p>
            <p className="text-slate-400 text-sm">{t('Invitation.declined_desc')}</p>
            {!eventEnded && <button onClick={handleReconsider} disabled={loading} className="text-cyan-400 underline mt-4">{t('Invitation.reconsider_btn')}</button>}
          </div>
        )}

        {(status === 'PENDING' || status === 'OPENED') && !eventEnded && (
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <button onClick={handleAccept} disabled={loading} className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 disabled:opacity-50">
              {t('Invitation.accept_btn')}
            </button>
            <button onClick={handleDecline} disabled={loading} className="border border-slate-600 text-slate-400 hover:border-red-500 hover:text-red-400 py-4 px-8 rounded-xl transition-all disabled:opacity-50">
              {t('Invitation.decline_btn')}
            </button>
          </div>
        )}

        {status === 'ACCEPTED' && (
          <div className="text-center mt-4">
            <span className="inline-block bg-teal-500/20 text-teal-400 font-bold border border-teal-500/50 px-6 py-3 rounded-full">✓ {t('Invitation.accepted_desc')}</span>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-600 text-xs">{t('Invitation.footer')} © 2025</p>
        </div>
      </div>
    </div>
  );
}
