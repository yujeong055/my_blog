'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSupabase } from '@/lib/supabase-client'
import { useAuth } from '@clerk/nextjs'

// 환경 변수 마스킹 함수
function maskString(str: string): string {
  if (!str) return '설정되지 않음'
  if (str.length <= 8) return '*'.repeat(str.length)
  return str.slice(0, 4) + '*'.repeat(str.length - 8) + str.slice(-4)
}

export default function TestSupabasePage() {
  const [testResult, setTestResult] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error'
    message?: string
  }>({ status: 'idle' })

  const supabase = useSupabase();
  const { userId } = useAuth();

  // Supabase 연결 테스트 함수
  const testConnection = async () => {
    setTestResult({ status: 'loading' })

    try {
      if (!supabase) {
        throw new Error('Supabase 클라이언트가 초기화되지 않았습니다.');
      }

      // 카테고리 테이블 조회 테스트
      const { error } = await supabase
        .from('categories')
        .select('count')
        .limit(1)
        .single();
      
      if (error) throw error;

      setTestResult({
        status: 'success',
        message: `Supabase 연결 성공! ${userId ? '(인증됨)' : '(인증되지 않음)'}`
      });
    } catch (error) {
      setTestResult({
        status: 'error',
        message: `연결 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
      });
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Supabase 연결 테스트</h1>

      <Card>
        <CardHeader>
          <CardTitle>사용자 상태</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">인증 상태:</p>
            <code className="px-2 py-1 bg-muted rounded">
              {userId ? '인증됨' : '인증되지 않음'}
            </code>
          </div>
          <div>
            <p className="font-medium">사용자 ID:</p>
            <code className="px-2 py-1 bg-muted rounded">
              {userId ?? '없음'}
            </code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>환경 변수 상태</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">NEXT_PUBLIC_SUPABASE_URL:</p>
            <code className="px-2 py-1 bg-muted rounded">
              {maskString(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '')}
            </code>
          </div>
          <div>
            <p className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY:</p>
            <code className="px-2 py-1 bg-muted rounded">
              {maskString(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '')}
            </code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>연결 테스트</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={testConnection}
            disabled={testResult.status === 'loading'}
          >
            {testResult.status === 'loading' ? '테스트 중...' : '연결 테스트 실행'}
          </Button>

          {testResult.status !== 'idle' && (
            <div className={`p-4 rounded-lg ${
              testResult.status === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100' :
              testResult.status === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' :
              'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
            }`}>
              {testResult.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
