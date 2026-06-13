import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (accessToken) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (refreshToken) {
      const apiRes = await api.get("auth/session", {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const setCookie = apiRes.headers["set-cookie"];

      if (setCookie) {
        const response = NextResponse.json({ success: true }, { status: 200 });

        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options = {
            path: parsed.path,
            maxAge: parsed["max-age"] ? Number(parsed["max-age"]) : undefined,
            expires: parsed.expires ? new Date(parsed.expires) : undefined,
          };

          if (parsed.accessToken) {
            response.cookies.set("accessToken", parsed.accessToken, options);
          }

          if (parsed.refreshToken) {
            response.cookies.set("refreshToken", parsed.refreshToken, options);
          }
        }

        return response;
      }
    }

    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
    }

    return NextResponse.json({ success: false }, { status: 200 });
  }
}
