'use client';

import { useAuth } from '@clerk/nextjs';
import { createSupabaseClient } from './supabase-shared';
import { useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

/**
 * Clerk 인증이 통합된 Supabase 클라이언트 Hook
 * 클라이언트 컴포넌트에서만 사용 가능
 */
export const useSupabase = () => {
  const { getToken } = useAuth();
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(null);

  useEffect(() => {
    const initSupabase = async () => {
      try {
        // Clerk에서 Supabase용 JWT 토큰 가져오기
        const token = await getToken({ template: 'supabase' });
        // JWT 토큰이 포함된 Supabase 클라이언트 생성
        const client = createSupabaseClient(token || undefined);
        setSupabase(client);
      } catch (error) {
        console.error('Supabase 클라이언트 초기화 실패:', error);
        // 인증 없이 기본 클라이언트 생성
        const client = createSupabaseClient();
        setSupabase(client);
      }
    };

    initSupabase();
  }, [getToken]);

  return supabase;
};

/**
 * 인증이 필요 없는 읽기 전용 작업을 위한 기본 Supabase 클라이언트
 * 예: 공개 게시물 목록 조회
 */
export const supabasePublic = createSupabaseClient();
