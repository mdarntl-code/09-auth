import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkSession } from "@/lib/api/serverApi";

const PRIVATE_ROUTES = ["/profile", "/notes"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isPrivateRoute = PRIVATE_ROUTES.some((route) => pathname.startsWith(route));

  if (!accessToken && refreshToken) {
    try {
      const response = await checkSession();

      const setCookie = response.headers["set-cookie"];

      if (setCookie) {
        const res = isAuthRoute 
          ? NextResponse.redirect(new URL("/", request.url))
          : NextResponse.next();

        setCookie.forEach((cookieString) => {
          const parsed = parse(cookieString);
          const [name, value] = Object.entries(parsed)[0];
          res.cookies.set(name, value as string, {
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
            httpOnly: true,
          });
        });
        return res;
      }
    } catch (error) {
      if (isPrivateRoute) return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};