import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(companies);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newCompany = await prisma.company.create({
    data: {
      name: body.name,
      slug: body.slug,
      website: body.website,
      industry: body.industry,
      description: body.description,
      logoUrl: body.logoUrl ?? null,
      isVerified: body.isVerified ?? false,
    },
  });

  return NextResponse.json(newCompany);
}
