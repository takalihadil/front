// app/layout.tsx (côté serveur, sans "use client")

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import ClientNavigation from "@/components/ClientNavigation"; // ✅ Nouveau composant client

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IndieTracker - Financial Management for Solopreneurs",
  description: "Track your indie business finances with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientNavigation>{children}</ClientNavigation>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
