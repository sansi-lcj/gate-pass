"use client";

import { useState, useEffect, useCallback } from "react";

interface PreviewFrameProps {
  children: React.ReactNode;
}

export default function PreviewFrame({ children }: PreviewFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleClose = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  // ESC 键退出全屏
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, handleClose]);

  return (
    <>
      {/* 全屏预览模式 */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          {/* 顶部工具栏 */}
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-white/60 text-sm">全屏预览</span>
            <button
              onClick={handleClose}
              className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="text-sm">关闭</span>
            </button>
          </div>

          {/* 全屏内容区域 */}
          <div className="flex-1 overflow-auto">
            <div className="min-h-full">{children}</div>
          </div>

          {/* 底部提示 */}
          <div className="py-3 text-center text-white/40 text-xs">
            按 ESC 退出全屏预览
          </div>
        </div>
      )}

      {/* 常规预览区域 */}
      <div className="flex flex-col h-full bg-gray-100 dark:bg-zinc-900">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
          <span className="text-xs text-gray-400">实时预览</span>

          {/* 全屏按钮 */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-all"
          >
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
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            全屏
          </button>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto">
          <div className="min-h-full">{children}</div>
        </div>
      </div>
    </>
  );
}
