"use client";

import { useState } from "react";

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

const statusColors: Record<string, string> = {
  PENDING: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  OPENED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  ACCEPTED:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  DECLINED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function InvitationRow({
  invitation: inv,
}: {
  invitation: Invitation;
}) {
  const [showQR, setShowQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const handleShowQR = async () => {
    if (showQR) {
      setShowQR(false);
      return;
    }

    try {
      const res = await fetch(`/api/qr/${inv.uniqueToken}`);
      const data = await res.json();
      setQrDataUrl(data.qrCode);
      setShowQR(true);
    } catch (_error) {
      console.error("Failed to load QR code");
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
        <td className="px-4 py-3 dark:text-gray-300">
          <span className="font-medium">{inv.guestName}</span>
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-flex px-2 py-0.5 text-xs rounded-full font-medium ${
              statusColors[inv.status] || statusColors.PENDING
            }`}
          >
            {inv.status}
          </span>
        </td>
        <td className="px-4 py-3 text-sm text-gray-500 text-center">
          {inv.visitCount}
        </td>
        <td className="px-4 py-3 text-xs text-gray-500 font-mono">
          {inv.language}
        </td>
        <td className="px-4 py-3 text-xs font-mono text-gray-500">
          {inv.discountCode || "-"}
        </td>
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center gap-2">
            <a
              href={`/invite/${inv.uniqueToken}`}
              target="_blank"
              className="text-blue-500 hover:underline text-xs"
            >
              Open
            </a>
            <button
              onClick={handleShowQR}
              className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              QR
            </button>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}/invite/${inv.uniqueToken}`
                )
              }
              className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Copy
            </button>
          </div>
        </td>
        <td className="px-4 py-3 text-xs text-gray-500">
          {new Date(inv.createdAt).toLocaleDateString()}
        </td>
      </tr>
      {showQR && qrDataUrl && (
        <tr>
          <td colSpan={7} className="bg-gray-50 dark:bg-gray-900 p-4">
            <div className="flex items-center gap-4">
              <img
                src={qrDataUrl}
                alt="QR Code"
                className="w-32 h-32 border rounded"
              />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Scan to open invitation</p>
                <p className="font-mono text-xs mt-2">
                  {window.location.origin}/invite/{inv.uniqueToken}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
