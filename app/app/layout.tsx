import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Syndeo – Conversational AI Platform",
  description: "Multi-channel conversational AI management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-[#F6F8FA] text-[#3B4760] antialiased`}>
        <Nav />
        <main className="container mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
