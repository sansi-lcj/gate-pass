'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { respondInvitation } from '@/app/invite/[uniqueToken]/action';
import { useTranslation } from 'react-i18next';
import { InvitationProps, formatLocalTime, isEventEnded } from './types';

export default function MinimalWhite({ data }: InvitationProps) {
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-xl w-full py-16">
        
        <div className="flex items-center justify-center gap-6 mb-16">
          <Image src="/assets/realsee-logo-en-with-brands-black.svg" alt="Realsee" width={120} height={32} className="h-6 w-auto opacity-80" />
          <div className="w-px h-6 bg-gray-300" />
          <span className="text-gray-400 text-xs tracking-[0.3em]">POINCARÉ</span>
        </div>

        <p className="text-gray-500 text-center">{greeting}</p>
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 text-center my-4 tracking-tight">
          {status === 'ACCEPTED' ? t('Invitation.accepted_title') : t('Invitation.title')}
        </h1>
        <p className="text-gray-400 text-center text-sm">{t('Invitation.subtitle')}</p>

        <div className="my-16 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest">{t('Invitation.event_time_label')}</p>
          <p className="text-2xl text-gray-900 font-light mt-2">{localTime || '...'}</p>
          <p className="text-gray-300 text-xs mt-1">{t('Invitation.event_time_local')}</p>
        </div>

        <div className="flex justify-center gap-8 text-gray-500 text-sm mb-16">
          <span>{t('Invitation.highlights.item1')}</span>
          <span>{t('Invitation.highlights.item2')}</span>
          <span>{t('Invitation.highlights.item3')}</span>
        </div>

        {eventEnded && <div className="bg-gray-50 text-gray-400 p-4 mb-8 text-center">{t('Invitation.event_ended')}</div>}

        {status === 'ACCEPTED' && data.discountCode && (
          <div className="border border-gray-200 p-8 mb-8 text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest">{t('Invitation.code_label')}</p>
            <p className="text-3xl font-light text-gray-900 tracking-[0.2em] mt-4">{data.discountCode}</p>
            {data.meetingLink && <a href={data.meetingLink} target="_blank" rel="noopener noreferrer" className="text-gray-500 underline mt-6 inline-block text-sm">{t('Invitation.meeting_link_label')}</a>}
          </div>
        )}

        {status === 'DECLINED' && (
          <div className="border border-gray-200 p-6 mb-8 text-center">
            <p className="text-gray-600">{t('Invitation.declined_title')}</p>
            <p className="text-gray-400 text-sm mt-2">{t('Invitation.declined_desc')}</p>
            {!eventEnded && <button onClick={handleReconsider} disabled={loading} className="text-gray-500 underline mt-4 text-sm">{t('Invitation.reconsider_btn')}</button>}
          </div>
        )}

        {(status === 'PENDING' || status === 'OPENED') && !eventEnded && (
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={handleAccept} disabled={loading} className="bg-gray-900 hover:bg-gray-800 text-white py-4 px-12 transition-all disabled:opacity-50">
              {t('Invitation.accept_btn')}
            </button>
            <button onClick={handleDecline} disabled={loading} className="border border-gray-300 text-gray-400 hover:border-gray-900 hover:text-gray-900 py-4 px-12 transition-all disabled:opacity-50">
              {t('Invitation.decline_btn')}
            </button>
          </div>
        )}

        {status === 'ACCEPTED' && (
          <div className="text-center mt-8">
            <span className="inline-block text-green-600 text-sm">✓ {t('Invitation.accepted_desc')}</span>
          </div>
        )}

        <div className="mt-20 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-300 text-xs">{t('Invitation.footer')} © 2025</p>
        </div>
      </div>
    </div>
  );
}
