import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const params = {
      categoryId: searchParams.get("categoryId"),
      search: searchParams.get("search"),
      page: searchParams.get("page"),
      tag: searchParams.get("tag"),
    };

    const { data } = await api.get("/notes", { params });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.response?.data?.error ?? error.message,
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data } = await api.post("/notes", body);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.response?.data?.error ?? error.message,
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
