"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const FILTERS = [
  { label: "All", value: "ALL" },
  { label: "Todo", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
] as const;

export default function TaskFilterTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("status") ?? "ALL";

  const setFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "ALL") params.delete("status");
    else params.set("status", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {FILTERS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          aria-label={`Filter by ${label}`}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
            ${
              current === value
                ? "bg-emerald-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}