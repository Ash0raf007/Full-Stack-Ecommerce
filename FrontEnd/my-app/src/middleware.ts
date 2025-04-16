import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // const userId = req.cookies.get("userId")?.value;
  const url = req.nextUrl;

  // Redirect unauthenticated users from protected routes
  if ((!token) &&  (url.pathname.startsWith("/products") || url.pathname.startsWith("/products/add-product"))  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If authenticated, add Authorization header
  if (token) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("Authorization", `Bearer ${token}`);

    // Redirect authenticated users away from auth pages
    if (
      url.pathname.startsWith("/auth/login") ||
      url.pathname.startsWith("/auth/signup") 

    ) {
      return NextResponse.redirect(new URL("/cart", req.url));
    }
  }

  return NextResponse.next();
}
