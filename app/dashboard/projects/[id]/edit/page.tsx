import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EditProjectForm from "@/components/ui/EditProjectForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();

  const project = await prisma.project.findFirst({
    where: { id, userId: session!.user!.id },
  });

  if (!project) notFound();

  return (
    <div className="flex flex-col gap-8 animate-fade-up max-w-2xl">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link
          href={`/dashboard/projects/${id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 active:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded transition-colors duration-200 w-fit">
          <ArrowLeft size={16} />
          Back to project
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit Project
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Update your project name and description.
          </p>
        </div>
      </div>

      {/* Form */}
      <EditProjectForm
        project={{
          id: project.id,
          name: project.name,
          description: project.description,
        }}
      />
    </div>
  );
}