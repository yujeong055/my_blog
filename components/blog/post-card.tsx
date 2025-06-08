import { BlogPost } from '@/data/mockData'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import Link from 'next/link'

interface PostCardProps {
  post: BlogPost
}

export function PostCard({ post }: PostCardProps) {
  const { title, excerpt, author, date, category, tags } = post
  
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Avatar className="size-8">
              <div className="flex h-full items-center justify-center text-sm font-medium">
                {author.name[0]}
              </div>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{author.name}</span>
              <time className="text-xs text-gray-500">{date}</time>
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-2 line-clamp-2">{title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{category.name}</Badge>
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag.id} variant="outline">
                {tag.name}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="outline">+{tags.length - 2}</Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}