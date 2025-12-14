'use client';

import { useActionState, useState, useEffect } from 'react';
import { createInvitationAction } from './action';
import { getTemplate, StyleConfig } from '@/components/templates/registry';
import type { InvitationProps } from '@/components/templates/types';
import I18nProvider from '@/components/providers/I18nProvider';

// Preview messages (for template preview only)
const previewMessages = {
  Invitation: {
    greeting: "尊敬的 {name}，",
    title: "Poincaré 内购会 2025",
    subtitle: "专属邀请 | 限时优惠",
    event_time_label: "活动时间",
    event_time_local: "(您当地时间)",
    highlights: {
      item1: "首次内购体验",
      item2: "内部专属价格",
      item3: "产品现场演示"
    },
    benefits_title: "专属权益",
    benefits_desc: "接受邀请解锁折扣码",
    accept_btn: "接受邀请",
    decline_btn: "无法参加",
    accepted_title: "感谢您！",
    accepted_desc: "您的折扣码已生成",
    code_label: "您的折扣码",
    meeting_link_label: "加入会议",
    declined_title: "感谢反馈",
    declined_desc: "很遗憾您无法参加",
    declined_miss: "您将错过专属优惠",
    reconsider_btn: "重新考虑？",
    event_ended: "本次活动已结束",
    footer: "如影随形海外科技"
  }
};

export default function CreateForm({ styles }: { styles: StyleConfig[] }) {
  const [state, action, isPending] = useActionState(createInvitationAction, null);
  const [selectedStyleKey, setSelectedStyleKey] = useState(styles[0]?.key);
  const [formData, setFormData] = useState({
    guestName: '嘉宾姓名',
    language: 'zh-CN',
  });

  const selectedStyle = styles.find(s => s.key === selectedStyleKey);
  const PreviewComponent = selectedStyle ? getTemplate(selectedStyle.key) : null;

  const handleValuesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Complete preview data for template
  const previewData: InvitationProps['data'] = {
    id: 'preview',
    guestName: formData.guestName || '嘉宾姓名',
    uniqueToken: 'preview-token',
    discountCode: null,
    status: 'PENDING',
    language: formData.language,
    eventTime: '2025-06-15T14:30:00+08:00',
    eventEndTime: null,
    meetingLink: null,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-100px)]">
      {/* Configuration Panel */}
      <div className="w-full lg:w-1/3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 dark:text-white">创建邀请函</h2>
        <form action={action} className="space-y-6">
           {/* Style Selector */}
           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">模板样式</label>
             <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
               {styles.map((style) => (
                 <div 
                   key={style.key}
                   onClick={() => setSelectedStyleKey(style.key)}
                   className={`cursor-pointer border-2 rounded-lg p-2 transition-all ${selectedStyleKey === style.key ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'}`}
                 >
                    <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-md mb-2"></div>
                    <p className="text-xs font-medium dark:text-gray-300 truncate">{style.name}</p>
                 </div>
               ))}
             </div>
             <input type="hidden" name="styleKey" value={selectedStyleKey} />
           </div>

           {/* Guest Info */}
           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">嘉宾姓名 *</label>
             <input
               name="guestName"
               type="text"
               required
               onChange={handleValuesChange}
               placeholder="例如：张三"
               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent dark:text-white"
             />
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">邀请函语言</label>
             <select 
               name="language" 
               defaultValue="zh-CN"
               onChange={handleValuesChange}
               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent dark:text-white"
             >
               <option value="zh-CN">简体中文</option>
               <option value="zh-TW">繁體中文</option>
               <option value="en">English</option>
               <option value="ja">日本語</option>
               <option value="ko">한국어</option>
               <option value="ar">العربية (阿拉伯语)</option>
               <option value="he">עברית (希伯来语)</option>
               <option value="id">Bahasa Indonesia</option>
               <option value="ms">Bahasa Melayu (马来语)</option>
               <option value="th">ภาษาไทย (泰语)</option>
               <option value="vi">Tiếng Việt (越南语)</option>
               <option value="de">Deutsch (德语)</option>
               <option value="fr">Français (法语)</option>
               <option value="es">Español (西班牙语)</option>
               <option value="pt">Português (葡萄牙语)</option>
               <option value="ru">Русский (俄语)</option>
             </select>
           </div>
           
           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">销售备注 (内部)</label>
             <textarea
               name="salesNote"
               rows={2}
               placeholder="关于此嘉宾的内部备注..."
               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent dark:text-white resize-none"
             />
           </div>

           {state?.error && (
             <p className="text-red-500 text-sm">{state.error}</p>
           )}

           <button
             type="submit"
             disabled={isPending}
             className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md shadow-lg transition-all disabled:opacity-50"
           >
             {isPending ? '生成中...' : '生成邀请函'}
           </button>
        </form>
      </div>

      {/* Live Preview */}
      <div className="w-full lg:w-2/3 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden relative flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black flex justify-between items-center">
           <span className="text-sm font-medium dark:text-gray-300">实时预览 ({selectedStyle?.name})</span>
           <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
           </div>
        </div>
        <div className="flex-1 overflow-auto bg-white relative">
           <div className="h-full w-full transform origin-top scale-[0.6] lg:scale-75">
              {PreviewComponent ? (
                <I18nProvider locale={formData.language} resources={previewMessages}>
                  <PreviewComponent data={previewData} />
                </I18nProvider>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">请选择模板样式</div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
