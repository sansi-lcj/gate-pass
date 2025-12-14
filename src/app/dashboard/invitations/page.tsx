import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import InvitationRow from './InvitationRow';

export const dynamic = 'force-dynamic';

export default async function InvitationsPage() {
  const session = await getSession();
  if (!session?.user) return null;

  const invitations = await prisma.invitation.findMany({
    where: { userId: session.user.id },
    include: { style: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">我的邀请函</h1>
        <Link href="/dashboard/create" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          新建邀请
        </Link>
      </div>

      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-4 py-3 text-xs font-medium text-gray-500">嘉宾</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500">状态</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500">访问</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500">语言</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500">折扣码</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500">链接</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500">创建时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {invitations.map((inv: any) => (
              <InvitationRow key={inv.id} invitation={inv} />
            ))}
          </tbody>
        </table>
        {invitations.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            暂无邀请函
          </div>
        )}
      </div>
    </div>
  );
}


