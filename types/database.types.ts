import { Database as DatabaseGenerated } from '@supabase/database-types';

/** Clerk 사용자 기본 정보 타입 */
export interface ClerkUser {
  /** Clerk에서 제공하는 사용자 ID */
  id: string;
  /** 사용자 이메일 */
  email?: string;
  /** 사용자 이름 */
  username?: string;
  /** 사용자 프로필 이미지 URL */
  imageUrl?: string;
  /** 사용자 성명 */
  firstName?: string;
  lastName?: string;
}

/** Clerk JWT 클레임 타입 */
export interface ClerkJWTClaims {
  /** JWT 발급자 (Clerk) */
  iss: string;
  /** 대상 사용자 ID */
  sub: string;
  /** JWT 토큰 만료 시간 */
  exp: number;
  /** 사용자 이메일 */
  email?: string;
  /** 사용자 이름 */
  username?: string;
}

/** 데이터베이스 테이블 정의 */
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          slug: string;
          cover_image_url: string | null;
          author_id: string;
          category_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          slug: string;
          cover_image_url?: string | null;
          author_id: string;
          category_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          slug?: string;
          cover_image_url?: string | null;
          author_id?: string;
          category_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          content: string;
          author_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          content: string;
          author_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          content?: string;
          author_id?: string;
          created_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

/** 카테고리 정보를 포함한 게시물 타입 */
export type PostWithCategory = Database['public']['Tables']['posts']['Row'] & {
  category: Database['public']['Tables']['categories']['Row'] | null;
};

/** 댓글 작성자 정보를 포함한 댓글 타입 */
export type CommentWithAuthor = Database['public']['Tables']['comments']['Row'] & {
  author: ClerkUser;
};

/** 게시물 상세 정보 타입 (카테고리, 작성자, 댓글 포함) */
export type PostDetail = PostWithCategory & {
  author: ClerkUser;
  comments: CommentWithAuthor[];
  likes_count: number;
  user_has_liked?: boolean;
};

/** 테이블 별 Row 타입 */
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

/** 타입 별칭 */
export type Category = Tables<'categories'>;
export type Post = Tables<'posts'>;
export type Comment = Tables<'comments'>;
export type Like = Tables<'likes'>;
