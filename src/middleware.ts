import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/(.*)"]);
const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up"]);
export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req) && isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  "^@/components/(.*)$": "<rootDir>/components/$1",
};
