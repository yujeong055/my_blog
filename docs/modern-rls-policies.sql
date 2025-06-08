-- Clerk 인증과 통합된 Supabase RLS 정책
-- 작성일: 2025-06-08

-- 테이블별 RLS 활성화
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- 카테고리 정책
-- 1. 모든 사용자가 조회 가능
-- 2. 인증된 관리자만 수정 가능
CREATE POLICY "카테고리 조회는 모두 가능" 
  ON categories FOR SELECT 
  TO PUBLIC 
  USING (true);

CREATE POLICY "카테고리 관리는 관리자만 가능" 
  ON categories FOR ALL 
  TO authenticated 
  USING (auth.jwt() ->> 'user_role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'user_role' = 'admin');

-- 게시물 정책
-- 1. 공개 게시물은 모든 사용자가 조회 가능
-- 2. 작성자는 자신의 게시물만 수정/삭제 가능
CREATE POLICY "게시물 조회는 모두 가능" 
  ON posts FOR SELECT 
  TO PUBLIC 
  USING (true);

CREATE POLICY "게시물 생성은 인증된 사용자만 가능" 
  ON posts FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.jwt() ->> 'sub' = author_id);

CREATE POLICY "게시물 수정은 작성자만 가능" 
  ON posts FOR UPDATE 
  TO authenticated 
  USING (auth.jwt() ->> 'sub' = author_id)
  WITH CHECK (auth.jwt() ->> 'sub' = author_id);

CREATE POLICY "게시물 삭제는 작성자만 가능" 
  ON posts FOR DELETE 
  TO authenticated 
  USING (auth.jwt() ->> 'sub' = author_id);

-- 댓글 정책
-- 1. 모든 사용자가 댓글 조회 가능
-- 2. 인증된 사용자만 댓글 작성 가능
-- 3. 작성자는 자신의 댓글만 수정/삭제 가능
CREATE POLICY "댓글 조회는 모두 가능" 
  ON comments FOR SELECT 
  TO PUBLIC 
  USING (true);

CREATE POLICY "댓글 작성은 인증된 사용자만 가능" 
  ON comments FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.jwt() ->> 'sub' = author_id);

CREATE POLICY "댓글 수정은 작성자만 가능" 
  ON comments FOR UPDATE 
  TO authenticated 
  USING (auth.jwt() ->> 'sub' = author_id)
  WITH CHECK (auth.jwt() ->> 'sub' = author_id);

CREATE POLICY "댓글 삭제는 작성자만 가능" 
  ON comments FOR DELETE 
  TO authenticated 
  USING (auth.jwt() ->> 'sub' = author_id);

-- 좋아요 정책
-- 1. 모든 사용자가 좋아요 수 조회 가능
-- 2. 인증된 사용자만 좋아요 추가/삭제 가능
-- 3. 사용자는 자신의 좋아요만 관리 가능
CREATE POLICY "좋아요 조회는 모두 가능" 
  ON likes FOR SELECT 
  TO PUBLIC 
  USING (true);

CREATE POLICY "좋아요 추가는 인증된 사용자만 가능" 
  ON likes FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "좋아요 삭제는 본인만 가능" 
  ON likes FOR DELETE 
  TO authenticated 
  USING (auth.jwt() ->> 'sub' = user_id);

-- 관리자 역할을 위한 함수
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'user_role' = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 게시물 작성자 확인 함수
CREATE OR REPLACE FUNCTION is_post_author(post_id UUID) 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM posts 
    WHERE id = post_id 
    AND author_id = auth.jwt() ->> 'sub'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
