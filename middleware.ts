import { authMiddleware } from "@clerk/nextjs/server";
 
// Clerk 미들웨어 설정
// public 경로는 인증이 필요 없음
export default authMiddleware({
  publicRoutes: [
    "/",
    "/blog",
    "/blog/(.*)",  // 블로그 게시물 조회
    "/api/public/(.*)",  // 공개 API 엔드포인트
    "/categories/(.*)",  // 카테고리별 게시물 목록
  ],
  ignoredRoutes: [
    "/api/webhook/(.*)",  // Webhook은 인증 제외
  ],
});
 
// Clerk 미들웨어가 적용되어야 하는 경로 설정
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};