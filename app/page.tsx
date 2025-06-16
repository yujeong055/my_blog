import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function Home() {
  const blogPosts = [
    {
      id: 1,
      title: "온라인 광평이와 당숙모",
      date: "2025-06-16",
      image: "/images/cat.jpg",
      excerpt: "삶과 비행기 매카닉, 그리고 외할머니의 따스한 사랑...",
      category: "일상"
    },
    {
      id: 2,
      title: "AI-agent",
      date: "2025-06-16",
      image: "/images/ai.jpg",
      excerpt: "인공지능 에이전트의 발전과 미래에 대한 고찰...",
      category: "기술"
    },
    {
      id: 3,
      title: "Next.js로 블로그 만들기",
      date: "2025-06-15",
      image: "/images/ai.jpg",
      excerpt: "Next.js와 Supabase를 사용하여 모던한 블로그를 구축하는 방법...",
      category: "개발"
    },
    {
      id: 4,
      title: "프로그래밍의 즐거움",
      date: "2025-06-14",
      image: "/images/cat.jpg",
      excerpt: "코딩을 통해 문제를 해결하고 새로운 것을 만드는 즐거움...",
      category: "개발"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <main className="container mx-auto px-4 py-16">
        {/* Hero 섹션 */}
        <section className="text-center mb-20">
          <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500">
            AI 학습 블로그
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            인공지능, 프로그래밍, 그리고 일상의 이야기를 공유하는 공간입니다.
          </p>
        </section>

        {/* 최신 게시물 섹션 */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">최신 게시물</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog">모든 글 보기</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.map(post => (
              <Card key={post.id} className="group overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg transition-all">
                <Link href={`/blog/${post.id}`}>
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/80 dark:bg-gray-900/80 text-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <time className="text-sm text-gray-500 dark:text-gray-400">{post.date}</time>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      자세히 보기
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
