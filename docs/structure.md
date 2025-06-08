# Next.js 블로그 프로젝트 구조

```
📦 my-blog
├── app/
│   ├── (auth)/                    # 인증 관련 라우트 그룹
│   │   ├── login/                 # 로그인 페이지
│   │   │   └── page.tsx
│   │   ├── register/             # 회원가입 페이지
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── blog/                     # 블로그 관련 라우트
│   │   ├── [slug]/              # 블로그 포스트 상세 페이지
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   ├── category/            # 카테고리별 보기
│   │   │   └── [category]/
│   │   │       └── page.tsx
│   │   ├── write/               # 글쓰기 페이지
│   │   │   └── page.tsx
│   │   └── page.tsx            # 블로그 메인 (포스트 목록)
│   ├── search/                  # 검색 페이지
│   │   └── page.tsx
│   ├── api/                     # API 라우트
│   │   ├── auth/               # 인증 관련 API
│   │   │   └── [...nextauth]/
│   │   ├── posts/              # 포스트 관련 API
│   │   ├── comments/           # 댓글 관련 API
│   │   └── search/             # 검색 API
│   ├── layout.tsx              # 루트 레이아웃
│   └── page.tsx               # 홈페이지
├── components/                 # 재사용 가능한 컴포넌트
│   ├── auth/                  # 인증 관련 컴포넌트
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   ├── blog/                  # 블로그 관련 컴포넌트
│   │   ├── post-card.tsx
│   │   ├── post-list.tsx
│   │   ├── post-header.tsx
│   │   ├── comment-section.tsx
│   │   └── category-list.tsx
│   ├── common/                # 공통 컴포넌트
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── sidebar.tsx
│   └── ui/                    # UI 컴포넌트 (기존)
├── lib/                       # 유틸리티 및 설정
│   ├── auth/                  # 인증 관련 유틸리티
│   │   └── auth-options.ts
│   ├── db/                    # 데이터베이스 관련
│   │   ├── prisma.ts
│   │   └── schema.prisma
│   ├── utils/                 # 유틸리티 함수
│   │   ├── api.ts
│   │   ├── markdown.ts
│   │   └── date.ts
│   └── config/               # 설정 파일
│       └── site.ts
├── types/                    # 타입 정의
│   ├── post.ts
│   ├── comment.ts
│   └── user.ts
├── styles/                   # 스타일 관련
│   └── markdown.css
└── public/                   # 정적 파일
    ├── images/
    └── icons/
```

## 주요 디렉토리 설명

### app/
Next.js 13+ App Router 기반의 페이지 구조입니다.
- `(auth)`: 인증 관련 페이지를 그룹화
- `blog`: 블로그 관련 페이지
- `api`: API 엔드포인트

### components/
재사용 가능한 컴포넌트들을 목적별로 구분했습니다.
- `auth`: 인증 관련 컴포넌트
- `blog`: 블로그 기능 관련 컴포넌트
- `common`: 공통으로 사용되는 컴포넌트
- `ui`: 기본 UI 컴포넌트

### lib/
프로젝트의 핵심 로직과 설정을 포함합니다.
- `auth`: 인증 관련 설정
- `db`: 데이터베이스 관련 설정
- `utils`: 유틸리티 함수
- `config`: 사이트 설정

## 주요 특징

1. **모듈화된 구조**
   - 각 기능별로 명확히 구분된 디렉토리 구조
   - 관련 있는 코드들을 함께 관리

2. **확장 가능한 설계**
   - 새로운 기능 추가가 용이한 구조
   - 컴포넌트의 재사용성 고려

3. **직관적인 라우팅**
   - App Router의 파일 기반 라우팅 활용
   - 관련 있는 라우트를 그룹화

4. **성능 최적화**
   - 페이지별 로딩 상태 관리
   - 에러 처리를 위한 error.tsx 구성

5. **타입 안정성**
   - TypeScript 타입 정의를 별도로 관리
   - 재사용 가능한 타입 인터페이스
