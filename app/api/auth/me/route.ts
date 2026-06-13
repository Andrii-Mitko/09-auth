import { NextResponse } from "next/server";

import { cookies } from "next/headers";
import { api } from "../../api";
import axios from "axios";

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get("/auth/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.error ?? error.message,
        },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const body = await request.json();
  try {
    const { data } = await api.put("/auth/me", body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.error ?? error.message,
        },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
