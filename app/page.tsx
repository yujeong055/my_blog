import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const blogPosts = [
    {
      id: 1,
      title: "온라인 광평이와 당숙모",
      date: "2025-06-16",
      image: "/images/cat.jpg",
      excerpt: "삶과 비행기 매카닉, 그리고 외할머니의 따스한 사랑..."
    },
    {
      id: 2,
      title: "AI-agent",
      date: "2025-06-16",
      image: "/images/ai.jpg",
      excerpt: "인공지능 에이전트의 발전과 미래..."
    },
    {
      id: 3,
      title: "Next.js로 블로그 만들기",
      date: "2025-06-15",
      image: "/images/ai.jpg",
      excerpt: "Next.js와 Supabase를 사용하여 모던한 블로그를 구축하는 방법..."
    },
    {
      id: 4,
      title: "프로그래밍의 즐거움",
      date: "2025-06-14",
      image: "/images/cat.jpg",
      excerpt: "코딩을 통해 문제를 해결하고 새로운 것을 만드는 즐거움..."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-6xl mx-auto px-4 py-12">
        <section id="hero" className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            블로그, JavaScript, Next.js로 나의 생각과 삶을 공유하는 공간입니다.
          </p>
        </section>

        <section id="latest-posts" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">최신 게시물</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority={post.id <= 2}
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    자세히 보기
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">소개</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
            <p className="text-gray-600 dark:text-gray-300">
              이 블로그는 프로그래밍, 기술, 그리고 일상의 이야기를 공유하는 공간입니다.
              Next.js, React, 그리고 다양한 웹 기술들을 다루며, 개발 과정에서 얻은 인사이트를 공유합니다.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
