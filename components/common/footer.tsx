import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container py-6 md:py-8">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div className="text-sm text-muted-foreground order-2 md:order-1 text-center md:text-left">
            © {new Date().getFullYear()} AI 학습 블로그. All rights reserved.
          </div>
          <nav className="order-1 md:order-2">
            <ul className="flex flex-wrap gap-4 justify-center md:justify-end text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  블로그
                </Link>
              </li>
              <li>
                <Link href="/blog/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  카테고리
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  소개
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
