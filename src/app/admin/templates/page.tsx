import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getAllStyles } from '@/components/templates/registry';

export default async function AdminTemplatesPage() {
  const session = await getSession();
  
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const styles = getAllStyles();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">模板管理</h1>
          <a href="/admin" className="text-blue-400 hover:text-blue-300">← 返回管理后台</a>
        </div>

        <p className="text-gray-400 mb-6">
          邀请函模板现已内置于代码中。如需修改模板，请联系开发人员。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {styles.map(style => (
            <div
              key={style.key}
              className="bg-gray-900 rounded-lg p-4 border border-gray-700"
            >
              <div className="h-32 bg-gray-800 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">{style.key}</span>
              </div>
              <h3 className="font-bold">{style.nameZh}</h3>
              <p className="text-sm text-gray-400">{style.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
