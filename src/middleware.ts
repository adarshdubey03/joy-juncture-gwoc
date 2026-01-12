import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  publicPrefixes,
} from "@/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname) ||
    publicPrefixes.some(prefix => nextUrl.pathname.startsWith(prefix));
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Prepare response to attach headers to.
  // We initiate a response object that we might return or redirect with.
  // However, if we need to redirect, we create a redirect response.

  // Default action: allow request to proceed (NextResponse.next())
  // We will attach headers to this response.
  const response = NextResponse.next();

  // Logic for redirection
  if (isApiAuthRoute) {
    // For API auth routes, we usually just return null to let NextAuth handle it, 
    // OR we can return a passed-through response. 
    // Returning undefined/null in auth wrapper usually means "allow".
    // But if we want headers, we should return the response.
    // Let's rely on NextAuth handling this internally if we return simply.
    // But to be safe and stricter with headers, let's try to wrap it.
    // actually for api/auth, we shouldn't interfere too much.
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // If not logged in, we are on login/register page. Proceed with 'response' (NextResponse.next())
  } else if (!isLoggedIn && !isPublicRoute) {
    // Protected route, redirect to login
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Attach Secure Headers to the response we are about to return
  // Note: If we created a Redirect response above, we attach headers to THAT.
  if (response) {
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), browsing-topics=()");
    // HSTS: Enforce HTTPS for 1 year, include subdomains
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  return response;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
