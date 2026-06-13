import axios from "axios";
import { NextResponse } from "next/server";
import { api } from "../api";

export async function GET() {
  try {
    const { data } = await api.get("/categories");

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
