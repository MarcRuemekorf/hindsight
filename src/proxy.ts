import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/utils/auth";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isAuthenticated = await auth.api.getSession({
        headers: request.headers
    })

    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

    if (!isAuthenticated && !isAuthPage) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};