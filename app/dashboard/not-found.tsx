import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center animate-fade-up">
      <div className="p-5 rounded-2xl bg-gray-100 dark:bg-gray-800">
        <FileQuestion size={40} className="text-gray-400 dark:text-gray-500" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Page not found
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
          This page doesn&apos;t exist or you don&apos;t have access to it.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 active:scale-95 text-white text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 transition-all duration-200">
        Back to Dashboard
      </Link>
    </div>
  );
}