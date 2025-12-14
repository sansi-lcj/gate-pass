import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { exportAcceptedGuestsCSV } from '../actions';

export default async function AdminExportPage() {
  const session = await getSession();
  
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const csvContent = await exportAcceptedGuestsCSV();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">数据导出</h1>
          <a href="/admin" className="text-blue-400 hover:text-blue-300">← 返回管理后台</a>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">已接受嘉宾 CSV</h2>
          <p className="text-gray-400 mb-4">导出所有已接受邀请的嘉宾数据。</p>
          
          {csvContent ? (
            <>
              <div className="bg-gray-800 rounded p-4 mb-4 overflow-x-auto">
                <pre className="text-xs text-gray-300 whitespace-pre">{csvContent}</pre>
              </div>
              <a
                href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`}
                download="accepted_guests.csv"
                className="inline-block px-6 py-2 bg-green-600 hover:bg-green-500 rounded-md"
              >
                下载 CSV
              </a>
            </>
          ) : (
            <p className="text-gray-500">暂无已接受的嘉宾可导出</p>
          )}
        </div>
      </div>
    </div>
  );
}
