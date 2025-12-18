"use client";

import { useState } from "react";
import { logoutAction } from "../login/action";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Auto-collapse on create page for more preview space
  const isCreatePage = pathname === "/dashboard/create";

  const navItems = [
    { href: "/dashboard", icon: "📊", label: "概览" },
    { href: "/dashboard/create", icon: "✨", label: "创建邀请" },
    { href: "/dashboard/invitations", icon: "📨", label: "我的邀请" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col transition-all duration-300 relative`}
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-8 w-6 h-6 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors z-10"
          title={sidebarCollapsed ? "展开菜单" : "收起菜单"}
        >
          <svg
            className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${
              sidebarCollapsed ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Header */}
        <div className={`p-6 ${sidebarCollapsed ? "px-3" : ""}`}>
          {sidebarCollapsed ? (
            <div className="w-10 h-10 bg-gradient-to-r from-brand to-brand-secondary rounded-lg flex items-center justify-center text-white font-bold">
              邀
            </div>
          ) : (
            <h1 className="text-xl font-bold bg-gradient-to-r from-brand to-brand-secondary bg-clip-text text-transparent">
              邀请函管理
            </h1>
          )}
        </div>

        {/* Navigation */}
        <nav
          className={`flex-1 ${sidebarCollapsed ? "px-2" : "px-4"} space-y-2`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center ${
                sidebarCollapsed ? "justify-center" : "space-x-3"
              } px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span className="text-lg">{item.icon}</span>
              {!sidebarCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className={`p-4 border-t border-gray-200 dark:border-gray-800`}>
          <form action={logoutAction}>
            <button
              className={`flex items-center ${
                sidebarCollapsed ? "justify-center" : "space-x-3"
              } px-4 py-2 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors`}
              title={sidebarCollapsed ? "退出登录" : undefined}
            >
              <span>🚪</span>
              {!sidebarCollapsed && (
                <span className="font-medium">退出登录</span>
              )}
            </button>
          </form>
        </div>

        {/* Quick collapse hint for create page */}
        {isCreatePage && !sidebarCollapsed && (
          <div className="px-4 pb-4">
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center gap-1"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
              收起以获得更多预览空间
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
