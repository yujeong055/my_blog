import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-semibold">
            AI 학습 블로그
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link href="/" className="hover:text-blue-600">홈</Link>
            <Link href="/#latest-posts" className="hover:text-blue-600">최신글</Link>
            <Link href="/#about" className="hover:text-blue-600">소개</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">
                로그인
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}
