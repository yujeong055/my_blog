# AI 학습 블로그 기술 아키텍처

## 1. 프로젝트 구조 및 파일 조직

### 1.1 디렉토리 구조
```
📦 my-blog
├── app/                      # Next.js App Router
│   ├── (auth)/              # 인증 관련 라우트 그룹
│   ├── api/                 # API Route Handlers
│   ├── blog/               # 블로그 관련 페이지
│   └── search/             # 검색 기능
├── components/             # React 컴포넌트
│   ├── auth/              # 인증 관련 컴포넌트
│   ├── blog/              # 블로그 관련 컴포넌트
│   ├── common/            # 공통 컴포넌트
│   └── ui/                # UI 컴포넌트
├── lib/                   # 핵심 로직
│   ├── actions/          # 서버 액션
│   ├── api/              # API 유틸리티
│   ├── auth/             # 인증 로직
│   ├── db/               # 데이터베이스 설정
│   └── utils/            # 유틸리티 함수
└── types/                # TypeScript 타입 정의
```

### 1.2 주요 설정 파일
```typescript
// next.config.ts
import { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    domains: ['vercel.blob.core.windows.net'],
  },
  experimental: {
    serverActions: true,
  },
}

export default config
```

## 2. 컴포넌트 계층 구조

### 2.1 컴포넌트 구성
```tsx
// 레이아웃 컴포넌트
RootLayout
├── Header
│   ├── Navigation
│   ├── SearchBar
│   └── UserMenu
├── Sidebar
│   ├── CategoryList
│   └── TagCloud
└── Footer

// 페이지별 컴포넌트
BlogPost
├── PostHeader
│   ├── Title
│   └── MetaInfo
├── PostContent
│   ├── MarkdownRenderer
│   └── CodeBlock
├── CommentSection
│   ├── CommentForm
│   └── CommentList
└── RelatedPosts
```

### 2.2 컴포넌트 패턴
```tsx
// 컴포넌트 기본 구조
import { FC } from 'react'
import { cn } from '@/lib/utils'

interface ComponentProps {
  // 타입 정의
}

export const Component: FC<ComponentProps> = ({ ...props }) => {
  return (
    // JSX
  )
}

// 컴포넌트 합성 예시
const PostCard = ({ post, className, ...props }) => {
  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)} {...props}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* 컨텐츠 */}
      </CardContent>
    </Card>
  )
}
```

## 3. 데이터 모델 및 상태 관리

### 3.1 Prisma 스키마
```prisma
// schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  posts         Post[]
  comments      Comment[]
  likes         Like[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Post {
  id          String    @id @default(cuid())
  title       String
  content     String
  excerpt     String?
  slug        String    @unique
  published   Boolean   @default(false)
  author      User      @relation(fields: [authorId], references: [id])
  authorId    String
  categories  Category[]
  tags        Tag[]
  comments    Comment[]
  likes       Like[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  posts       Post[]
}

model Tag {
  id          String    @id @default(cuid())
  name        String    @unique
  posts       Post[]
}

model Comment {
  id          String    @id @default(cuid())
  content     String
  author      User      @relation(fields: [authorId], references: [id])
  authorId    String
  post        Post      @relation(fields: [postId], references: [id])
  postId      String
  parent      Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  parentId    String?
  replies     Comment[] @relation("CommentReplies")
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Like {
  id        String   @id @default(cuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  post      Post     @relation(fields: [postId], references: [id])
  postId    String
  createdAt DateTime @default(now())

  @@unique([userId, postId])
}
```

### 3.2 상태 관리 전략
```typescript
// 1. 서버 컴포넌트 우선 사용
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug)
  return <PostComponent post={post} />
}

// 2. React Context 활용 (클라이언트 상태)
// contexts/auth-context.tsx
export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  // ... 인증 로직

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3. React Query 사용 (서버 상태)
// hooks/use-posts.ts
export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts')
      return res.json()
    }
  })
}
```

## 4. API 설계 (Route Handlers)

### 4.1 API 엔드포인트 구조
```typescript
// app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { getPosts } from '@/lib/api/posts'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  
  const posts = await getPosts({ page: Number(page), limit: Number(limit) })
  return NextResponse.json(posts)
}

// app/api/posts/[slug]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const post = await getPostBySlug(params.slug)
  return NextResponse.json(post)
}
```

### 4.2 미들웨어 설정
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(request) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ['/blog/write', '/api/posts/:path*']
}
```

## 5. 성능 최적화 전략

### 5.1 이미지 최적화
```typescript
// components/blog/post-image.tsx
import Image from 'next/image'

export function PostImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-video">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw,
               (max-width: 1200px) 50vw,
               33vw"
        className="object-cover"
        loading="lazy"
      />
    </div>
  )
}
```

### 5.2 서버 컴포넌트 활용
```typescript
// components/blog/post-list.tsx
import { Suspense } from 'react'

export default function PostList() {
  return (
    <Suspense fallback={<PostListSkeleton />}>
      <Posts />
    </Suspense>
  )
}
```

### 5.3 캐싱 전략
```typescript
// lib/cache.ts
import { unstable_cache } from 'next/cache'

export const getCachedPosts = unstable_cache(
  async () => {
    const posts = await prisma.post.findMany()
    return posts
  },
  ['posts'],
  {
    revalidate: 60, // 1분
    tags: ['posts']
  }
)
```

### 5.4 번들 최적화
```typescript
// next.config.ts
const config: NextConfig = {
  // ...
  webpack: (config, { isServer }) => {
    // 번들 분석
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
      }
    }
    return config
  }
}
```

## 6. 보안 설정

### 6.1 인증 설정
```typescript
// lib/auth-options.ts
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      // ... 이메일/비밀번호 인증 설정
    })
  ],
  session: {
    strategy: 'jwt'
  },
  // ... 추가 설정
}
```

### 6.2 API 보안
```typescript
// lib/api/middleware.ts
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth-options'

export async function withAuth(handler: Function) {
  return async function (request: Request) {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }
    
    return handler(request, session)
  }
}
```
