'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { respondInvitation } from '@/app/invite/[uniqueToken]/action';
import { useTranslation } from 'react-i18next';
import { InvitationProps, formatLocalTime, isEventEnded } from './types';

export default function LuxuryGold({ data }: InvitationProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Gold Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V36h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative z-10 bg-stone-900/90 border border-amber-500/30 rounded-sm p-8 md:p-12 max-w-2xl w-full shadow-2xl"
        style={{ boxShadow: '0 0 60px rgba(212, 175, 55, 0.15)' }}>
        
        <div className="text-center mb-8 pb-6 border-b border-amber-500/30">
          <Image src="/assets/realsee-logo-en-with-brands-wihte.svg" alt="Realsee" width={140} height={36} className="h-8 w-auto mx-auto" />
          <p className="text-amber-400 text-xs tracking-[0.5em] mt-4 font-light">POINCARÉ COLLECTION</p>
        </div>

        <p className="text-amber-200/80 text-lg text-center font-light italic">{greeting}</p>
        <h1 className="text-3xl md:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 text-center my-4 tracking-wide">
          {status === 'ACCEPTED' ? t('Invitation.accepted_title') : t('Invitation.title')}
        </h1>
        <p className="text-stone-400 text-center text-sm">{t('Invitation.subtitle')}</p>

        <div className="border border-amber-500/20 bg-stone-800/50 p-6 my-8 text-center">
          <p className="text-amber-400/70 text-xs uppercase tracking-widest">{t('Invitation.event_time_label')}</p>
          <p className="text-2xl text-amber-100 font-light mt-2">{localTime || '...'}</p>
          <p className="text-stone-500 text-xs mt-1">{t('Invitation.event_time_local')}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-amber-300/80">
            <span>★ {t('Invitation.highlights.item1')}</span>
            <span>★ {t('Invitation.highlights.item2')}</span>
            <span>★ {t('Invitation.highlights.item3')}</span>
          </div>
        </div>

        {eventEnded && <div className="bg-stone-800 text-stone-400 p-4 mb-6 text-center">{t('Invitation.event_ended')}</div>}

        {status === 'ACCEPTED' && data.discountCode && (
          <div className="bg-gradient-to-r from-amber-900/30 via-amber-800/30 to-amber-900/30 border border-amber-500/40 p-8 mb-8 text-center">
            <p className="text-amber-400/70 text-xs uppercase tracking-widest">{t('Invitation.code_label')}</p>
            <p className="text-4xl font-light text-amber-200 tracking-[0.2em] mt-4">{data.discountCode}</p>
            {data.meetingLink && <a href={data.meetingLink} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline mt-6 inline-block text-sm">{t('Invitation.meeting_link_label')}</a>}
          </div>
        )}

        {status === 'DECLINED' && (
          <div className="bg-red-900/20 border border-red-500/30 p-6 mb-8 text-center">
            <p className="text-red-400">{t('Invitation.declined_title')}</p>
            <p className="text-stone-400 text-sm">{t('Invitation.declined_desc')}</p>
            {!eventEnded && <button onClick={handleReconsider} disabled={loading} className="text-amber-400 underline mt-4 text-sm">{t('Invitation.reconsider_btn')}</button>}
          </div>
        )}

        {(status === 'PENDING' || status === 'OPENED') && !eventEnded && (
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <button onClick={handleAccept} disabled={loading} className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-900 font-semibold py-4 px-10 transition-all disabled:opacity-50">
              {t('Invitation.accept_btn')}
            </button>
            <button onClick={handleDecline} disabled={loading} className="border border-stone-600 text-stone-400 hover:border-red-500/50 hover:text-red-400 py-4 px-10 transition-all disabled:opacity-50">
              {t('Invitation.decline_btn')}
            </button>
          </div>
        )}

        {status === 'ACCEPTED' && (
          <div className="text-center mt-6">
            <span className="inline-block bg-green-900/30 text-green-400 border border-green-500/30 px-6 py-3">✓ {t('Invitation.accepted_desc')}</span>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-amber-500/20 text-center">
          <p className="text-stone-600 text-xs">{t('Invitation.footer')} © 2025</p>
        </div>
      </div>
    </div>
  );
}
