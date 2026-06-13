import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

type Props = {
  params: Promise<{ id: string }>;
};

function getCookieHeader(request: NextRequest) {
  return request.headers.get("cookie") ?? "";
}

function errorResponse(error: unknown) {
  if (isAxiosError(error)) {
    logErrorResponse(error.response?.data);

    return NextResponse.json({ error: true }, { status: 200 });
  }

  return NextResponse.json({ error: true }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const cookieHeader = getCookieHeader(request);

    const { data } = await api.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const cookieHeader = getCookieHeader(request);

    const { data } = await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const cookieHeader = getCookieHeader(request);
    const body = await request.json();

    const { data } = await api.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
