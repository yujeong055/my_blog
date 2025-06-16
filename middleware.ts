import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 공개 경로 목록
  const publicPaths = [
    "/",
    "/blog",
    "/blog/(.*)",
    "/api/public/(.*)",
    "/categories/(.*)",
  ];

  // 현재 경로가 공개 경로인지 확인
  const isPublicPath = publicPaths.some((path) => {
    if (path.includes("(.*)")) {
      const pathWithoutWildcard = path.replace("(.*)", "");
      return request.nextUrl.pathname.startsWith(pathWithoutWildcard);
    }
    return request.nextUrl.pathname === path;
  });

  // 공개 경로이거나 webhook 경로인 경우 접근 허용
  if (isPublicPath || request.nextUrl.pathname.startsWith('/api/webhook/')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
