import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { LayoutGrid, ListTodo, CheckCircle, Plus } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  const projects = await prisma.project.findMany({
    where: { userId: session!.user!.id },
    include: { tasks: true },
    orderBy: { createdAt: "desc" },
  });

  const totalTasks = projects.reduce((acc: number, p) => acc + p.tasks.length, 0);
  const completedTasks = projects.reduce(
    (acc: number, p) => acc + p.tasks.filter((t) => t.status === "DONE").length,
    0
  );
  const inProgressTasks = projects.reduce(
    (acc: number, p) => acc + p.tasks.filter((t) => t.status === "IN_PROGRESS").length,
    0
  );

  return (
    <div className="flex flex-col gap-8 animate-fade-up">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Tasks", value: totalTasks, icon: ListTodo, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
          { label: "In Progress", value: inProgressTasks, icon: LayoutGrid, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
          { label: "Completed", value: completedTasks, icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
              <div className={`p-2 rounded-lg ${bg}`}>
                <Icon size={18} className={color} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Projects</h2>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 active:scale-95 text-white text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 transition-all duration-200">
          <Plus size={16} />
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl">
          <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
            <LayoutGrid size={32} className="text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">No projects yet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Create your first project to get started.</p>
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 active:scale-95 text-white text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all duration-200">
            <Plus size={16} />
            Create Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            const total = project.tasks.length;
            const done = project.tasks.filter((t) => t.status === "DONE").length;
            const progress = total === 0 ? 0 : Math.round((done / total) * 100);

            return (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="group flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98] rounded-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors duration-200 mb-1">
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 mt-auto">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{total} tasks</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}