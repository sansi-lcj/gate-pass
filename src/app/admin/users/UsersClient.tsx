'use client';

import { useState, useActionState } from 'react';
import { createSalesUserAction, toggleUserActiveAction, resetPasswordAction } from '../actions';

interface User {
  id: string;
  username: string;
  name: string | null;
  isActive: boolean;
  wechatId: string | null;
  createdAt: Date;
  _count: { invitations: number };
}

export default function UsersClient({ users: initialUsers }: { users: User[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [showCreate, setShowCreate] = useState(false);
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [state, createAction, isPending] = useActionState(createSalesUserAction, null);

  const handleToggle = async (userId: string) => {
    await toggleUserActiveAction(userId);
    setUsers(users.map(u => u.id === userId ? { ...u, isActive: !u.isActive } : u));
  };

  const handleReset = async (userId: string) => {
    if (!confirm('Are you sure you want to reset this user\'s password?')) return;
    const result = await resetPasswordAction(userId);
    if (result.password) {
      alert(`New password: ${result.password}\n\nPlease save this password - it will only be shown once.`);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowCreate(!showCreate)}
        className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
      >
        {showCreate ? 'Cancel' : '+ Add Sales User'}
      </button>

      {/* Create User Form */}
      {showCreate && (
        <form action={createAction} className="bg-gray-900 rounded-lg p-4 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="username"
              placeholder="Sales Code (e.g. S003)"
              required
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
            <input
              name="name"
              placeholder="Display Name"
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
            <input
              name="wechatId"
              placeholder="WeChat ID"
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
          </div>
          {state?.error && <p className="text-red-400 text-sm">{state.error}</p>}
          {state?.success && state?.password && (
            <div className="bg-green-900/50 border border-green-500 rounded p-3">
              <p className="text-green-400">User created! Password: <code className="font-mono bg-black px-2 py-1">{state.password}</code></p>
              <p className="text-xs text-gray-400 mt-1">⚠️ Save this password - it will only be shown once</p>
            </div>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md disabled:opacity-50"
          >
            {isPending ? 'Creating...' : 'Create User'}
          </button>
        </form>
      )}

      {/* Users Table */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left px-4 py-3">Username</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">WeChat</th>
              <th className="text-center px-4 py-3">Invitations</th>
              <th className="text-center px-4 py-3">Status</th>
              <th className="text-center px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t border-gray-800">
                <td className="px-4 py-3 font-mono">{user.username}</td>
                <td className="px-4 py-3">{user.name || '-'}</td>
                <td className="px-4 py-3 text-gray-400">{user.wechatId || '-'}</td>
                <td className="px-4 py-3 text-center">{user._count.invitations}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded text-xs ${user.isActive ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                    {user.isActive ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => handleToggle(user.id)}
                    className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    {user.isActive ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => handleReset(user.id)}
                    className="text-xs px-2 py-1 bg-orange-700 hover:bg-orange-600 rounded"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
