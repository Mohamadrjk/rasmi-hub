/* eslint-disable @typescript-eslint/no-explicit-any */
import { classifyClaim } from "@/lib/factCheckCore";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  const request = await req.json();
  const textClaim = request.claim as string;
  const topic = await classifyClaim(textClaim);
  return NextResponse.json({
    textClaim,
    topic,
  });
}
