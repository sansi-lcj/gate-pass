"use client";

import { useState, useActionState } from "react";
import {
  createSalesUserAction,
  toggleUserActiveAction,
  resetPasswordAction,
} from "../actions";

interface User {
  id: string;
  username: string;
  name: string | null;
  isActive: boolean;
  wechatId: string | null;
  createdAt: Date;
  _count: { invitations: number };
}

export default function UsersClient({
  users: initialUsers,
}: {
  users: User[];
}) {
  const [users, setUsers] = useState(initialUsers);
  const [showCreate, setShowCreate] = useState(false);
  const [state, createAction, isPending] = useActionState(
    createSalesUserAction,
    null
  );

  const handleToggle = async (userId: string) => {
    await toggleUserActiveAction(userId);
    setUsers(
      users.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const handleReset = async (userId: string) => {
    if (!confirm("Are you sure you want to reset this user's password?"))
      return;
    const result = await resetPasswordAction(userId);
    if (result.password) {
      alert(
        `New password: ${result.password}\n\nPlease save this password - it will only be shown once.`
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Add User Button */}
      <button
        onClick={() => setShowCreate(!showCreate)}
        className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
          showCreate
            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
            : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-xl"
        }`}
      >
        {showCreate ? (
          <>
            <span>×</span> Cancel
          </>
        ) : (
          <>
            <span className="text-lg">+</span> Add Sales User
          </>
        )}
      </button>

      {/* Create User Form */}
      {showCreate && (
        <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 animate-in slide-in-from-top-2 duration-300">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center text-sm">
              ➕
            </span>
            Create New User
          </h3>
          <form action={createAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Sales Code *
                </label>
                <input
                  name="username"
                  placeholder="e.g. S003"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Display Name
                </label>
                <input
                  name="name"
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  WeChat ID
                </label>
                <input
                  name="wechatId"
                  placeholder="For notifications"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            {state?.error && (
              <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-400 text-sm flex items-center gap-2">
                <span>⚠️</span> {state.error}
              </div>
            )}
            {state?.success && state?.password && (
              <div className="p-4 bg-green-900/30 border border-green-700/50 rounded-xl">
                <p className="text-green-400 font-medium flex items-center gap-2">
                  <span>✅</span> User created successfully!
                </p>
                <div className="mt-3 p-3 bg-black/30 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">
                    Generated Password:
                  </p>
                  <code className="text-lg font-mono text-white">
                    {state.password}
                  </code>
                </div>
                <p className="text-xs text-yellow-400 mt-3 flex items-center gap-1">
                  <span>⚠️</span> Save this password - it will only be shown
                  once
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {isPending ? "Creating..." : "✓ Create User"}
            </button>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  WeChat
                </th>
                <th className="text-center px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Invitations
                </th>
                <th className="text-center px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-center px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        {(user.name || user.username).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {user.name || user.username}
                        </p>
                        <p className="text-xs text-gray-500 font-mono">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {user.wechatId ? (
                      <span className="text-sm text-gray-300">
                        {user.wechatId}
                      </span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-sm font-bold text-gray-300">
                      {user._count.invitations}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        user.isActive
                          ? "bg-green-900/40 text-green-400 border border-green-700/30"
                          : "bg-red-900/40 text-red-400 border border-red-700/30"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      {user.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleToggle(user.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          user.isActive
                            ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                            : "bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-700/30"
                        }`}
                      >
                        {user.isActive ? "Disable" : "Enable"}
                      </button>
                      <button
                        onClick={() => handleReset(user.id)}
                        className="px-3 py-1.5 text-xs font-medium bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-700/30 rounded-lg transition-all"
                      >
                        Reset PW
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              👥
            </div>
            <p>No sales users yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
