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

// Recommended templates
const RECOMMENDED_TEMPLATES = [
  "TechFuture",
  "DarkMatter",
  "LuxuryGold",
  "OrientalInk",
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

function getTemplateDescription(key: string) {
  const descriptions: Record<string, string> = {
    TechFuture: "适合前沿科技产品发布，展示未来感",
    DarkMatter: "深邃星空背景，适合探索与发现主题",
    LuxuryGold: "黑金配色，尽显高端与奢华品质",
    OrientalInk: "极简水墨风格，体现东方美学韵味",
    CyberGrid: "赛博朋克风格，适合数字化产品",
    Executive: "稳重商务风格，适合正式会议邀请",
  };
  return descriptions[key] || "精美设计的邀请函模板";
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
    { num: 1, label: "选择模板", desc: "选择适合主题的风格" },
    { num: 2, label: "填写信息", desc: "输入嘉宾与活动详情" },
    { num: 3, label: "确认生成", desc: "最后确认并发送" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold transition-all ${
                  currentStep >= step.num
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }`}
              >
                {currentStep > step.num ? "✓" : step.num}
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep >= step.num
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-12 h-0.5 mx-2 ${
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
    const list =
      selectedCategory === "all"
        ? styles
        : styles.filter((s) => getCategory(s.key) === selectedCategory);

    // Sort: Recommended first
    return [...list].sort((a, b) => {
      const aRec = RECOMMENDED_TEMPLATES.includes(a.key);
      const bRec = RECOMMENDED_TEMPLATES.includes(b.key);
      if (aRec && !bRec) return -1;
      if (!aRec && bRec) return 1;
      return 0;
    });
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
            我们为您准备了多种风格的邀请函，请选择最适合的一款
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pb-12">
          {filteredStyles.map((style) => (
            <div
              key={style.key}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div
                onClick={() => handleSelectTemplate(style.key)}
                className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 flex-1"
              >
                {/* Recommended Badge */}
                {RECOMMENDED_TEMPLATES.includes(style.key) && (
                  <div className="absolute top-3 left-3 z-20 bg-yellow-400 text-yellow-950 text-xs font-bold px-2 py-1 rounded shadow-sm">
                    ✨ 推荐 / Recommended
                  </div>
                )}

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
                      alt="Poincare"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Hover overlay with button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-white text-sm mb-4 line-clamp-2">
                      {getTemplateDescription(style.key)}
                    </p>
                    <button className="bg-white text-black text-sm font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                      使用此模板
                    </button>
                  </div>
                </div>
                {/* Template name */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-gray-800 dark:text-white">
                      {style.name}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
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
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-auto relative">
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
                  <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p>正在加载模板预览...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Panel - 30% */}
          <div className="w-96 bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800 p-6 overflow-y-auto z-10 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setStep(1)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 text-sm font-medium"
              >
                ← 更换模板
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-1 dark:text-white">
                填写邀请信息
              </h2>
              <p className="text-sm text-gray-500">
                当前选择：{selectedStyle?.name}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  嘉宾姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  name="guestName"
                  type="text"
                  value={formData.guestName}
                  onChange={handleValuesChange}
                  placeholder="例如：李明 / John Doe"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  邀请函语言
                </label>
                <div className="relative">
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleValuesChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
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
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    ▼
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  预览将即时切换到所选语言
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  销售备注 (仅内部可见)
                </label>
                <textarea
                  name="salesNote"
                  rows={3}
                  value={formData.salesNote}
                  onChange={handleValuesChange}
                  placeholder="关于此嘉宾的职位、公司或跟进情况..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent dark:text-white resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setStep(3)}
                disabled={!formData.guestName.trim()}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg transition-all transform active:scale-95"
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
            即将生成邀请函，请最后确认一次内容
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 mb-6 border border-gray-100 dark:border-gray-800">
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800 items-center">
              <span className="text-gray-500 dark:text-gray-400">所选模板</span>
              <div className="flex items-center gap-2">
                <span className="font-bold dark:text-white text-lg">
                  {selectedStyle?.name}
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                  {getCategory(selectedStyleKey || "") === "tech" && "科技"}
                  {getCategory(selectedStyleKey || "") === "business" && "商务"}
                  {getCategory(selectedStyleKey || "") === "creative" && "创意"}
                  {getCategory(selectedStyleKey || "") === "regional" && "地域"}
                </span>
              </div>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800 items-center">
              <span className="text-gray-500 dark:text-gray-400">嘉宾姓名</span>
              <span className="font-bold text-xl dark:text-white">
                {formData.guestName}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800 items-center">
              <span className="text-gray-500 dark:text-gray-400">邀请语言</span>
              <span className="font-medium dark:text-white">
                {formData.language}
              </span>
            </div>
            {formData.salesNote && (
              <div className="flex justify-between py-3">
                <span className="text-gray-500 dark:text-gray-400 min-w-[60px]">
                  备注
                </span>
                <span className="font-medium dark:text-white text-right">
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
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2">
              <svg
                className="w-5 h-5"
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

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg transition-all"
            >
              ← 返回修改
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 transform hover:-translate-y-1"
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
                  正在从量子云生成...
                </span>
              ) : (
                "🚀 生成邀请函"
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          生成后可以通过链接分享给嘉宾，支持随时查看访问状态
        </p>
      </div>
    </div>
  );
}
