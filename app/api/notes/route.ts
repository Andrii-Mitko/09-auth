import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { api } from "../api";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  const search = request.nextUrl.searchParams.get("search") ?? "";
  const page = request.nextUrl.searchParams.get("page") ?? "1";
  const tag = request.nextUrl.searchParams.get("tag");

  const params: Record<string, string> = {
    search,
    page,
  };

  if (tag && tag !== "All") {
    params.tag = tag;
  }

  const { data } = await api.get("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const body = await request.json();

  const { data } = await api.post("/notes", body, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return NextResponse.json(data);
}
