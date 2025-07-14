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
    await prisma.company.delete({
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
    const updatedCompany = await prisma.company.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(updatedCompany);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const companyDetail = await prisma.company.findFirstOrThrow({
      where: { id: params.id },
    });
    return NextResponse.json(companyDetail);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
