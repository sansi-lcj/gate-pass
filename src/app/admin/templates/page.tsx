import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import TemplatesClient from './TemplatesClient';

export default async function AdminTemplatesPage() {
  const session = await getSession();
  
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const styles = await prisma.style.findMany({
    select: {
      id: true,
      name: true,
      component: true,
      isActive: true,
      _count: { select: { invitations: true } },
    },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">模板管理</h1>
          <a href="/admin" className="text-blue-400 hover:text-blue-300">← 返回管理后台</a>
        </div>

        <TemplatesClient styles={styles} />
      </div>
    </div>
  );
}
