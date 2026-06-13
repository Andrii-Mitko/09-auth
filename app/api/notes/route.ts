import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

function normalizeParams(searchParams: URLSearchParams) {
  const categoryId = searchParams.get("categoryId") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const page = Number(searchParams.get("page") ?? 1);
  const tag = searchParams.get("tag") ?? undefined;

  return {
    categoryId,
    search,
    page: Number.isNaN(page) ? 1 : page,
    perPage: 10,
    tag,
  };
}

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie") ?? "";

    const params = normalizeParams(request.nextUrl.searchParams);

    const { data } = await api.get("/notes", {
      params,
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json({ error: true }, { status: 200 });
    }

    return NextResponse.json({ error: true }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie") ?? "";

    const body = await request.json();

    const { data } = await api.post("/notes", body, {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json({ error: true }, { status: 200 });
    }

    return NextResponse.json({ error: true }, { status: 200 });
  }
}
