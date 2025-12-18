import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Realsee Insider Access - Poincare Premiere",
  description:
    "Exclusive premiere event for the Poincare Device. An invitation-only experience for Realsee's valued partners.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Realsee Insider Access - Poincare Premiere",
    description:
      "Exclusive premiere event for the Poincare Device. An invitation-only experience for Realsee's valued partners.",
    images: [
      {
        url: "/images/og-share.jpg",
        width: 512,
        height: 512,
        alt: "Realsee Poincare Device",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Realsee Insider Access - Poincare Premiere",
    description:
      "Exclusive premiere event for the Poincare Device. An invitation-only experience for Realsee's valued partners.",
    images: ["/images/og-share.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
