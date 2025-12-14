'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { respondInvitation } from '@/app/invite/[uniqueToken]/action';
import { useTranslation } from 'react-i18next';
import { InvitationProps, formatLocalTime, isEventEnded } from './types';

export default function CorporateBlue({ data }: InvitationProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur rounded-lg shadow-2xl p-8 md:p-12 max-w-2xl w-full">
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-blue-600">
          <Image src="/assets/realsee-logo-en-with-brands-black.svg" alt="Realsee" width={140} height={36} className="h-8 w-auto" />
          <span className="text-blue-600 font-bold text-sm">POINCARÉ</span>
        </div>

        <p className="text-blue-600 text-lg mb-2">{greeting}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {status === 'ACCEPTED' ? t('Invitation.accepted_title') : t('Invitation.title')}
        </h1>
        <p className="text-gray-500 mb-8">{t('Invitation.subtitle')}</p>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
          <p className="text-blue-700 text-sm font-medium">{t('Invitation.event_time_label')}</p>
          <p className="text-2xl text-gray-800 font-bold">{localTime || '...'}</p>
          <p className="text-gray-400 text-xs">{t('Invitation.event_time_local')}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">{t('Invitation.highlights.item1')}</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">{t('Invitation.highlights.item2')}</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">{t('Invitation.highlights.item3')}</span>
          </div>
        </div>

        {eventEnded && <div className="bg-gray-100 text-gray-500 p-4 rounded mb-6 text-center">{t('Invitation.event_ended')}</div>}

        {status === 'ACCEPTED' && data.discountCode && (
          <div className="bg-blue-600 text-white p-6 rounded-lg mb-8 text-center">
            <p className="text-blue-200 text-sm">{t('Invitation.code_label')}</p>
            <p className="text-3xl font-bold tracking-widest mt-2">{data.discountCode}</p>
            {data.meetingLink && <a href={data.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-200 underline mt-4 inline-block">{t('Invitation.meeting_link_label')}</a>}
          </div>
        )}

        {status === 'DECLINED' && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-8 text-center">
            <p className="text-red-600">{t('Invitation.declined_title')}</p>
            <p className="text-gray-500 text-sm">{t('Invitation.declined_desc')}</p>
            {!eventEnded && <button onClick={handleReconsider} disabled={loading} className="text-blue-600 underline mt-4">{t('Invitation.reconsider_btn')}</button>}
          </div>
        )}

        {(status === 'PENDING' || status === 'OPENED') && !eventEnded && (
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <button onClick={handleAccept} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg transition-all disabled:opacity-50">
              {t('Invitation.accept_btn')}
            </button>
            <button onClick={handleDecline} disabled={loading} className="border-2 border-gray-300 text-gray-500 hover:border-red-300 hover:text-red-500 py-4 px-10 rounded-lg transition-all disabled:opacity-50">
              {t('Invitation.decline_btn')}
            </button>
          </div>
        )}

        {status === 'ACCEPTED' && (
          <div className="text-center mt-4">
            <span className="inline-block bg-green-100 text-green-600 font-bold border border-green-300 px-6 py-3 rounded-full">✓ {t('Invitation.accepted_desc')}</span>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-xs">{t('Invitation.footer')} © 2025</p>
        </div>
      </div>
    </div>
  );
}
