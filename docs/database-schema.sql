-- 블로그 데이터베이스 스키마
-- 작성일: 2025-06-02
-- 주의: Clerk 인증 시스템과 통합된 구조

-- 확장 모듈 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 카테고리 테이블
-- 설명: 블로그 게시물을 분류하기 위한 카테고리 정보
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 게시물 테이블
-- 설명: 블로그의 주요 컨텐츠인 게시물 정보
-- 참고: author_id는 Clerk 사용자 ID를 저장 (예: "user_xxxxxxxxxx")
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    cover_image_url TEXT,
    author_id TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성 (조회 성능 최적화)
CREATE INDEX posts_author_id_idx ON posts(author_id);
CREATE INDEX posts_slug_idx ON posts(slug);
CREATE INDEX posts_category_id_idx ON posts(category_id);

-- 댓글 테이블
-- 설명: 게시물에 대한 사용자 댓글
-- 참고: author_id는 Clerk 사용자 ID를 저장
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- author_id 인덱스 생성
CREATE INDEX comments_author_id_idx ON comments(author_id);

-- 좋아요 테이블
-- 설명: 게시물에 대한 사용자 좋아요 정보
-- 참고: user_id는 Clerk 사용자 ID를 저장
CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- 동일한 사용자가 같은 게시물에 중복 좋아요 방지
    UNIQUE(post_id, user_id)
);

-- user_id 인덱스 생성
CREATE INDEX likes_user_id_idx ON likes(user_id);

-- 자동 updated_at 갱신을 위한 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- categories 테이블 updated_at 자동 갱신 트리거
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- posts 테이블 updated_at 자동 갱신 트리거
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
