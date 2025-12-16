import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import InvitationRow from "./InvitationRow";

export const dynamic = "force-dynamic";

export default async function InvitationsPage() {
  const session = await getSession();
  if (!session?.user) return null;

  const invitations = await prisma.invitation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold dark:text-white tracking-tight">
            My Invitations
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {invitations.length} invitation{invitations.length !== 1 ? "s" : ""}{" "}
            total
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <span className="text-lg">+</span> New Invitation
        </Link>
      </div>

      {invitations.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-zinc-800">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            📨
          </div>
          <h3 className="text-lg font-bold dark:text-white mb-2">
            No invitations yet
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Create your first invitation to start tracking guest responses.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
                <tr>
                  <th className="px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                    Views
                  </th>
                  <th className="px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {invitations.map((inv) => (
                  <InvitationRow key={inv.id} invitation={inv} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
