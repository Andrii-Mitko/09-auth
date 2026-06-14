import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { api } from "../../api";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;

  const cookieStore = await cookies();

  const { data } = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;

  const cookieStore = await cookies();

  const { data } = await api.delete(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;

  const cookieStore = await cookies();

  const body = await request.json();

  const { data } = await api.patch(`/notes/${id}`, body, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return NextResponse.json(data);
}
