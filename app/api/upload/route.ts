import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { api } from "../api";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  try {
    const formData = await request.formData();

    const { data } = await api.post("/upload", formData, {
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
