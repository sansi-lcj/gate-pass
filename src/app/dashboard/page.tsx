import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user) return null;

  const userId = session.user.id;

  const [total, accepted, opened, declined] = await Promise.all([
    prisma.invitation.count({ where: { userId } }),
    prisma.invitation.count({ where: { userId, status: "ACCEPTED" } }),
    prisma.invitation.count({ where: { userId, status: "OPENED" } }),
    prisma.invitation.count({ where: { userId, status: "DECLINED" } }),
  ]);

  const acceptanceRate = total > 0 ? Math.round((accepted / total) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              {session.user.name || session.user.username}
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your invitation performance and engagement metrics.
          </p>
        </div>
        <a
          href="/dashboard/create"
          className="px-6 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white font-bold rounded-full hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-sm hover:shadow-md flex items-center gap-2 group"
        >
          <span className="text-xl leading-none group-hover:rotate-90 transition-transform duration-300">
            +
          </span>{" "}
          Create New
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <StatCard label="Total Created" value={total} color="brand" icon="📝" />
        <StatCard label="Accepted" value={accepted} color="green" icon="✅" />
        <StatCard label="Viewed" value={opened} color="blue" icon="👀" />
        <StatCard label="Declined" value={declined} color="red" icon="❌" />
        <StatCard
          label="Conversion Rate"
          value={`${acceptanceRate}%`}
          color="purple"
          icon="📈"
        />
      </div>

      {total === 0 && (
        <div className="mt-12 text-center py-20 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900/50 dark:to-zinc-900 rounded-3xl border border-dashed border-gray-300 dark:border-zinc-800">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            👋
          </div>
          <h3 className="text-xl font-bold dark:text-white mb-2">
            Start your campaign
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            You haven't created any invitations yet. Create your first one to
            start tracking results.
          </p>
          <div className="mt-4">
            <a
              href="/dashboard/create"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-500 transition-all transform hover:-translate-y-1"
            >
              Create First Invitation
            </a>
          </div>
        </div>
      )}

      {total > 0 && (
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold dark:text-white">Quick Actions</h3>
            <a
              href="/dashboard/invitations"
              className="text-blue-500 hover:text-blue-400 text-sm font-medium hover:underline"
            >
              View all invitations →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/dashboard/invitations"
              className="block p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl hover:border-blue-500/50 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  📋
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">
                    Manage Invitations
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    View status and copy links
                  </p>
                </div>
              </div>
            </a>
            <a
              href="/dashboard/create"
              className="block p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl hover:border-purple-500/50 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  ✨
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">Create New</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Send another invitation
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color = "gray",
  icon,
}: {
  label: string;
  value: string | number;
  color?: string;
  icon?: string;
}) {
  const colorStyles: Record<string, string> = {
    gray: "from-gray-50 to-white dark:from-zinc-800 dark:to-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white",
    green:
      "from-green-50 to-white dark:from-green-900/20 dark:to-zinc-900 border-green-200 dark:border-green-800/30 text-green-700 dark:text-green-400",
    blue: "from-blue-50 to-white dark:from-blue-900/20 dark:to-zinc-900 border-blue-200 dark:border-blue-800/30 text-blue-600 dark:text-blue-400",
    red: "from-red-50 to-white dark:from-red-900/20 dark:to-zinc-900 border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400",
    brand:
      "from-indigo-50 to-white dark:from-indigo-900/20 dark:to-zinc-900 border-indigo-200 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400",
    purple:
      "from-purple-50 to-white dark:from-purple-900/20 dark:to-zinc-900 border-purple-200 dark:border-purple-800/30 text-purple-600 dark:text-purple-400",
  };

  const css = colorStyles[color] || colorStyles.gray;

  return (
    <div
      className={`p-5 rounded-2xl border bg-gradient-to-br ${css} shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}
    >
      <div className="absolute top-2 right-2 opacity-10 text-4xl group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0">
        {icon}
      </div>
      <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">
        {label}
      </h3>
      <p className="text-3xl font-black tracking-tight relative z-10">
        {value}
      </p>
    </div>
  );
}
