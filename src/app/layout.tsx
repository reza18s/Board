import type { Metadata } from "next";
import "@/style/global.css";
import React from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import QueryProvider from "@/providers/queryProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Shop",
  description: "",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ClerkProvider
          appearance={{
            variables: { colorPrimary: "#ffbf42" },
            layout: { logoPlacement: "none" },
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <QueryProvider>{children}</QueryProvider>
            <Toaster />
            <Sonner />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
