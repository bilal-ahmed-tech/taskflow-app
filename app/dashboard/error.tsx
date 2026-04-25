"use client";

export default function DashboardError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="p-8 text-red-500">
      <h2 className="font-bold text-lg mb-2">Dashboard Error</h2>
      <pre className="text-sm">{error.message}</pre>
      <pre className="text-xs text-gray-400 mt-2">{error.digest}</pre>
    </div>
  );
}