'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { respondInvitation } from '@/app/invite/[uniqueToken]/action';
import { useTranslation } from 'react-i18next';
import { InvitationProps, formatLocalTime, isEventEnded } from './types';

export default function Executive({ data }: InvitationProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4">
      {/* Main Card - Premium Paper Style */}
      <div className="bg-white rounded-sm shadow-2xl p-8 md:p-16 max-w-2xl w-full border-t-4 border-amber-600">
        
        {/* Brand */}
        <div className="flex items-center justify-between mb-12 border-b border-slate-200 pb-6">
          <Image src="/assets/realsee-logo-en-with-brands-black.svg" alt="Realsee" width={140} height={36} className="h-8 w-auto" />
          <span className="text-amber-700 text-sm font-serif tracking-widest">POINCARÉ</span>
        </div>

        {/* Greeting */}
        <p className="text-slate-600 text-lg font-serif mb-4">{greeting}</p>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 font-serif">
          {status === 'ACCEPTED' ? t('Invitation.accepted_title') : t('Invitation.title')}
        </h1>
        <p className="text-slate-500 mb-10">{t('Invitation.subtitle')}</p>

        {/* Event Details */}
        <div className="bg-slate-50 p-6 my-8 border border-slate-200">
          <p className="text-amber-700 text-sm uppercase tracking-wider font-semibold">{t('Invitation.event_time_label')}</p>
          <p className="text-2xl text-slate-800 font-semibold mt-1">{localTime || 'Loading...'}</p>
          <p className="text-slate-400 text-xs mt-1">{t('Invitation.event_time_local')}</p>
          <ul className="mt-6 space-y-2 text-slate-600">
            <li className="flex items-center gap-2"><span className="text-amber-600">▪</span> {t('Invitation.highlights.item1')}</li>
            <li className="flex items-center gap-2"><span className="text-amber-600">▪</span> {t('Invitation.highlights.item2')}</li>
            <li className="flex items-center gap-2"><span className="text-amber-600">▪</span> {t('Invitation.highlights.item3')}</li>
          </ul>
        </div>

        {eventEnded && <div className="bg-slate-100 text-slate-500 p-4 mb-6 text-center border">{t('Invitation.event_ended')}</div>}

        {status === 'ACCEPTED' && data.discountCode && (
          <div className="bg-amber-50 border-2 border-amber-200 p-6 mb-8 text-center">
            <p className="text-amber-700 text-sm">{t('Invitation.code_label')}</p>
            <p className="text-3xl font-bold text-slate-800 tracking-widest mt-2 font-mono">{data.discountCode}</p>
            {data.meetingLink && <a href={data.meetingLink} target="_blank" rel="noopener noreferrer" className="text-amber-700 underline mt-4 inline-block">{t('Invitation.meeting_link_label')}</a>}
          </div>
        )}

        {status === 'DECLINED' && (
          <div className="bg-red-50 border border-red-200 p-6 mb-8 text-center">
            <p className="text-red-700">{t('Invitation.declined_title')}</p>
            <p className="text-slate-500 text-sm">{t('Invitation.declined_desc')}</p>
            {!eventEnded && <button onClick={handleReconsider} disabled={loading} className="text-amber-700 underline mt-4">{t('Invitation.reconsider_btn')}</button>}
          </div>
        )}

        {(status === 'PENDING' || status === 'OPENED') && !eventEnded && (
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <button onClick={handleAccept} disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-10 transition-all disabled:opacity-50">
              {t('Invitation.accept_btn')}
            </button>
            <button onClick={handleDecline} disabled={loading} className="border-2 border-slate-300 text-slate-500 hover:border-red-300 hover:text-red-500 py-4 px-10 transition-all disabled:opacity-50">
              {t('Invitation.decline_btn')}
            </button>
          </div>
        )}

        {status === 'ACCEPTED' && (
          <div className="text-center mt-6">
            <span className="inline-block bg-green-50 text-green-700 font-semibold border border-green-200 px-6 py-3">
              ✓ {t('Invitation.accepted_desc')}
            </span>
          </div>
        )}

        <div className="mt-16 pt-6 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-xs font-serif">{t('Invitation.footer')} © 2025</p>
        </div>
      </div>
    </div>
  );
}
