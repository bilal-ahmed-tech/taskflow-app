import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Props = { params: Promise<{ id: string; taskId: string }> };

export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, taskId } = await params;
    const body = await req.json();

    const project = await prisma.project.findFirst({
      where: { id, userId: session.user!.id },
    });

    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const task = await prisma.task.update({
      where: { id: taskId },
      data: body,
    });

    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, taskId } = await params;

    const project = await prisma.project.findFirst({
      where: { id, userId: session.user!.id },
    });

    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    await prisma.task.delete({ where: { id: taskId } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
export async function GET(_req: NextRequest, { params }: Props) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, taskId } = await params;

    const project = await prisma.project.findFirst({
      where: { id, userId: session.user!.id },
    });

    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}