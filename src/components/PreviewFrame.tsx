"use client";

import { useState } from "react";

type DeviceType = "phone" | "desktop";

interface PreviewFrameProps {
  children: React.ReactNode;
}

const deviceConfigs: Record<
  DeviceType,
  { width: string; height: string; label: string; icon: string }
> = {
  phone: { width: "375px", height: "667px", label: "手机", icon: "📱" },
  desktop: { width: "100%", height: "100%", label: "桌面", icon: "🖥️" },
};

export default function PreviewFrame({ children }: PreviewFrameProps) {
  const [device, setDevice] = useState<DeviceType>("phone");

  const config = deviceConfigs[device];

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-zinc-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
        {/* Device Selector */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-zinc-700 rounded-lg p-1">
          {(Object.keys(deviceConfigs) as DeviceType[]).map((d) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                device === d
                  ? "bg-white dark:bg-zinc-600 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {deviceConfigs[d].icon} {deviceConfigs[d].label}
            </button>
          ))}
        </div>

        <span className="text-xs text-gray-400">实时预览</span>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        {device === "desktop" ? (
          // Desktop: Full width preview
          <div className="w-full h-full overflow-auto rounded-lg shadow-2xl bg-white dark:bg-black">
            {children}
          </div>
        ) : (
          // Phone: Device frame at fixed scale
          <div className="relative">
            {/* Device Frame */}
            <div
              className="relative bg-gray-900 rounded-[40px] p-3 shadow-2xl"
              style={{
                width: config.width,
                height: config.height,
                transform: "scale(0.85)",
                transformOrigin: "center center",
              }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-10" />

              {/* Screen */}
              <div className="w-full h-full bg-white dark:bg-black rounded-[32px] overflow-hidden relative">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-black/10 dark:bg-white/5 flex items-center justify-between px-6 text-xs text-gray-600 dark:text-gray-400 z-20">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span>📶</span>
                    <span>🔋</span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full h-full overflow-auto">{children}</div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
