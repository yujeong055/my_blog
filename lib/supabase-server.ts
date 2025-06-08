import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';
import { createSupabaseClient } from './supabase-shared';
import { auth } from '@clerk/nextjs/server';
import 'server-only';

/** 서버 사이드 전용 Service Role Key 환경 변수 검증 */
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseServiceRoleKey) throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY');

/**
 * 서버 컴포넌트용 Supabase 클라이언트 생성
 * - Next.js 서버 컴포넌트에서 사용
 * - Clerk auth()를 통한 세션 토큰 추출
 * - server-only 모듈로 클라이언트 임포트 방지
 */
export const createServerComponentClient = async () => {
  const session = await auth();
  const supabaseAccessToken = await session?.getToken({ template: 'supabase' });
  return createSupabaseClient(supabaseAccessToken || undefined);
};

/**
 * 관리자 권한의 Supabase 클라이언트
 * - API 라우트에서 RLS를 우회해야 하는 경우 사용
 * - 주의: 클라이언트에 노출되면 안 됨
 */
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseServiceRoleKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
