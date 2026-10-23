import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AP — Framer Expert & Lead UI/UX Designer",
  description: "Digital experiences with a pulse. Premium product design, Framer builds, and motion systems by AP.",
}

export const viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
