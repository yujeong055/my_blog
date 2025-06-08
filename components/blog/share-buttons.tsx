'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  title: string
  url: string
  className?: string
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      // TODO: 토스트 메시지로 복사 성공 알림
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareLinks.twitter, '_blank', 'noopener,noreferrer')}
        aria-label="Twitter에 공유하기"
      >
        <Icons.twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareLinks.facebook, '_blank', 'noopener,noreferrer')}
        aria-label="Facebook에 공유하기"
      >
        <Icons.facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareLinks.linkedin, '_blank', 'noopener,noreferrer')}
        aria-label="LinkedIn에 공유하기"
      >
        <Icons.linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleCopyLink}
        aria-label="링크 복사하기"
      >
        <Icons.link className="h-4 w-4" />
      </Button>
    </div>
  )
}
