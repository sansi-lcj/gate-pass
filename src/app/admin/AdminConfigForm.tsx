'use client';

import { useActionState } from 'react';
import { updateSystemConfigAction } from './actions';

interface ConfigFormProps {
  config: {
    eventTime: string | null;
    eventEndTime: string | null;
    meetingLink: string | null;
    wecomWebhook: string | null;
  } | null;
}

export default function AdminConfigForm({ config }: ConfigFormProps) {
  const [state, action, isPending] = useActionState(updateSystemConfigAction, null);

  return (
    <form action={action} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Event Start Time (ISO 8601)</label>
          <input
            name="eventTime"
            type="text"
            defaultValue={config?.eventTime || ''}
            placeholder="2025-06-15T14:30:00+08:00"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Event End Time (ISO 8601)</label>
          <input
            name="eventEndTime"
            type="text"
            defaultValue={config?.eventEndTime || ''}
            placeholder="2025-06-15T17:00:00+08:00"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Meeting Link (Zoom/Teams)</label>
        <input
          name="meetingLink"
          type="url"
          defaultValue={config?.meetingLink || ''}
          placeholder="https://zoom.us/j/..."
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">WeCom Webhook URL</label>
        <input
          name="wecomWebhook"
          type="url"
          defaultValue={config?.wecomWebhook || ''}
          placeholder="https://qyapi.weixin.qq.com/cgi-bin/webhook/..."
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        />
        <p className="text-xs text-gray-500 mt-1">Notifications will be sent to this webhook when guests accept/decline</p>
      </div>

      {state?.error && (
        <p className="text-red-400 text-sm">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-green-400 text-sm">Configuration saved successfully!</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        {isPending ? 'Saving...' : 'Save Configuration'}
      </button>
    </form>
  );
}
