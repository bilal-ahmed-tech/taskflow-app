"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Circle, Clock, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string | null;
};

const priorityStyles = {
  LOW: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
  MEDIUM: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  HIGH: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400",
};

const statusStyles = {
  TODO: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
  IN_PROGRESS: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
  DONE: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

function isOverdue(dueDate: string | null, status: Task["status"]): boolean {
  if (!dueDate || status === "DONE") return false;
  return new Date(dueDate) < new Date();
}

export default function TaskList({
  tasks,
  projectId,
}: {
  tasks: Task[];
  projectId: string;
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (taskId: string) => {
    if (!confirm("Delete this task?")) return;
    setDeletingId(taskId);
    try {
      await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
        method: "DELETE",
      });
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (taskId: string, status: Task["status"]) => {
    await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl">
        <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
          <CheckCircle2 size={32} className="text-gray-400" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white">
          No tasks found
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Try a different filter or add a new task.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => {
        const overdue = isOverdue(task.dueDate, task.status);
        return (
          <div
            key={task.id}
            className={`flex items-start gap-4 p-4 bg-white dark:bg-gray-900 border rounded-xl transition-all duration-200
              ${
                overdue
                  ? "border-red-300 dark:border-red-500/50 hover:border-red-400 dark:hover:border-red-500"
                  : "border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700"
              }`}
          >
            {/* Status toggle */}
            <button
              onClick={() =>
                handleStatusChange(
                  task.id,
                  task.status === "DONE" ? "TODO" : "DONE"
                )
              }
              aria-label={task.status === "DONE" ? "Mark as todo" : "Mark as done"}
              className="mt-0.5 shrink-0 text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded transition-all duration-200"
            >
              {task.status === "DONE" ? (
                <CheckCircle2 size={20} className="text-emerald-500" />
              ) : (
                <Circle size={20} />
              )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${
                  task.status === "DONE"
                    ? "line-through text-gray-400 dark:text-gray-600"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {task.title}
              </p>
              {task.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[task.priority]}`}
                >
                  {task.priority}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[task.status]}`}
                >
                  {task.status.replace("_", " ")}
                </span>
                {task.dueDate && (
                  <span
                    className={`flex items-center gap-1 text-xs ${
                      overdue
                        ? "text-red-500 dark:text-red-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {overdue ? <AlertCircle size={10} /> : <Clock size={10} />}
                    {overdue ? "Overdue · " : ""}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <Link
                href={`/dashboard/projects/${projectId}/tasks/${task.id}/edit`}
                aria-label="Edit task"
                className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all duration-200"
              >
                <Pencil size={14} />
              </Link>
              <button
                onClick={() => handleDelete(task.id)}
                disabled={deletingId === task.id}
                aria-label="Delete task"
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-all duration-200 disabled:opacity-50"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}