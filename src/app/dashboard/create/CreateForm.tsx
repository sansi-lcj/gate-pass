"use client";

import { useActionState, useState, useEffect, useMemo } from "react";
import { createInvitationAction, getMessagesAction } from "./action";
import { getTemplate, StyleConfig } from "@/components/templates/registry";
import type { InvitationProps } from "@/components/templates/types";
import I18nProvider from "@/components/providers/I18nProvider";
import TemplateSelector from "@/components/TemplateSelector";
import PreviewFrame from "@/components/PreviewFrame";

function getDir(lang: string) {
  return ["ar", "he"].includes(lang) ? "rtl" : "ltr";
}

export default function CreateForm({ styles }: { styles: StyleConfig[] }) {
  const [state, action, isPending] = useActionState(
    createInvitationAction,
    null
  );
  const [selectedStyleKey, setSelectedStyleKey] = useState<string>(
    styles[0]?.key || "TechFuture"
  );
  const [formData, setFormData] = useState({
    guestName: "",
    language: "zh-CN",
    salesNote: "",
    discountCode: "",
  });
  const [messagesState, setMessagesState] = useState<{
    language: string;
    data: Record<string, unknown>;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const targetLanguage = formData.language;
    
    getMessagesAction(targetLanguage).then((msgs) => {
      if (!cancelled) {
        setMessagesState({ language: targetLanguage, data: msgs });
      }
    });
    
    return () => { cancelled = true; };
  }, [formData.language]);
  
  // Only render preview when messages match the current language
  const messages = messagesState?.language === formData.language ? messagesState.data : null;

  const selectedStyle = styles.find((s) => s.key === selectedStyleKey);

  const PreviewComponent = useMemo(() => {
    return selectedStyleKey ? getTemplate(selectedStyleKey) : null;
  }, [selectedStyleKey]);

  const handleValuesChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const previewData: InvitationProps["data"] = {
    id: "preview",
    guestName: formData.guestName || "嘉宾姓名",
    uniqueToken: "preview-token",
    discountCode: null,
    status: "PENDING",
    language: formData.language,
    eventTime: "2025-06-15T14:30:00+08:00",
    eventEndTime: null,
    meetingLink: null,
  };

  const canSubmit = formData.guestName.trim() && selectedStyleKey;

  return (
    <div className="h-screen flex">
      {/* ===== LEFT: Editor Panel ===== */}
      <div className="w-[380px] lg:w-[420px] bg-white dark:bg-black border-r border-gray-200 dark:border-zinc-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
          <h1 className="text-2xl font-bold dark:text-white flex items-center gap-2">
            <span className="text-3xl">✨</span>
            创建邀请函
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            填写信息，实时预览效果
          </p>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Template Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              🎨 选择模板
            </label>
            <TemplateSelector
              styles={styles}
              selectedStyleKey={selectedStyleKey}
              onSelect={setSelectedStyleKey}
            />
          </div>

          {/* Guest Name */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-500 transition-colors">
              👤 嘉宾姓名 <span className="text-red-500">*</span>
            </label>
            <input
              name="guestName"
              type="text"
              value={formData.guestName}
              onChange={handleValuesChange}
              placeholder="例如：张三 / John Doe"
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
              autoFocus
            />
          </div>

          {/* Language */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-500 transition-colors">
              🌐 语言
            </label>
            <div className="relative">
              <select
                name="language"
                value={formData.language}
                onChange={handleValuesChange}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none appearance-none transition-all hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <option value="zh-CN">🇨🇳 简体中文</option>
                <option value="zh-TW">🇨🇳 繁體中文</option>
                <option value="en">🇺🇸 English</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="ko">🇰🇷 한국어</option>
                <option value="ar">🇸🇦 العربية</option>
                <option value="id">🇮🇩 Indonesia</option>
                <option value="th">🇹🇭 ภาษาไทย</option>
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="es">🇪🇸 Español</option>
                <option value="pt">🇧🇷 Português</option>
                <option value="ru">🇷🇺 Русский</option>
                <option value="ms">🇲🇾 Bahasa Melayu</option>
                <option value="he">🇮🇱 עברית</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Discount Code */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-500 transition-colors">
              🎫 专属优惠码{" "}
              <span className="text-gray-300 dark:text-gray-600">(可选)</span>
            </label>
            <input
              name="discountCode"
              type="text"
              value={formData.discountCode}
              onChange={handleValuesChange}
              placeholder="例如：VIP2025、POINCARE-SALE"
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600 font-mono uppercase"
            />
            <p className="text-xs text-gray-400 mt-1">
              嘉宾接受邀请后，在会议开始时才会展示此优惠码
            </p>
          </div>

          {/* Internal Note */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-500 transition-colors">
              📝 内部备注{" "}
              <span className="text-gray-300 dark:text-gray-600">(可选)</span>
            </label>
            <textarea
              name="salesNote"
              rows={2}
              value={formData.salesNote}
              onChange={handleValuesChange}
              placeholder="添加关于嘉宾的备注信息..."
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-900 dark:text-white resize-none focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all hover:bg-gray-100 dark:hover:bg-zinc-800"
            />
            <p className="text-xs text-gray-400 mt-1">
              此备注仅内部可见，不会显示在邀请函中
            </p>
          </div>
        </div>

        {/* Footer - Submit Button */}
        <div className="p-6 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
          {/* Summary Card */}
          <div className="mb-4 p-3 bg-white dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">模板</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {selectedStyle?.nameZh || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-500">嘉宾</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formData.guestName || "-"}
              </span>
            </div>
            {formData.discountCode && (
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-500">优惠码</span>
                <span className="font-mono font-medium text-green-600 dark:text-green-400">
                  {formData.discountCode}
                </span>
              </div>
            )}
          </div>

          <form action={action}>
            <input type="hidden" name="styleKey" value={selectedStyleKey} />
            <input type="hidden" name="guestName" value={formData.guestName} />
            <input type="hidden" name="language" value={formData.language} />
            <input type="hidden" name="salesNote" value={formData.salesNote} />
            <input
              type="hidden"
              name="discountCode"
              value={formData.discountCode}
            />

            {state?.error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit || isPending}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-zinc-700 dark:disabled:to-zinc-600 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  生成邀请函
                  <span className="text-lg">🚀</span>
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-3">
            生成后将获得专属邀请链接和二维码
          </p>
        </div>
      </div>

      {/* ===== RIGHT: Preview Panel ===== */}
      <div className="flex-1 min-w-0">
        <PreviewFrame>
          {PreviewComponent && messages ? (
            <div dir={getDir(formData.language)} className="min-h-full">
              <I18nProvider locale={formData.language} resources={messages}>
                {/* eslint-disable-next-line react-hooks/static-components -- Dynamic template selection */}
                <PreviewComponent data={previewData} />
              </I18nProvider>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                <p>正在加载预览...</p>
              </div>
            </div>
          )}
        </PreviewFrame>
      </div>
    </div>
  );
}
