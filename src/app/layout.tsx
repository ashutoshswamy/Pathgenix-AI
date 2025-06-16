import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://pathgenix-ai.vercel.app"; // Fallback for local dev

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pathgenix AI - Personalized Career Path Generator",
    template: "%s | Pathgenix AI",
  },
  description:
    "Pathgenix AI helps you discover personalized career development paths. Get AI-powered guidance, learning resources, project ideas, and video recommendations for your professional goals.",
  keywords: [
    "career path",
    "career development",
    "AI career coach",
    "learning path",
    "professional goals",
    "career guidance",
    "Pathgenix AI",
    "AI tools",
    "career path generator",
    "personalized learning plan",
  ],
  openGraph: {
    title: "Pathgenix AI - Personalized Career Path Generator",
    description:
      "Discover tailored learning paths, essential tools, and curated resources to achieve your professional goals with AI.",
    url: siteUrl,
    siteName: "Pathgenix AI",
    type: "website",
    // images: [ // TODO: Add a relevant OG image URL once available
    //   {
    //     url: `${siteUrl}/og-image.png`, // Example: replace with your actual image path
    //     width: 1200,
    //     height: 630,
    //     alt: 'Pathgenix AI helping you chart your career path',
    //   },
    // ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pathgenix AI - Personalized Career Path Generator",
    description:
      "Your AI guide to navigating career complexities and achieving professional goals.",
    // images: [`${siteUrl}/twitter-image.png`], // TODO: Add a relevant Twitter image URL
    // creator: '@ashutoshswamy_', // Optional: if you want to link to the creator's Twitter
  },
  // icons: { // TODO: Add favicon links once available
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
  robots: {
    // Basic robots configuration
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="icon.png"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="apple-icon.png"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
