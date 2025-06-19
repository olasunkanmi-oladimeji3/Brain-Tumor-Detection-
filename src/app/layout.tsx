import type React from "react"
import type { Metadata } from "next"
import "./globals.css"


export const metadata: Metadata = {
  title: "NeuroDetect AI - Brain Tumor Detection System",
  description: "AI-powered medical diagnosis system for brain tumor detection using machine learning",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-200">{children}</body>
    </html>
  )
}
