import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "./footer";
import { Providers } from "./providers";
import { RootNavMenu } from "./root-nav-menu";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Congregation Manager",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <RootNavMenu />
          {children}
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
