import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const news = await prisma.news.findMany({
    orderBy: { publishedAt: "desc" },
    include: {
      company: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  return NextResponse.json(news);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newItem = await prisma.news.create({
    data: {
      title: body.title,
      summary: body.summary,
      content: body.content,
      publishedAt: new Date(body.publishedAt),
      sourceUrl: body.sourceUrl,
      sourceType: body.sourceType,
      tags: body.tags ?? [],
      crawledAt: new Date(),
      isPinned: body.isPinned ?? false,
      company: body.companyId ? { connect: { id: body.companyId } } : undefined,
    },
  });

  return NextResponse.json(newItem);
}
