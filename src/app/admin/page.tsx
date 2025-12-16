import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminConfigForm from "./AdminConfigForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();

  if (!session?.user?.role || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // Get current config
  const config = await prisma.systemConfig.findUnique({
    where: { id: "global" },
  });

  // Get stats
  const [
    totalInvitations,
    acceptedCount,
    declinedCount,
    openedCount,
    salesCount,
  ] = await Promise.all([
    prisma.invitation.count(),
    prisma.invitation.count({ where: { status: "ACCEPTED" } }),
    prisma.invitation.count({ where: { status: "DECLINED" } }),
    prisma.invitation.count({ where: { status: "OPENED" } }),
    prisma.user.count({ where: { role: "SALES" } }),
  ]);

  const _pendingCount =
    totalInvitations - acceptedCount - declinedCount - openedCount;
  const acceptanceRate =
    totalInvitations > 0
      ? Math.round((acceptedCount / totalInvitations) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-8">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Admin Console
            </h1>
            <p className="text-gray-500 mt-2">
              Manage system configuration and monitor performance
            </p>
          </div>
          <a
            href="/dashboard"
            className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-all flex items-center gap-2"
          >
            <span>←</span> Back to Dashboard
          </a>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <StatCard
            label="Total Invitations"
            value={totalInvitations}
            icon="📩"
          />
          <StatCard
            label="Accepted"
            value={acceptedCount}
            color="green"
            icon="✅"
          />
          <StatCard label="Viewed" value={openedCount} color="blue" icon="👁️" />
          <StatCard
            label="Declined"
            value={declinedCount}
            color="red"
            icon="❌"
          />
          <StatCard
            label="Conversion"
            value={`${acceptanceRate}%`}
            color="purple"
            icon="📈"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 p-1 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 w-fit">
          <a
            href="/admin"
            className="px-5 py-2.5 bg-white text-gray-900 rounded-lg font-medium text-sm shadow-lg"
          >
            ⚙️ Configuration
          </a>
          <a
            href="/admin/users"
            className="px-5 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg font-medium text-sm transition-all"
          >
            👥 Users ({salesCount})
          </a>
          <a
            href="/admin/templates"
            className="px-5 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg font-medium text-sm transition-all"
          >
            🎨 Templates
          </a>
          <a
            href="/admin/export"
            className="px-5 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg font-medium text-sm transition-all"
          >
            📤 Export
          </a>
        </div>

        {/* Configuration Form Card */}
        <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center text-lg">
              ⚙️
            </div>
            <div>
              <h2 className="text-xl font-bold">System Configuration</h2>
              <p className="text-sm text-gray-500">
                Event timing and notification settings
              </p>
            </div>
          </div>
          <AdminConfigForm config={config} />
        </div>
      </div>
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
    gray: "from-gray-800/80 to-gray-900 border-gray-700 text-white",
    green: "from-green-900/40 to-gray-900 border-green-700/30 text-green-400",
    blue: "from-blue-900/40 to-gray-900 border-blue-700/30 text-blue-400",
    red: "from-red-900/40 to-gray-900 border-red-700/30 text-red-400",
    purple:
      "from-purple-900/40 to-gray-900 border-purple-700/30 text-purple-400",
  };

  const css = colorStyles[color] || colorStyles.gray;

  return (
    <div
      className={`bg-gradient-to-br ${css} backdrop-blur-sm border rounded-2xl p-5 relative overflow-hidden group hover:scale-[1.02] transition-transform`}
    >
      <div className="absolute top-3 right-3 text-2xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all">
        {icon}
      </div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-3xl font-black">{value}</p>
    </div>
  );
}
