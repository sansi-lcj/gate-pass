import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import UsersClient from './UsersClient';

export default async function AdminUsersPage() {
  const session = await getSession();
  
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const users = await prisma.user.findMany({
    where: { role: 'SALES' },
    select: {
      id: true,
      username: true,
      name: true,
      isActive: true,
      wechatId: true,
      createdAt: true,
      _count: { select: { invitations: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">销售用户</h1>
          <a href="/admin" className="text-blue-400 hover:text-blue-300">← 返回管理后台</a>
        </div>

        <UsersClient users={users} />
      </div>
    </div>
  );
}
