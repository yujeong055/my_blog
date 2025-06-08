# AI 학습 블로그 디자인 가이드

## 1. 디자인 컨셉 및 원칙

### 1.1 디자인 컨셉
- **모던하고 미니멀한 디자인**: 콘텐츠 중심의 깔끔한 레이아웃
- **접근성과 가독성**: 누구나 쉽게 읽고 이해할 수 있는 디자인
- **일관된 시각적 경험**: ShadcnUI 기반의 통일된 컴포넌트 사용

### 1.2 디자인 원칙
- **콘텐츠 우선**: 불필요한 시각적 요소를 최소화
- **직관적 네비게이션**: 사용자가 쉽게 원하는 정보를 찾을 수 있도록
- **시각적 계층구조**: 타이포그래피와 여백을 통한 명확한 정보 구조

## 2. 색상 및 타이포그래피

### 2.1 색상 팔레트
```css
/* 기본 색상 (Light 모드) */
--background: oklch(1 0 0);           /* 배경 */
--foreground: oklch(0.145 0 0);       /* 텍스트 */
--primary: oklch(0.205 0 0);          /* 주요 강조색 */
--secondary: oklch(0.97 0 0);         /* 보조 강조색 */
--muted: oklch(0.97 0 0);             /* 흐린 배경 */
--accent: oklch(0.97 0 0);            /* 액센트 */

/* Dark 모드 */
.dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0);
    --secondary: oklch(0.269 0 0);
}
```

### 2.2 타이포그래피
```css
/* 폰트 패밀리 */
--font-sans: 'Geist Sans', system-ui;  /* 기본 폰트 */
--font-mono: 'Geist Mono', monospace;  /* 코드 폰트 */

/* 폰트 크기 */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
```

## 3. 페이지 레이아웃

### 3.1 전체 레이아웃
```
┌──────────────────────────────┐
│           Header            │
├──────────────────────────────┤
│                            │
│    Content                 │
│    ┌──────────┬─────────┐  │
│    │          │         │  │
│    │ Main     │ Sidebar │  │
│    │          │         │  │
│    │          │         │  │
│    └──────────┴─────────┘  │
│                            │
├──────────────────────────────┤
│           Footer            │
└──────────────────────────────┘
```

### 3.2 반응형 그리드
- **데스크톱**: 1200px 최대 너비, 2컬럼 레이아웃
- **태블릿**: 768px-1199px, 유동적 2컬럼/1컬럼
- **모바일**: 767px 이하, 1컬럼 레이아웃

### 3.3 여백 시스템
```css
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
```

## 4. UI 컴포넌트 스타일 가이드

### 4.1 버튼
```tsx
// 기본 버튼
<Button>
  기본 버튼
</Button>

// 강조 버튼
<Button variant="default">
  강조 버튼
</Button>

// 아웃라인 버튼
<Button variant="outline">
  아웃라인 버튼
</Button>
```

### 4.2 카드
```tsx
<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent>
    내용
  </CardContent>
</Card>
```

### 4.3 내비게이션
- 상단 메뉴: 고정된 헤더 사용
- 사이드바: 데스크톱에서만 표시
- 모바일 메뉴: 햄버거 메뉴로 접근

## 5. 반응형 디자인 지침

### 5.1 브레이크포인트
```css
/* 모바일 우선 접근법 */
sm: '640px',   /* 소형 모바일 */
md: '768px',   /* 태블릿 */
lg: '1024px',  /* 작은 데스크톱 */
xl: '1280px',  /* 큰 데스크통 */
```

### 5.2 반응형 타이포그래피
```css
/* 예시: 제목 크기 */
h1 {
  font-size: 1.875rem;        /* 모바일 */
  @screen md {
    font-size: 2.25rem;      /* 태블릿 */
  }
  @screen lg {
    font-size: 3rem;         /* 데스크톱 */
  }
}
```

### 5.3 이미지 처리
- 반응형 이미지: `aspect-ratio` 유지
- 지연 로딩: `loading="lazy"` 속성 사용
- 최적화: Next.js Image 컴포넌트 활용

## 6. 접근성 지침

### 6.1 색상 대비
- 텍스트와 배경색 간 WCAG 2.1 기준 충족
- 다크 모드에서도 동일한 가독성 유지

### 6.2 키보드 네비게이션
- 포커스 표시자 명확하게 표시
- 논리적인 탭 순서 유지

### 6.3 ARIA 레이블
- 모든 상호작용 요소에 적절한 ARIA 레이블 제공
- 스크린 리더 사용자를 위한 설명 추가

## 7. 애니메이션 및 전환

### 7.1 기본 전환
```css
/* 기본 전환 */
--transition-base: 150ms ease;
--transition-slow: 300ms ease;
```

### 7.2 호버 효과
- 버튼: 부드러운 배경색 변경
- 카드: 미세한 스케일 확대
- 링크: 부드러운 밑줄 애니메이션
