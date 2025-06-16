# My Personal Blog

Next.js와 TypeScript를 기반으로 한 현대적인 개인 블로그 프로젝트입니다.

## 📚 프로젝트 개요

이 블로그는 AI 학습과 개발 경험을 공유하기 위한 플랫폼으로, 최신 웹 기술을 활용하여 구축되었습니다.

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Font**: Geist Sans & Geist Mono

### Backend
- **Database**: Supabase
- **Authentication**: Clerk
- **API**: Next.js API Routes

### 개발 도구
- **Version Control**: Git
- **Code Quality**: ESLint
- **Formatting**: Prettier

## 🌟 주요 기능

- 💡 반응형 디자인
- 📝 마크다운 기반 블로그 포스팅
- 💬 댓글 시스템
- 🔐 사용자 인증
- 🔍 게시물 검색
- 🏷 카테고리 분류
- 📊 데이터 분석 (Jupyter Notebook 통합)

## 🚀 시작하기

1. 저장소 클론:
```bash
git clone https://github.com/yujeong055/my-blog.git
cd my-blog
```

2. 의존성 설치:
```bash
npm install
```

3. 환경 변수 설정:
`.env.local` 파일을 생성하고 필요한 환경 변수를 설정하세요:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
```

4. 개발 서버 실행:
```bash
npm run dev
```

5. http://localhost:3000 접속

## 📁 프로젝트 구조

```
my-blog/
├── app/               # Next.js 13+ App Router
├── components/        # 재사용 가능한 컴포넌트
│   ├── blog/         # 블로그 관련 컴포넌트
│   ├── common/       # 공통 컴포넌트
│   └── ui/           # UI 컴포넌트
├── lib/              # 유틸리티 함수 및 설정
├── public/           # 정적 파일
└── types/            # TypeScript 타입 정의
```

## 🔧 설정

- **Next.js**: App Router 및 서버 컴포넌트 사용
- **TypeScript**: 엄격한 타입 체크 적용
- **Tailwind**: JIT 모드 활성화
- **ESLint**: 코드 품질 관리
- **Prettier**: 일관된 코드 스타일 유지

## 📝 라이센스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
