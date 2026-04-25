import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import TaskList from "@/components/ui/TaskList";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  const project = await prisma.project.findFirst({
    where: { id, userId: session!.user!.id },
    include: { tasks: { orderBy: { createdAt: "desc" } } },
  });

  if (!project) notFound();

  const total = project.tasks.length;
  const done = project.tasks.filter((t) => t.status === "DONE").length;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="flex flex-col gap-8 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 active:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded transition-colors duration-200 w-fit">
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {project.name}
            </h1>
            {project.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {project.description}
              </p>
            )}
          </div>
          <Link
            href={`/dashboard/projects/${id}/tasks/new`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 active:scale-95 text-white text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 transition-all duration-200 shrink-0">
            <Plus size={16} />
            Add Task
          </Link>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>
              {done} of {total} tasks completed
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tasks */}
      <TaskList
        tasks={project.tasks.map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          status: t.status,
          priority: t.priority,
          dueDate: t.dueDate ? t.dueDate.toISOString() : null,
        }))}
        projectId={id}
      />
    </div>
  );
}
