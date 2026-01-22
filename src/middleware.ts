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


  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    // If logged in, we let them proceed to the auth page (e.g. login/register) 
    // This fixes the issue where client-side might think they are logged out, but server side middleware redirects them home.
    // Ideally, the auth page itself should handle redirection if the user is truly already authenticated.
    return NextResponse.next();
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
