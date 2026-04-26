"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import TaskList from "@/components/ui/TaskList";

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string | null;
};

type SortOption = "created" | "due_date" | "priority" | "status";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Date Created", value: "created" },
  { label: "Due Date", value: "due_date" },
  { label: "Priority", value: "priority" },
  { label: "Status", value: "status" },
];

const PRIORITY_ORDER = { HIGH: 0, MEDIUM: 1, LOW: 2 };
const STATUS_ORDER = { IN_PROGRESS: 0, TODO: 1, DONE: 2 };

function sortTasks(tasks: Task[], sort: SortOption): Task[] {
  return [...tasks].sort((a, b) => {
    switch (sort) {
      case "due_date":
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case "priority":
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      case "status":
        return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      default:
        return 0; // created — already ordered by DB
    }
  });
}

export default function TaskControls({
  tasks,
  projectId,
}: {
  tasks: Task[];
  projectId: string;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("created");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const result = q
      ? tasks.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.description?.toLowerCase().includes(q)
        )
      : tasks;
    return sortTasks(result, sort);
  }, [tasks, query, sort]);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label;

  return (
    <div className="flex flex-col gap-4">
      {/* Controls row */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks…"
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all duration-200"
          />
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortOpen((o) => !o)}
            aria-label="Sort tasks"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-500 dark:hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all duration-200"
          >
            <ArrowUpDown size={14} />
            <span className="hidden sm:inline">{currentSortLabel}</span>
          </button>

          {sortOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setSortOpen(false)}
              />
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 z-20 w-44 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSort(option.value);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150
                      ${
                        sort === option.value
                          ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Results count */}
      {query && (
        <p className="text-xs text-gray-400 dark:text-gray-600">
          {filtered.length} task{filtered.length !== 1 ? "s" : ""} found for{" "}
          <span className="text-gray-500 dark:text-gray-400">&quot;{query}&quot;</span>
        </p>
      )}

      {/* Task list */}
      <TaskList tasks={filtered} projectId={projectId} />
    </div>
  );
}