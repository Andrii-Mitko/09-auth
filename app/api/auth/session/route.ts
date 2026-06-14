import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { checkServerSession } from "@/lib/api/serverApi";

export async function GET() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken) {
    return NextResponse.json({ success: true });
  }

  if (refreshToken) {
    try {
      await checkServerSession();

      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json({ success: false });
    }
  }

  return NextResponse.json({ success: false });
}
