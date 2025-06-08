import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { BlogPost } from '@/data/mockData'

interface RelatedPostsProps {
  currentPost: BlogPost
  posts: BlogPost[]
}

export function RelatedPosts({ currentPost, posts }: RelatedPostsProps) {
  // 현재 포스트와 같은 카테고리의 다른 포스트 필터링
  const relatedPosts = posts
    .filter(
      (post) => 
        post.category.id === currentPost.category.id && 
        post.id !== currentPost.id
    )
    .slice(0, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">관련 포스트</h2>
      <div className="grid gap-4">
        {relatedPosts.map((post) => (
          <Card key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <CardHeader className="p-4">
                <CardTitle className="text-base font-medium line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
