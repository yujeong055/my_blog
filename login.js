// Next.js 예시
export default function Login() {
  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20, border: "1px solid #eee", borderRadius: 8 }}>
      <h1>로그인 페이지</h1>
      <form>
        <input type="text" placeholder="아이디" style={{ width: "100%", marginBottom: 10, padding: 8 }} />
        <input type="password" placeholder="비밀번호" style={{ width: "100%", marginBottom: 10, padding: 8 }} />
        <button type="submit" style={{ width: "100%", padding: 10 }}>로그인</button>
      </form>
    </div>
  );
}
