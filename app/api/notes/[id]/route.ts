import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

type Props = {
  params: Promise<{ id: string }>;
};

function errorResponse(error: unknown) {
  if (isAxiosError(error)) {
    logErrorResponse(error.response?.data);

    return NextResponse.json(error.response?.data, {
      status: error.response?.status ?? 500,
    });
  }

  logErrorResponse({ message: (error as Error).message });

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}

export async function GET(_: Request, { params }: Props) {
  try {
    const { id } = await params;

    const cookieStore = cookies();

    const { data } = await api.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_: Request, { params }: Props) {
  try {
    const { id } = await params;

    const cookieStore = cookies();

    const { data } = await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(_: Request, { params }: Props) {
  try {
    const { id } = await params;

    const cookieStore = cookies();
    const body = await _.json();

    const { data } = await api.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}
