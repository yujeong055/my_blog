import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-semibold">
            AI 학습 블로그
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link href="/blog">블로그</Link>
            <Link href="/blog/categories">카테고리</Link>
            <Link href="/search">검색</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">로그인</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
