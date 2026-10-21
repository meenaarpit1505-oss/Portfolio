import { MotionProvider } from "@/components/providers/MotionProvider";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { CursorFollower } from "@/components/ui/CursorFollower";
import { site } from "@/data/site";
import { EMAIL, SITE_URL } from "@/lib/config";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-lac-tau-4yahft4yj2.vercel.app"),
  title: {
    default: site.metadata.title,
    template: `%s — ${site.name}`,
  },
  description: site.metadata.description,
  keywords: [...site.metadata.keywords],
  authors: [{ name: site.name, url: `mailto:${EMAIL}` }],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", sizes: "any" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    title: site.metadata.title,
    description: site.metadata.description,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: site.name,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: site.metadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.metadata.title,
    description: site.metadata.description,
    images: [`${SITE_URL}/twitter-image`],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0C" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${syne.variable}`}
    >
      <head>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = saved === 'light' || saved === 'dark' ? saved : 'dark';
                  var root = document.documentElement;
                  root.classList.remove('dark', 'light');
                  root.classList.add(theme);
                  root.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-accent/30">
        <PersonJsonLd />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          {children}
          <CursorFollower />
        </MotionProvider>
      </body>
    </html>
  );
}
