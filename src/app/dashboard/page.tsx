import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user) return null;

  const userId = session.user.id;
  
  const [total, accepted, opened, declined, pending] = await Promise.all([
    prisma.invitation.count({ where: { userId } }),
    prisma.invitation.count({ where: { userId, status: 'ACCEPTED' } }),
    prisma.invitation.count({ where: { userId, status: 'OPENED' } }),
    prisma.invitation.count({ where: { userId, status: 'DECLINED' } }),
    prisma.invitation.count({ where: { userId, status: 'PENDING' } }),
  ]);

  const acceptanceRate = total > 0 ? Math.round((accepted / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">欢迎回来，{session.user.name || session.user.username}</h2>
          <p className="text-gray-500 dark:text-gray-400">以下是您的邀请函概况</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="总计" value={total} />
        <StatCard label="已接受" value={accepted} color="green" />
        <StatCard label="已查看" value={opened} color="blue" />
        <StatCard label="已拒绝" value={declined} color="red" />
        <StatCard label="接受率" value={`${acceptanceRate}%`} color="brand" />
      </div>
      
      {total === 0 && (
        <div className="mt-12 text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500">您还没有创建任何邀请函</p>
          <div className="mt-4">
             <a href="/dashboard/create" className="px-4 py-2 bg-blue-600 text-white rounded-md">创建第一张邀请函</a>
          </div>
        </div>
      )}

      {total > 0 && (
        <div className="mt-8">
          <a href="/dashboard/invitations" className="text-blue-500 hover:text-blue-400">
            查看所有邀请函 →
          </a>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color = 'gray' }: { label: string; value: string | number; color?: string }) {
  const colorMap: Record<string, string> = {
    gray: 'bg-white dark:bg-black border-gray-200 dark:border-gray-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    brand: 'bg-brand/10 dark:bg-brand/20 border-brand/30 dark:border-brand/40',
  };
  const textColorMap: Record<string, string> = {
    gray: 'text-gray-900 dark:text-white',
    green: 'text-green-600 dark:text-green-400',
    blue: 'text-blue-600 dark:text-blue-400',
    red: 'text-red-600 dark:text-red-400',
    brand: 'text-brand dark:text-brand-light',
  };

  return (
    <div className={`p-4 border rounded-xl shadow-sm ${colorMap[color]}`}>
       <h3 className="text-xs font-medium text-gray-500">{label}</h3>
       <p className={`text-2xl font-bold mt-1 ${textColorMap[color]}`}>{value}</p>
    </div>
  );
}

