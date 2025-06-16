"use client";

import { SignIn } from "@clerk/nextjs";

export function LoginForm() {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
            card: "bg-white dark:bg-gray-800 shadow-none",
            headerTitle: "text-2xl font-bold",
            headerSubtitle: "text-sm text-gray-600 dark:text-gray-300",
            socialButtonsBlockButton: "bg-white border-gray-200 hover:bg-gray-50 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-white",
            formFieldInput: "border-gray-200 dark:border-gray-600 dark:bg-gray-700",
            footer: "hidden"
          },
        }}
        redirectUrl="/"
        signUpUrl="/sign-up"
      />
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);    try {
      if (!signIn) {
        console.error("signIn object is not available");
        setError("인증 서비스를 초기화하는 중 오류가 발생했습니다.");
        return;
      }

      console.log("Attempting to sign in with:", { email });
      const result = await signIn.create({
        identifier: email,
        strategy: "password",
        password,
      });

      console.log("Sign in result:", result);

      if (result.status === "complete") {
        if (setActive) {
          await setActive({ session: result.createdSessionId });
          router.push("/");
        } else {
          console.error("setActive function is not available");
          setError("세션을 활성화하는 중 오류가 발생했습니다.");
        }
      } else {
        console.log("Incomplete sign in status:", result.status);
        setError(`로그인에 실패했습니다. 상태: ${result.status}`);
      }    } catch (err) {
      console.error("로그인 에러:", err);
      let errorMessage = "로그인 중 오류가 발생했습니다.";
      
      if (err && typeof err === 'object' && 'errors' in err) {
        const clerkError = err as { errors: Array<{ message: string }> };
        errorMessage = clerkError.errors.map(e => e.message).join(", ");
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  // Clerk이 로드되지 않았거나 이미 로그인된 경우 로딩 표시
  if (!isLoaded || userId) {
    return (
      <div className="w-full max-w-md mx-auto p-6 flex items-center justify-center">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">로그인</h1>
        <p className="text-sm text-muted-foreground mt-2">
          계정에 로그인하여 블로그를 시작하세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            이메일
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="name@example.com"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="••••••••"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          아직 계정이 없으신가요?{" "}
          <Link href="/sign-up" className="text-blue-600 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
