// app/api/docs/route.ts
import { NextResponse } from "next/server";
import { swaggerDocument } from "@/docs/main-docs";

export async function GET() {
  return NextResponse.json(swaggerDocument);
}
