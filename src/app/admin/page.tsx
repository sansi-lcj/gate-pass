import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminConfigForm from './AdminConfigForm';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getSession();
  
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  // Get current config
  const config = await prisma.systemConfig.findUnique({ where: { id: 'global' } });

  // Get stats
  const [totalInvitations, acceptedCount, declinedCount, openedCount, salesCount] = await Promise.all([
    prisma.invitation.count(),
    prisma.invitation.count({ where: { status: 'ACCEPTED' } }),
    prisma.invitation.count({ where: { status: 'DECLINED' } }),
    prisma.invitation.count({ where: { status: 'OPENED' } }),
    prisma.user.count({ where: { role: 'SALES' } }),
  ]);

  const pendingCount = totalInvitations - acceptedCount - declinedCount - openedCount;
  const acceptanceRate = totalInvitations > 0 ? Math.round((acceptedCount / totalInvitations) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">管理后台</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="邀请总数" value={totalInvitations} />
          <StatCard label="已接受" value={acceptedCount} color="green" />
          <StatCard label="已查看" value={openedCount} color="blue" />
          <StatCard label="已拒绝" value={declinedCount} color="red" />
          <StatCard label="接受率" value={`${acceptanceRate}%`} color="brand" />
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          <a href="/admin" className="px-4 py-2 bg-blue-600 rounded-lg font-medium">配置</a>
          <a href="/admin/users" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">用户 ({salesCount})</a>
          <a href="/admin/templates" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">模板</a>
          <a href="/admin/export" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">导出</a>
        </div>

        {/* Configuration Form */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">系统配置</h2>
          <AdminConfigForm config={config} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color = 'gray' }: { label: string; value: string | number; color?: string }) {
  const colorMap: Record<string, string> = {
    gray: 'bg-gray-800',
    green: 'bg-green-900/50 border-green-500',
    blue: 'bg-blue-900/50 border-blue-500',
    red: 'bg-red-900/50 border-red-500',
    brand: 'bg-brand/20 border-brand/50',
  };

  return (
    <div className={`${colorMap[color]} border border-gray-700 rounded-lg p-4`}>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
