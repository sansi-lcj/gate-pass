"use client";

import { useActionState } from "react";
import { loginAction } from "./action";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-secondary rounded-full blur-[120px] opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-light to-brand-secondary bg-clip-text text-transparent">
            邀请函系统
          </h1>
          <p className="text-gray-400 text-sm mt-2">如视科技 Poincare 内购会</p>
        </div>

        <form action={action} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              用户编码
            </label>
            <input
              name="salesCode"
              type="text"
              required
              placeholder="例如 S001"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand text-white placeholder-gray-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              密码
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand text-white placeholder-gray-500 transition-all"
            />
          </div>

          {state?.error && (
            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 bg-gradient-to-r from-brand to-brand-secondary hover:from-brand-light hover:to-brand-secondary text-white font-medium rounded-md shadow-lg shadow-brand/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "登录中..." : "登录"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          Realsee &copy; 2025
        </div>
      </div>
    </div>
  );
}
