import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Props = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, { params }: Props) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const project = await prisma.project.findFirst({
      where: { id, userId: session.user!.id },
    });

    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { name, description } = await req.json();

    const project = await prisma.project.findFirst({
      where: { id, userId: session.user!.id },
    });

    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const updated = await prisma.project.update({
      where: { id },
      data: { name: name?.trim(), description: description?.trim() || null },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}