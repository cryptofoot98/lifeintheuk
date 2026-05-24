import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AiProvider } from "@/lib/ai-context";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const nunitoBody = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Britzen — Pass Your Life in the UK Test First Time",
  description:
    "The most beautiful way to prepare for your British citizenship test. 105+ questions, weak-area tracking, and a progress dashboard that keeps you on track.",
  keywords: ["Life in the UK", "citizenship test", "British citizenship", "practice test", "Britzen"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${nunitoBody.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <AiProvider>{children}</AiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
