import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

/** Supabase 프로젝트 URL 환경 변수 검증 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');

/** Supabase Anon Key 환경 변수 검증 */
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseAnonKey) throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');

/**
 * Supabase 클라이언트 생성 함수
 * @param supabaseAccessToken Clerk에서 발급한 JWT 토큰 (선택)
 * @returns Supabase 클라이언트 인스턴스
 */
export const createSupabaseClient = (supabaseAccessToken?: string) => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      ...(supabaseAccessToken && {
        global: {
          headers: {
            Authorization: `Bearer ${supabaseAccessToken}`,
          },
        },
      }),
    },
  });
};
