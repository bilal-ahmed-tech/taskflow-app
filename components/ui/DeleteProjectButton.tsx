"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this project and all its tasks? This cannot be undone.")) return;
    setLoading(true);

    try {
      await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
      router.push("/dashboard");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      aria-label="Delete project"
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-red-200 dark:border-red-500/20">
      <Trash2 size={16} />
      <span className="hidden sm:block">Delete</span>
    </button>
  );
}