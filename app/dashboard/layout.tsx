import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { handleSignOut } from "@/lib/actions";
import { LogOut } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-xl font-bold text-gray-900 dark:text-white   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded transition-colors duration-200">
            Task<span className="text-emerald-500">Flow</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
              {session.user?.name}
            </span>
            <form action={handleSignOut}>
              <button
                type="submit"
                aria-label="Sign out"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-all duration-200">
                <LogOut size={16} />
                <span className="hidden sm:block">Sign out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}