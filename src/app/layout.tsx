import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingBackground from "@/components/FloatingBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gửi đến em 💖",
  description: "Một món quà nhỏ dành tặng em, với tất cả tình yêu và sự trân trọng. Hy vọng nó sẽ mang đến cho em những khoảnh khắc ngọt ngào và hạnh phúc nhất! 💖",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <FloatingBackground /> 
        
        <div className="relative z-10">
          {children}
        </div></body>
    </html>
  );
}
