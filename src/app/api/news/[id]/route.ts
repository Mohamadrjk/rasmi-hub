/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/news/[id]/route.ts

import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.news.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ status: true });
  } catch (error) {
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  try {
    const updatedNews = await prisma.news.update({
      where: { id: params.id },
      data: {
        title: body.title,
        summary: body.summary,
        content: body.content,
        tags: body.tags,
        //@ts-ignore
        isVerified: body.isVerified,
        verifiedBy: body.verifiedBy,
        verifiedAt: body.verifiedAt ? new Date(body.verifiedAt) : undefined,
        isPinned: body.isPinned,
      },
    });

    return NextResponse.json(updatedNews);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
