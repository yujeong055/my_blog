import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/_next(.*)",
    "/favicon.ico",
    "/images(.*)",
    "/api(.*)",
  ],
  ignoredRoutes: [
    "/api/webhook(.*)",
    "/_next(.*)",
    "/favicon.ico",
    "/images(.*)",
  ],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
