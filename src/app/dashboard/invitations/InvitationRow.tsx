"use client";

import { useState } from "react";
import StyledQRCode from "@/components/StyledQRCode";

interface Invitation {
  id: string;
  guestName: string;
  uniqueToken: string;
  discountCode: string | null;
  status: string;
  language: string;
  visitCount: number;
  createdAt: Date;
  styleKey: string;
}

const statusConfig: Record<string, { bg: string; text: string; icon: string }> =
  {
    PENDING: {
      bg: "bg-gray-100 dark:bg-gray-800",
      text: "text-gray-600 dark:text-gray-400",
      icon: "⏳",
    },
    OPENED: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
      icon: "👁️",
    },
    ACCEPTED: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
      icon: "✅",
    },
    DECLINED: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-400",
      icon: "❌",
    },
  };

const languageFlags: Record<string, string> = {
  "zh-CN": "🇨🇳",
  "zh-TW": "🇨🇳",
  en: "🇺🇸",
  ja: "🇯🇵",
  ko: "🇰🇷",
  ar: "🇸🇦",
  id: "🇮🇩",
  th: "🇹🇭",
  vi: "🇻🇳",
  de: "🇩🇪",
  fr: "🇫🇷",
  es: "🇪🇸",
  pt: "🇧🇷",
  ru: "🇷🇺",
  ms: "🇲🇾",
  he: "🇮🇱",
};

export default function InvitationRow({
  invitation: inv,
}: {
  invitation: Invitation;
}) {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShowQR = () => {
    setShowQR(!showQR);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/invite/${inv.uniqueToken}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const status = statusConfig[inv.status] || statusConfig.PENDING;

  return (
    <>
      <tr className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors group">
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {inv.guestName.charAt(0).toUpperCase()}
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              {inv.guestName}
            </span>
          </div>
        </td>
        <td className="px-5 py-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-medium ${status.bg} ${status.text}`}
          >
            <span>{status.icon}</span>
            {inv.status}
          </span>
        </td>
        <td className="px-5 py-4 text-center">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-zinc-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400">
            {inv.visitCount}
          </span>
        </td>
        <td className="px-5 py-4">
          <span className="text-sm">
            {languageFlags[inv.language] || "🌐"}{" "}
            <span className="text-gray-500 font-mono text-xs">
              {inv.language}
            </span>
          </span>
        </td>
        <td className="px-5 py-4">
          {inv.discountCode ? (
            <code className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded text-xs font-mono">
              {inv.discountCode}
            </code>
          ) : (
            <span className="text-gray-400">—</span>
          )}
        </td>
        <td className="px-5 py-4">
          <div className="flex items-center gap-1.5">
            <a
              href={`/invite/${inv.uniqueToken}`}
              target="_blank"
              className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              title="Open"
            >
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </a>
            <button
              onClick={handleShowQR}
              className={`p-2 rounded-lg transition-colors ${
                showQR
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600"
                  : "text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
              title="QR Code"
            >
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
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                ></path>
              </svg>
            </button>
            <button
              onClick={handleCopy}
              className={`p-2 rounded-lg transition-all ${
                copied
                  ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                  : "text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
              title={copied ? "Copied!" : "Copy link"}
            >
              {copied ? (
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
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              ) : (
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </td>
        <td className="px-5 py-4 text-sm text-gray-500">
          {new Date(inv.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </td>
      </tr>
      {showQR && (
        <tr>
          <td
            colSpan={7}
            className="bg-purple-50/50 dark:bg-purple-900/10 p-6 border-t border-purple-100 dark:border-purple-900/30"
          >
            <div className="flex items-center gap-6">
              <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800">
                <StyledQRCode
                  data={`${typeof window !== "undefined" ? window.location.origin : ""}/invite/${inv.uniqueToken}`}
                  size={140}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  📱 Scan to open invitation
                </p>
                <code className="text-xs text-gray-500 bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg block">
                  {typeof window !== "undefined" ? window.location.origin : ""}/invite/{inv.uniqueToken}
                </code>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
