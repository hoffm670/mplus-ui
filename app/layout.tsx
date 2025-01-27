import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE_TITLE } from "@/domain/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: "Stats to help title chaser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body className={inter.className}>
        <div className="flex flex-col items-center min-w-[768px]">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
