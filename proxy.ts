import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "@/lib/api/serverApi";

const PRIVATE_ROUTES = ["/profile", "/notes"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

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
      const setCookieHeader = response.headers["set-cookie"];

      if (setCookieHeader) {
        const res = isAuthRoute 
          ? NextResponse.redirect(new URL("/", request.url))
          : NextResponse.next();

        const cookieArray = Array.isArray(setCookieHeader) 
          ? setCookieHeader 
          : [setCookieHeader];

        cookieArray.forEach((cookieString) => {
          const parts = cookieString.split(";").map((p) => p.trim());
          const [nameValue, ...attrParts] = parts;
          const [name, value] = nameValue.split("=");

          const attrs: Record<string, string | boolean> = {};
          attrParts.forEach((part) => {
            const [key, val] = part.split("=");
            attrs[key.toLowerCase()] = val || true;
          });

          res.cookies.set(name, value, {
            path: typeof attrs.path === "string" ? attrs.path : "/",
            maxAge: typeof attrs["max-age"] === "string" ? Number(attrs["max-age"]) : undefined,
            httpOnly: attrs.httponly !== undefined,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
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

  if (!accessToken && isAuthRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};