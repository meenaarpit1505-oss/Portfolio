import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { content } from "@/data/content";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navigation } from "@/components/ui/Navigation";
import { SocialHUD } from "@/components/ui/SocialHUD";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { DynamicCanvas } from "@/components/canvas/DynamicCanvas";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(content.metadata.siteUrl),
  title: content.metadata.title,
  description: content.metadata.description,
  keywords: content.metadata.keywords,
  authors: [{ name: content.personal.name }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.svg",
  },
  openGraph: {
    title: content.metadata.ogTitle,
    description: content.metadata.ogDescription,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: `${content.personal.name} — ${content.personal.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: content.metadata.twitterTitle,
    description: content.metadata.twitterDescription,
    images: ["/og/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          id="inspector-attribute-sanitizer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var clean = function() {
                    var els = document.querySelectorAll('[data-cursor-ref]');
                    for (var i = 0; i < els.length; i++) {
                      els[i].removeAttribute('data-cursor-ref');
                    }
                  };
                  clean();
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', clean, { once: true });
                  }
                  if (typeof console !== 'undefined' && console.error) {
                    var origErr = console.error;
                    console.error = function() {
                      for (var i = 0; i < arguments.length; i++) {
                        var a = arguments[i];
                        if (typeof a === 'string' && (a.indexOf('data-cursor-ref') !== -1 || (a.indexOf('hydration') !== -1 && a.indexOf('data-cursor') !== -1))) {
                          return;
                        }
                      }
                      return origErr.apply(console, arguments);
                    };
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-background text-foreground min-h-screen relative font-sans selection:bg-accent-purple/30 selection:text-white"
      >
        <SmoothScrollProvider>
          {/* Custom Interactive Cursor */}
          <CustomCursor />

          {/* Persistent Fixed Fullscreen 3D Canvas */}
          <DynamicCanvas />

          {/* Fixed Frame UI Components */}
          <Navigation />
          <SocialHUD />
          <ScrollIndicator />

          {/* Scrollable Content Container (HTML layer on top of Canvas) */}
          <div className="relative z-10 w-full min-h-screen">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
