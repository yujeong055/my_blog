"use client";
import React, { useEffect, useState } from "react";

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  createdAt: string;
}

const LOCAL_STORAGE_KEY = "blog-comments";

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setComments(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !content.trim()) {
      setError("모든 필드를 입력해주세요.");
      return;
    }
    const newComment: Comment = {
      id: Date.now().toString(),
      name,
      email,
      content,
      createdAt: new Date().toLocaleString(),
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    setName("");
    setEmail("");
    setContent("");
    setError("");
  };

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-4">댓글</h2>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            className="border rounded px-3 py-2 flex-1"
            type="text"
            placeholder="이름"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2 flex-1"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <textarea
          className="border rounded px-3 py-2 w-full min-h-[80px]"
          placeholder="댓글을 입력하세요."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          등록
        </button>
      </form>
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-gray-500">아직 댓글이 없습니다.</div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{comment.name}</span>
                <span className="text-xs text-gray-400">{comment.createdAt}</span>
              </div>
              <div className="text-gray-700 whitespace-pre-line">{comment.content}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
