import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Echo Chamber | A Non-Political Social Media Platform",
  description:
    "Echo Chamber is a social platform for peaceful, interest-based conversations. A non-political alternative to mainstream social media.",
  keywords: [
    "echo chamber app",
    "non political social media",
    "interest based social platform",
    "social media alternative",
    "peaceful social media",
    "good vibes only app",
    "echo chamber nextjs",
  ],
  authors: [
    { name: "Nirmal Chhetri", url: "https://echo-chamber-next.vercel.app" },
  ],
  creator: "Nirmal Chhetri",
  openGraph: {
    title: "Echo Chamber | Non-Political Social Media",
    description:
      "A healthier online space for real conversations. No politics, just vibes. Connect through shared interests.",
    url: "https://echo-chamber-next.vercel.app",
    siteName: "Echo Chamber",
    images: [
      {
        url: "/img/Main-logo.png", // should ideally be full URL for OpenGraph
        width: 1200,
        height: 630,
        alt: "Echo Chamber Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echo Chamber | A Calm Space for Real Talk",
    description:
      "No politics, just vibes. Join Echo Chamber, a social platform for peaceful, non-toxic interaction.",
    images: ["/img/Main-logo.png"], // full URL preferred
    creator: "@yourTwitterHandle", // optional
  },
  icons: {
    icon: "/img/Main-logo.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://echo-chamber-next.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
