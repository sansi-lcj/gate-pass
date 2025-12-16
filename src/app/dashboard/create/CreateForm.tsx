"use client";

import { useActionState, useState, useEffect, useMemo } from "react";
import { createInvitationAction, getMessagesAction } from "./action";
import { getTemplate, StyleConfig } from "@/components/templates/registry";
import type { InvitationProps } from "@/components/templates/types";
import I18nProvider from "@/components/providers/I18nProvider";
import Image from "next/image";

function getDir(lang: string) {
  return ["ar", "he"].includes(lang) ? "rtl" : "ltr";
}

// Template categories
const CATEGORIES = [
  { key: "all", label: "全部", labelEn: "All" },
  { key: "tech", label: "科技", labelEn: "Tech" },
  { key: "business", label: "商务", labelEn: "Business" },
  { key: "creative", label: "创意", labelEn: "Creative" },
  { key: "regional", label: "地域", labelEn: "Regional" },
];

function getCategory(key: string) {
  if (["TechFuture", "CyberGrid", "DigitalWave"].includes(key)) return "tech";
  if (["Executive", "CorporateBlue", "MinimalWhite"].includes(key))
    return "business";
  if (["LuxuryGold", "AbstractArt", "DarkMatter"].includes(key))
    return "creative";
  if (["OrientalInk", "ArabicGeometry", "NatureGreen"].includes(key))
    return "regional";
  return "other";
}

function getCategoryColor(key: string) {
  const colors: Record<string, string> = {
    tech: "from-blue-500 to-cyan-500",
    business: "from-gray-600 to-gray-800",
    creative: "from-purple-500 to-pink-500",
    regional: "from-amber-500 to-orange-500",
  };
  return colors[getCategory(key)] || "from-gray-500 to-gray-600";
}

// Step indicator component
function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "选择模板" },
    { num: 2, label: "填写信息" },
    { num: 3, label: "确认生成" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
              currentStep >= step.num
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500"
            }`}
          >
            {currentStep > step.num ? "✓" : step.num}
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              currentStep >= step.num
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-400"
            }`}
          >
            {step.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`w-16 h-0.5 mx-4 ${
                currentStep > step.num
                  ? "bg-blue-600"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CreateForm({ styles }: { styles: StyleConfig[] }) {
  const [state, action, isPending] = useActionState(
    createInvitationAction,
    null
  );
  const [step, setStep] = useState(1);
  const [selectedStyleKey, setSelectedStyleKey] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [formData, setFormData] = useState({
    guestName: "",
    language: "zh-CN",
    salesNote: "",
  });
  const [messages, setMessages] = useState<Record<string, unknown> | null>(
    null
  );

  useEffect(() => {
    getMessagesAction(formData.language).then(setMessages);
  }, [formData.language]);

  const selectedStyle = styles.find((s) => s.key === selectedStyleKey);

  const PreviewComponent = useMemo(() => {
    return selectedStyle ? getTemplate(selectedStyle.key) : null;
  }, [selectedStyle]);

  const filteredStyles = useMemo(() => {
    if (selectedCategory === "all") return styles;
    return styles.filter((s) => getCategory(s.key) === selectedCategory);
  }, [styles, selectedCategory]);

  const handleSelectTemplate = (key: string) => {
    setSelectedStyleKey(key);
    setStep(2);
  };

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

  // Step 1: Template Selection
  if (step === 1) {
    return (
      <div className="min-h-[calc(100vh-120px)] p-6">
        <StepIndicator currentStep={1} />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white mb-2">
            选择邀请函模板
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            选择一个适合的模板风格开始创建
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filteredStyles.map((style) => (
            <div
              key={style.key}
              onClick={() => handleSelectTemplate(style.key)}
              className="group cursor-pointer"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                {/* Template Preview Card */}
                <div
                  className={`h-48 bg-gradient-to-br ${getCategoryColor(
                    style.key
                  )} relative overflow-hidden`}
                >
                  {/* Decorative pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full" />
                    <div className="absolute bottom-4 left-4 w-24 h-24 border border-white rounded-full" />
                  </div>
                  {/* Product image hint */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 opacity-40">
                    <Image
                      src="/images/poincare/poincare-transparent.png"
                      alt="Poincaré"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                      选择此模板 →
                    </span>
                  </div>
                </div>
                {/* Template name */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    {style.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {getCategory(style.key) === "tech" && "科技风格"}
                    {getCategory(style.key) === "business" && "商务风格"}
                    {getCategory(style.key) === "creative" && "创意风格"}
                    {getCategory(style.key) === "regional" && "地域特色"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Form + Preview
  if (step === 2) {
    return (
      <div className="min-h-[calc(100vh-120px)]">
        <div className="p-6 pb-0">
          <StepIndicator currentStep={2} />
        </div>

        <div className="flex h-[calc(100vh-220px)]">
          {/* Preview Area - 70% */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-auto">
            <div className="h-full w-full overflow-auto">
              {PreviewComponent && messages ? (
                <div dir={getDir(formData.language)} className="min-h-full">
                  <I18nProvider locale={formData.language} resources={messages}>
                    {/* eslint-disable-next-line react-hooks/static-components */}
                    <PreviewComponent data={previewData} />
                  </I18nProvider>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  加载中...
                </div>
              )}
            </div>
          </div>

          {/* Form Panel - 30% */}
          <div className="w-96 bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setStep(1)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
              >
                ← 返回选择模板
              </button>
            </div>

            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                当前模板
              </p>
              <p className="font-bold text-lg dark:text-white">
                {selectedStyle?.name}
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  嘉宾姓名 *
                </label>
                <input
                  name="guestName"
                  type="text"
                  value={formData.guestName}
                  onChange={handleValuesChange}
                  placeholder="输入嘉宾姓名"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  邀请函语言
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleValuesChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="zh-CN">🇨🇳 简体中文</option>
                  <option value="zh-TW">🇹🇼 繁體中文</option>
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
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  销售备注 (可选)
                </label>
                <textarea
                  name="salesNote"
                  rows={2}
                  value={formData.salesNote}
                  onChange={handleValuesChange}
                  placeholder="关于此嘉宾的备注..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent dark:text-white resize-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setStep(3)}
                disabled={!formData.guestName.trim()}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg transition-all"
              >
                下一步：确认生成 →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Confirmation
  return (
    <div className="min-h-[calc(100vh-120px)] p-6">
      <StepIndicator currentStep={3} />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white mb-2">
            确认邀请函信息
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            请确认以下信息无误后生成邀请函
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500 dark:text-gray-400">模板</span>
              <span className="font-medium dark:text-white">
                {selectedStyle?.name}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500 dark:text-gray-400">嘉宾姓名</span>
              <span className="font-medium dark:text-white">
                {formData.guestName}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500 dark:text-gray-400">语言</span>
              <span className="font-medium dark:text-white">
                {formData.language}
              </span>
            </div>
            {formData.salesNote && (
              <div className="flex justify-between py-3">
                <span className="text-gray-500 dark:text-gray-400">备注</span>
                <span className="font-medium dark:text-white">
                  {formData.salesNote}
                </span>
              </div>
            )}
          </div>
        </div>

        <form action={action}>
          <input type="hidden" name="styleKey" value={selectedStyleKey || ""} />
          <input type="hidden" name="guestName" value={formData.guestName} />
          <input type="hidden" name="language" value={formData.language} />
          <input type="hidden" name="salesNote" value={formData.salesNote} />

          {state?.error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              {state.error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-lg transition-all"
            >
              ← 返回修改
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-lg shadow-lg transition-all disabled:opacity-50"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  生成中...
                </span>
              ) : (
                "🎉 生成邀请函"
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          生成后将自动跳转到邀请函列表
        </p>
      </div>
    </div>
  );
}
