import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI 학습 블로그",
    template: "%s | AI 학습 블로그",
  },
  description: "AI 학습 과정과 지식을 기록하고 공유하는 개인 블로그",
  keywords: ["AI", "머신러닝", "딥러닝", "자연어처리", "블로그"],
  authors: [{ name: "김개발" }],
  creator: "김개발",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: "AI 학습 블로그",
    description: "AI 학습 과정과 지식을 기록하고 공유하는 개인 블로그",
    siteName: "AI 학습 블로그",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 학습 블로그",
    description: "AI 학습 과정과 지식을 기록하고 공유하는 개인 블로그",
  },
  icons: {
    icon: "/favicon.ico"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ko" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased font-sans flex flex-col px-6 md:px-8 lg:px-10`}
        >
          <Header />
          <main className="flex-1 container mx-auto py-8">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
