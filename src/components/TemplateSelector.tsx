"use client";

import { useState, useRef, useEffect } from "react";
import { StyleConfig } from "@/components/templates/registry";
import Image from "next/image";

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

function getCategoryColor(key: string) {
  const colors: Record<string, string> = {
    tech: "from-blue-500 to-cyan-500",
    business: "from-gray-600 to-gray-800",
    creative: "from-purple-500 to-pink-500",
    regional: "from-amber-500 to-orange-500",
  };
  return colors[getCategory(key)] || "from-gray-500 to-gray-600";
}

function getCategoryBadge(key: string) {
  const cat = getCategory(key);
  const badges: Record<string, { label: string; className: string }> = {
    tech: {
      label: "TECH",
      className:
        "border-blue-200 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400",
    },
    business: {
      label: "BUSINESS",
      className:
        "border-slate-200 text-slate-600 bg-slate-50 dark:bg-slate-900/20 dark:border-slate-800 dark:text-slate-400",
    },
    creative: {
      label: "CREATIVE",
      className:
        "border-purple-200 text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400",
    },
    regional: {
      label: "REGIONAL",
      className:
        "border-amber-200 text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400",
    },
  };
  return (
    badges[cat] || {
      label: "OTHER",
      className: "border-gray-200 text-gray-600 bg-gray-50",
    }
  );
}

interface TemplateSelectorProps {
  styles: StyleConfig[];
  selectedStyleKey: string | null;
  onSelect: (key: string) => void;
}

export default function TemplateSelector({
  styles,
  selectedStyleKey,
  onSelect,
}: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedStyle = styles.find((s) => s.key === selectedStyleKey);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredStyles =
    selectedCategory === "all"
      ? styles
      : styles.filter((s) => getCategory(s.key) === selectedCategory);

  // Sort: Recommended first
  const sortedStyles = [...filteredStyles].sort((a, b) => {
    const aRec = RECOMMENDED_TEMPLATES.includes(a.key);
    const bRec = RECOMMENDED_TEMPLATES.includes(b.key);
    if (aRec && !bRec) return -1;
    if (!aRec && bRec) return 1;
    return 0;
  });

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 p-3 border-2 rounded-xl bg-white dark:bg-zinc-900 transition-all hover:border-blue-400 ${
          isOpen
            ? "border-blue-500 ring-2 ring-blue-500/20"
            : "border-gray-200 dark:border-zinc-700"
        }`}
      >
        {selectedStyle ? (
          <>
            {/* Template Preview Thumbnail */}
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(
                selectedStyle.key
              )} flex items-center justify-center overflow-hidden relative`}
            >
              <Image
                src="/images/poincare/poincare-transparent.png"
                alt={selectedStyle.name}
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-900 dark:text-white">
                {selectedStyle.name}
              </p>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                  getCategoryBadge(selectedStyle.key).className
                }`}
              >
                {getCategoryBadge(selectedStyle.key).label}
              </span>
            </div>
          </>
        ) : (
          <div className="flex-1 text-left">
            <p className="text-gray-500 dark:text-gray-400">选择一个模板...</p>
          </div>
        )}
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
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
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Category Filter */}
          <div className="p-3 border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
            <div className="flex gap-1.5 overflow-x-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.key
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-zinc-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-600"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Template Grid */}
          <div className="max-h-80 overflow-y-auto p-3">
            <div className="grid grid-cols-2 gap-2">
              {sortedStyles.map((style) => (
                <button
                  key={style.key}
                  type="button"
                  onClick={() => {
                    onSelect(style.key);
                    setIsOpen(false);
                  }}
                  className={`group relative p-2 rounded-xl border-2 transition-all hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 ${
                    selectedStyleKey === style.key
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                      : "border-transparent bg-gray-50 dark:bg-zinc-800"
                  }`}
                >
                  {/* Recommended Badge */}
                  {RECOMMENDED_TEMPLATES.includes(style.key) && (
                    <div className="absolute -top-1 -right-1 z-10">
                      <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow">
                        ✨
                      </span>
                    </div>
                  )}

                  {/* Preview */}
                  <div
                    className={`h-16 rounded-lg bg-gradient-to-br ${getCategoryColor(
                      style.key
                    )} mb-2 flex items-center justify-center relative overflow-hidden`}
                  >
                    <Image
                      src="/images/poincare/poincare-transparent.png"
                      alt={style.name}
                      fill
                      className="object-contain p-2 group-hover:scale-110 transition-transform"
                    />
                  </div>

                  {/* Name */}
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                    {style.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
