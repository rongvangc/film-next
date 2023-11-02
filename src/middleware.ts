import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const PUBLIC_PATH: string[] = ["/login", "/register-success"];

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  const pathname = request.nextUrl.pathname;

  const checkPublicPath = PUBLIC_PATH.some((url: string) =>
    url.includes(pathname)
  );

  //Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //Return to /discover/movie if have a session & match with public path
  // if (session && checkPublicPath) {
  //   return NextResponse.redirect(new URL("/discover/movie", request.url));
  // }

  //Call the authentication endpoint
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/login`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  matcher: [
    "/movie/:path*",
    "/tv/:path*",
    "/detail/:path*",
    "/tv-detail/:path*",
    "/discover/:path*",
  ],
};
